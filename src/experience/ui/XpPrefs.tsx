"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

/** Compact language + theme controls for the experience chrome. */
export function XpPrefs({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || (resolvedTheme ?? "dark") === "dark";

  return (
    <div className={`xp-prefs${compact ? " xp-prefs--compact" : ""}`} role="group" aria-label={`${t("prefs.lang")} / ${t("prefs.theme")}`}>
      <div className="xp-prefs__seg" role="group" aria-label={t("prefs.lang")}>
        <button
          type="button"
          className="xp-prefs__btn"
          data-on={locale === "en" ? "true" : "false"}
          onClick={() => setLocale("en")}
          aria-pressed={locale === "en"}
          aria-label={t("prefs.toEn")}
        >
          {t("prefs.en")}
        </button>
        <button
          type="button"
          className="xp-prefs__btn"
          data-on={locale === "ar" ? "true" : "false"}
          onClick={() => setLocale("ar")}
          aria-pressed={locale === "ar"}
          aria-label={t("prefs.toAr")}
        >
          {t("prefs.ar")}
        </button>
      </div>
      <div className="xp-prefs__seg" role="group" aria-label={t("prefs.theme")}>
        <button
          type="button"
          className="xp-prefs__btn"
          data-on={isDark ? "true" : "false"}
          onClick={() => setTheme("dark")}
          aria-pressed={isDark}
          aria-label={t("prefs.toDark")}
        >
          {t("prefs.dark")}
        </button>
        <button
          type="button"
          className="xp-prefs__btn"
          data-on={!isDark ? "true" : "false"}
          onClick={() => setTheme("light")}
          aria-pressed={!isDark}
          aria-label={t("prefs.toLight")}
        >
          {t("prefs.light")}
        </button>
      </div>
    </div>
  );
}
