"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { dictUz, type DictKey } from "./i18n/uz";
import { dictRu } from "./i18n/ru";

export type Locale = "uz" | "ru";

const DICTS: Record<Locale, Record<DictKey, string>> = { uz: dictUz, ru: dictRu };
const STORAGE_KEY = "mf_locale";
const DEFAULT_LOCALE: Locale = "uz";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: DictKey, vars?: Record<string, string | number>) => string;
  loc: (primary: string, alt?: string) => string;
}

const Ctx = createContext<LocaleCtx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "uz" || stored === "ru") {
        setLocaleState(stored);
        document.documentElement.lang = stored;
      }
    } catch {}
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: DictKey, vars?: Record<string, string | number>) => {
      const raw = DICTS[locale][key] ?? DICTS.uz[key] ?? String(key);
      if (!vars) return raw;
      return Object.keys(vars).reduce(
        (s, k) => s.replace(new RegExp(`\\{${k}\\}`, "g"), String(vars[k])),
        raw,
      );
    },
    [locale],
  );

  const loc = useCallback(
    (primary: string, alt?: string) => (locale === "uz" && alt ? alt : primary),
    [locale],
  );

  return <Ctx.Provider value={{ locale, setLocale, t, loc }}>{children}</Ctx.Provider>;
}

export function useT(): LocaleCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (k: DictKey) => DICTS[DEFAULT_LOCALE][k] ?? String(k),
      loc: (p) => p,
    };
  }
  return ctx;
}
