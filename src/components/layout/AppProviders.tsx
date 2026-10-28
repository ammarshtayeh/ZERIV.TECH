"use client";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/types";
import type { ReactNode } from "react";

export function AppProviders({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
