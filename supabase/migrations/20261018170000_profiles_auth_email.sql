-- Keep a profile row for every Supabase Auth user and mirror their authenticated email.
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read only their own profile. Email is managed by the Auth trigger.
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.sync_profile_email_from_auth()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, updated_at)
  VALUES (NEW.id, NEW.email, now())
  ON CONFLICT (id)
  DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = now();

  RETURN NEW;
END;
$$;

-- The function is only invoked by the Auth trigger, not exposed as an RPC.
REVOKE EXECUTE ON FUNCTION public.sync_profile_email_from_auth() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_profile_email_sync ON auth.users;
CREATE TRIGGER on_auth_user_profile_email_sync
  AFTER INSERT OR UPDATE OF email ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_profile_email_from_auth();

-- Backfill profiles for users who already exist in Auth.
INSERT INTO public.profiles (id, email)
SELECT id, email
FROM auth.users
WHERE email IS NOT NULL
ON CONFLICT (id)
DO UPDATE SET
  email = EXCLUDED.email,
  updated_at = now();

-- Do not allow clients to insert, delete, or directly change profile emails.
REVOKE INSERT, UPDATE, DELETE ON public.profiles FROM anon, authenticated;
GRANT SELECT ON public.profiles TO authenticated;
