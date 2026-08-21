import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { dictionary } from "./dictionary";
import { translateServer } from "./translate.functions";

export type Lang = "tr" | "en";

type TranslateContextValue = {
  lang: Lang;
  t: (source: string) => string;
  setLang: (lang: Lang) => void;
};

const TranslateContext = createContext<TranslateContextValue | null>(null);

export function useTranslate() {
  const ctx = useContext(TranslateContext);
  if (!ctx) throw new Error("useTranslate must be used within TranslateProvider");
  return ctx;
}

export function TranslateProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");
  const [cache, setCache] = useState<Record<string, string>>({});
  const pendingRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydratedRef = useRef(false);

  // Initial language from URL ?lang= or stored preference (client only).
  useEffect(() => {
    hydratedRef.current = true;
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    const stored = window.localStorage.getItem("yy-lang");
    const initial = urlLang === "en" || stored === "en" ? "en" : "tr";
    setLang(initial);
  }, []);

  const t = useMemo(
    () =>
      (source: string): string => {
        if (lang === "tr") return source;
        if (!source) return source;
        const cached = cache[source];
        if (cached) return cached;
        const dict = dictionary[source];
        if (dict) return dict;
        // Queue for AI translation (batched, debounced).
        if (hydratedRef.current) {
          pendingRef.current.add(source);
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            const batch = Array.from(pendingRef.current);
            pendingRef.current.clear();
            if (batch.length > 0) {
              void translateServer({ data: { lang, texts: batch } }).then((result) => {
                if (result) setCache((prev) => ({ ...prev, ...result }));
              });

            }
          }, 600);
        }
        return source;
      },
    [lang, cache],
  );

  const changeLang = useMemo(
    () => (next: Lang) => {
      setLang(next);
      window.localStorage.setItem("yy-lang", next);
      document.documentElement.lang = next === "en" ? "en" : "tr";
      const url = new URL(window.location.href);
      if (next === "en") url.searchParams.set("lang", "en");
      else url.searchParams.delete("lang");
      window.history.replaceState(null, "", url.toString());
    },
    [],
  );

  return (
    <TranslateContext.Provider value={{ lang, t, setLang: changeLang }}>
      {children}
    </TranslateContext.Provider>
  );
}

/** Recursively translate every string in an object/array of data. */
export function useLocalized<T>(data: T): T {
  const { t } = useTranslate();
  return useMemo(() => translateData(data, t), [data, t]);
}

export function translateData<T>(data: T, translate: (s: string) => string): T {
  if (typeof data === "string") return translate(data) as unknown as T;
  if (Array.isArray(data)) return data.map((v) => translateData(v, translate)) as unknown as T;
  if (data && typeof data === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data)) {
      out[k] = translateData(v, translate);
    }
    return out as T;
  }
  return data;
}
