import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from "./types";

/**
 * The visitor's chosen locale, read server-side from the locale cookie.
 * Falls back to English on first visit (no cookie yet).
 */
export async function getServerLocale(): Promise<Locale> {
  try {
    const store = await cookies();
    return store.get(LOCALE_COOKIE)?.value === "ar" ? "ar" : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export interface PageSeo {
  path: string;
  en: { title: string; description: string };
  ar: { title: string; description: string };
}

/**
 * Bilingual page metadata: crawlers and shares see the visitor's language,
 * and Open Graph advertises the alternate locale as well.
 */
export function pageMetadata(locale: Locale, seo: PageSeo): Metadata {
  const isAr = locale === "ar";
  const c = isAr ? seo.ar : seo.en;
  return {
    title: c.title,
    description: c.description,
    openGraph: {
      title: `${c.title} | ZERIV`,
      description: c.description,
      url: seo.path,
      locale: isAr ? "ar_PS" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_PS",
    },
    alternates: { canonical: seo.path },
  };
}
