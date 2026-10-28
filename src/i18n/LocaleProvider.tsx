"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** layout effect on client, plain effect on server — flips locale before first paint */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
import { translate } from "./messages";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from "./types";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  isAr: boolean;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function applyDocumentLocale(locale: Locale) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = locale === "ar" ? "rtl" : "ltr";
  root.dataset.locale = locale;
  try {
    window.localStorage.setItem(LOCALE_COOKIE, locale);
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
  } catch {
    /* ignore */
  }
}

export function LocaleProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  /** server-read cookie locale — first client render matches the HTML */
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [ready, setReady] = useState(false);

  useIsoLayoutEffect(() => {
    /* localStorage is the freshest client truth; cookie (initialLocale) is the
       server-rendered one. They only diverge if the cookie write once failed. */
    let stored: Locale | null = null;
    try {
      const v = window.localStorage.getItem(LOCALE_COOKIE);
      if (v === "ar" || v === "en") stored = v;
    } catch {
      /* ignore */
    }
    const next = stored ?? initialLocale;
    setLocaleState(next);
    applyDocumentLocale(next);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    applyDocumentLocale(next);
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key: string) => translate(locale, key),
      dir: locale === "ar" ? "rtl" : "ltr",
      isAr: locale === "ar",
    }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>
      <div data-locale-ready={ready ? "true" : "false"} style={{ display: "contents" }}>
        {children}
      </div>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useT() {
  return useLocale().t;
}
