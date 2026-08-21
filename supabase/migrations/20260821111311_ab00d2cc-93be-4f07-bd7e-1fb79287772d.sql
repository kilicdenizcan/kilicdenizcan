CREATE TABLE public.translation_cache (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_hash text NOT NULL,
  lang text NOT NULL,
  source text NOT NULL,
  translated text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_hash, lang)
);

GRANT SELECT ON public.translation_cache TO anon;
GRANT SELECT ON public.translation_cache TO authenticated;
GRANT ALL ON public.translation_cache TO service_role;

ALTER TABLE public.translation_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Translations are publicly readable"
  ON public.translation_cache
  FOR SELECT
  TO anon, authenticated
  USING (true);