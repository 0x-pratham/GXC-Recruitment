CREATE TABLE IF NOT EXISTS public.recruitment_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  opens_at timestamptz,
  closes_at timestamptz,
  manual_override text NOT NULL DEFAULT 'schedule'
    CHECK (manual_override IN ('schedule', 'open', 'closed')),
  closed_message text NOT NULL DEFAULT 'Thank you for your interest in GenXCode. Recruitment applications are currently closed. Please check back later for updates.',
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

INSERT INTO public.recruitment_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.recruitment_settings ENABLE ROW LEVEL SECURITY;

-- Settings are accessed only through server-side code after the is_admin() check.
-- Do not add client-readable or client-writable policies for this table.
