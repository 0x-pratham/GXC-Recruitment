-- Private recruitment admin access using the existing profiles.role column.
-- Admin roles must be assigned by a trusted operator, never by client input.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = (SELECT auth.uid())
      AND p.role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- The public application form needs INSERT only.
REVOKE SELECT, UPDATE, DELETE ON TABLE public.applications FROM anon, authenticated;
GRANT INSERT ON TABLE public.applications TO anon, authenticated;
GRANT SELECT, UPDATE ON TABLE public.applications TO authenticated;

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read applications" ON public.applications;
CREATE POLICY "Admins can read applications"
  ON public.applications FOR SELECT TO authenticated
  USING ((SELECT public.is_admin()));

DROP POLICY IF EXISTS "Admins can update applications" ON public.applications;
CREATE POLICY "Admins can update applications"
  ON public.applications FOR UPDATE TO authenticated
  USING ((SELECT public.is_admin()))
  WITH CHECK ((SELECT public.is_admin()));

DROP POLICY IF EXISTS "Enable public inserts for applications" ON public.applications;
CREATE POLICY "Enable public inserts for applications"
  ON public.applications FOR INSERT TO public
  WITH CHECK (true);
