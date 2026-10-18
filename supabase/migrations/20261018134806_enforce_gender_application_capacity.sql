-- Enforce per-gender recruitment capacities at the database boundary.
-- Female applicants: 25; male applicants: 16.
-- The follow-up migration hardens visibility under RLS and refines UPDATE handling.
CREATE OR REPLACE FUNCTION public.enforce_application_gender_capacity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  current_count bigint;
  gender_capacity bigint;
  lock_key bigint;
BEGIN
  IF NEW.gender IS NULL THEN
    RAISE EXCEPTION USING ERRCODE = '23514',
      MESSAGE = 'APPLICATION_GENDER_REQUIRED',
      DETAIL = 'Please select male or female before submitting an application.';
  END IF;

  IF TG_OP = 'UPDATE' AND NEW.gender IS NOT DISTINCT FROM OLD.gender THEN
    RETURN NEW;
  END IF;

  IF NEW.gender NOT IN ('male', 'female') THEN
    RAISE EXCEPTION USING ERRCODE = '23514',
      MESSAGE = 'APPLICATION_GENDER_INVALID',
      DETAIL = 'The selected gender is not supported for recruitment capacity.';
  END IF;

  IF NEW.gender = 'female' THEN
    gender_capacity := 25;
    lock_key := 73102601;
  ELSE
    gender_capacity := 16;
    lock_key := 73102602;
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(lock_key);

  SELECT pg_catalog.count(*) INTO current_count
  FROM public.applications AS a
  WHERE a.gender = NEW.gender
    AND (TG_OP <> 'UPDATE' OR a.id <> OLD.id);

  IF current_count >= gender_capacity THEN
    RAISE EXCEPTION USING ERRCODE = '23514',
      MESSAGE = CASE WHEN NEW.gender = 'female'
        THEN 'APPLICATION_CAPACITY_FULL_FEMALE'
        ELSE 'APPLICATION_CAPACITY_FULL_MALE'
      END,
      DETAIL = CASE WHEN NEW.gender = 'female'
        THEN 'All 25 seats for female applicants are filled. Thank you for your interest in GenXCode; no vacancies remain for this category.'
        ELSE 'All 16 seats for male applicants are filled. Thank you for your interest in GenXCode; no vacancies remain for this category.'
      END;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS applications_gender_capacity_guard ON public.applications;
CREATE TRIGGER applications_gender_capacity_guard
BEFORE INSERT OR UPDATE OF gender
ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.enforce_application_gender_capacity();

REVOKE ALL ON FUNCTION public.enforce_application_gender_capacity() FROM PUBLIC, anon, authenticated;
