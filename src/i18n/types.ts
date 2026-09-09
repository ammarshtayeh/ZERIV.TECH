export type Locale = "en" | "ar";

export const LOCALES: Locale[] = ["en", "ar"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "zeriv-locale";

export type Localized = { en: string; ar: string };

export function loc(locale: Locale, value: string | Localized): string {
  if (typeof value === "string") return value;
  return value[locale] || value.en;
}
