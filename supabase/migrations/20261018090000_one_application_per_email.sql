-- Prevent multiple applications for the same normalized email address.
-- The submit action verifies that this email matches the authenticated Google account.
-- If legacy duplicate emails exist, this migration intentionally fails with a clear message
-- instead of deleting or merging applicant records automatically.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM public.applications
    GROUP BY lower(btrim(email))
    HAVING count(*) > 1
  ) THEN
    RAISE EXCEPTION 'Cannot enforce one application per email: duplicate normalized emails already exist in public.applications. Review duplicates before applying this migration.';
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS applications_email_normalized_unique
  ON public.applications (lower(btrim(email)));

-- Let an authenticated applicant read only the status of their own application.
-- The policy does not grant access to other applicants' records.
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Applicants can view their own application status"
  ON public.applications;

CREATE POLICY "Applicants can view their own application status"
  ON public.applications
  FOR SELECT
  TO authenticated
  USING (
    lower(btrim(email)) = lower(btrim(auth.jwt() ->> 'email'))
  );
