-- Recruitment form updates: replace institution with PRN and gender.
-- Keep the legacy institution column and existing values for historical applications.
ALTER TABLE public.applications
  ALTER COLUMN institution DROP NOT NULL;

ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS prn_number text,
  ADD COLUMN IF NOT EXISTS gender text;

ALTER TABLE public.applications
  ADD CONSTRAINT applications_gender_check
  CHECK (gender IS NULL OR gender IN ('male', 'female'));

-- Existing applications can remain NULL; new submissions provide a PRN.
-- Enforce uniqueness without case or surrounding-whitespace differences.
CREATE UNIQUE INDEX IF NOT EXISTS applications_prn_number_unique
  ON public.applications (lower(btrim(prn_number)))
  WHERE prn_number IS NOT NULL AND btrim(prn_number) <> '';
