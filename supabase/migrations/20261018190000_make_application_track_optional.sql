-- Primary Track is no longer collected on the recruitment application form.
-- Keep existing values intact while allowing new applications to omit the track.
ALTER TABLE public.applications
  ALTER COLUMN track DROP NOT NULL;
