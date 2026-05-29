
CREATE TABLE public.stand_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name text NOT NULL,
  stand_type text NOT NULL,
  description text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.stand_reservations TO anon, authenticated;
GRANT ALL ON public.stand_reservations TO service_role;
ALTER TABLE public.stand_reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit stand reservation"
  ON public.stand_reservations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE public.volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  pole text NOT NULL,
  availability text,
  motivation text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.volunteers TO anon, authenticated;
GRANT ALL ON public.volunteers TO service_role;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit volunteer signup"
  ON public.volunteers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
