/**
 * English-only overrides.
 * Key = exact Turkish source string, value = the final English text.
 *
 * Highest priority: entries here win over `dictionary` and over the
 * AI translation cache. Editing a value here changes ONLY the English
 * version of the site; the Turkish content is untouched.
 */
export const overridesEn: Record<string, string> = {
  Hekimlerimiz: "Doctors",
};
