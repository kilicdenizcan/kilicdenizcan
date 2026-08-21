import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { dictionary } from "./dictionary";
import { overridesEn } from "./overrides.en";
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

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "SVG", "PATH"]);

/** Strings that should never be sent for translation. */
function isTranslatable(value: string) {
  const text = value.trim();
  if (text.length < 2) return false;
  // Numbers, dates, prices, phone numbers, symbols only.
  if (!/[a-zçğıöşüA-ZÇĞİÖŞÜ]{2}/.test(text)) return false;
  return true;
}

const CACHE_KEY = "yy-i18n-en-v1";
const CHUNK = 25;

export function TranslateProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");
  const cacheRef = useRef<Map<string, string>>(new Map());
  const originalsRef = useRef<WeakMap<Text, string>>(new WeakMap());
  const attrOriginalsRef = useRef<WeakMap<Element, Map<string, string>>>(new WeakMap());
  const inFlightRef = useRef<Set<string>>(new Set());
  const langRef = useRef<Lang>("tr");
  const persistTimerRef = useRef<number>(0);
  const pendingRef = useRef<string[]>([]);

  const [, forceRender] = useState(0);

  langRef.current = lang;

  // Restore preference + persisted translation cache (client only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>;
        for (const [k, v] of Object.entries(parsed)) cacheRef.current.set(k, v);
      }
    } catch {
      /* ignore corrupt cache */
    }
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    const stored = window.localStorage.getItem("yy-lang");
    if (urlLang === "en" || (urlLang !== "tr" && stored === "en")) {
      setLangState("en");
      document.documentElement.lang = "en";
    }
    forceRender((v) => v + 1);
  }, []);

  const persistCache = useCallback(() => {
    window.clearTimeout(persistTimerRef.current);
    persistTimerRef.current = window.setTimeout(() => {
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(Object.fromEntries(cacheRef.current)));
      } catch {
        /* quota */
      }
    }, 800);
  }, []);

  /** Fetch missing strings in small parallel chunks so text fills in fast. */
  const requestTranslations = useCallback(
    (missing: string[]) => {
      const todo = missing.filter((s) => !inFlightRef.current.has(s)).slice(0, 150);
      if (todo.length === 0) return;
      todo.forEach((s) => inFlightRef.current.add(s));
      for (let i = 0; i < todo.length; i += CHUNK) {
        const batch = todo.slice(i, i + CHUNK);
        void translateServer({ data: { lang: "en", texts: batch } })
          .then((result) => {
            for (const [source, translated] of Object.entries(result ?? {})) {
              cacheRef.current.set(source, translated);
            }
            persistCache();
            batch.forEach((s) => inFlightRef.current.delete(s));
            forceRender((v) => v + 1);
          })
          .catch(() => {
            batch.forEach((s) => inFlightRef.current.delete(s));
          });
      }
    },
    [persistCache],
  );

  const lookup = useCallback((source: string) => {
    const key = source.trim();
    return overridesEn[key] ?? dictionary[key] ?? cacheRef.current.get(key);
  }, []);


  /** Collect translatable text nodes + attributes below `root`. */
  const collectTargets = useCallback(() => {
    const textNodes: Text[] = [];
    const attrTargets: { el: Element; attr: string }[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;
          if (SKIP_TAGS.has(el.tagName) || el.hasAttribute("data-no-translate")) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let current = walker.nextNode();
    while (current) {
      if (current.nodeType === Node.TEXT_NODE) {
        const node = current as Text;
        const original = originalsRef.current.get(node) ?? node.nodeValue ?? "";
        if (isTranslatable(original)) textNodes.push(node);
      } else {
        const el = current as Element;
        for (const attr of ["placeholder", "aria-label", "title", "alt"]) {
          const stored = attrOriginalsRef.current.get(el)?.get(attr);
          const value = stored ?? el.getAttribute(attr);
          if (value && isTranslatable(value)) attrTargets.push({ el, attr });
        }
      }
      current = walker.nextNode();
    }
    return { textNodes, attrTargets };
  }, []);

  const applyTranslations = useCallback(() => {
    const active = langRef.current;
    const { textNodes, attrTargets } = collectTargets();
    const missing = new Set<string>();

    for (const node of textNodes) {
      let original = originalsRef.current.get(node);
      if (original === undefined) {
        original = node.nodeValue ?? "";
        originalsRef.current.set(node, original);
      }
      if (active === "tr") {
        if (node.nodeValue !== original) node.nodeValue = original;
        if (!lookup(original)) missing.add(original.trim());
        continue;
      }
      const translated = lookup(original);
      if (translated) {
        const next = original.replace(original.trim(), translated);
        if (node.nodeValue !== next) node.nodeValue = next;
      } else {
        missing.add(original.trim());
      }
    }

    for (const { el, attr } of attrTargets) {
      let map = attrOriginalsRef.current.get(el);
      if (!map) {
        map = new Map();
        attrOriginalsRef.current.set(el, map);
      }
      let original = map.get(attr);
      if (original === undefined) {
        original = el.getAttribute(attr) ?? "";
        map.set(attr, original);
      }
      if (active === "tr") {
        if (el.getAttribute(attr) !== original) el.setAttribute(attr, original);
        if (!lookup(original)) missing.add(original.trim());
        continue;
      }
      const translated = lookup(original);
      if (translated) {
        if (el.getAttribute(attr) !== translated) el.setAttribute(attr, translated);
      } else {
        missing.add(original.trim());
      }
    }

    pendingRef.current = Array.from(missing);
    if (active === "en") requestTranslations(pendingRef.current);
  }, [collectTargets, lookup, requestTranslations]);

  // Warm the English cache in the background while the page is in Turkish,
  // so switching to EN is near-instant.
  useEffect(() => {
    if (lang !== "tr") return;
    const id = window.setTimeout(() => requestTranslations(pendingRef.current), 2500);
    return () => window.clearTimeout(id);
  }, [lang, requestTranslations]);


  // Re-apply on language change, DOM mutations and route transitions.
  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => applyTranslations());
    };

    schedule();

    const observer = new MutationObserver(() => schedule());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  });

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    langRef.current = next;
    window.localStorage.setItem("yy-lang", next);
    document.documentElement.lang = next;
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState(null, "", url.toString());
  }, []);

  const t = useCallback(
    (source: string) => {
      if (langRef.current === "tr") return source;
      return lookup(source) ?? source;
    },
    [lookup],
  );

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t, setLang]);

  return <TranslateContext.Provider value={value}>{children}</TranslateContext.Provider>;
}
