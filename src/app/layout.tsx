import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/site";
import { getServerLocale } from "@/i18n/seo";
import {
  Syne,
  Space_Grotesk,
  JetBrains_Mono,
  IBM_Plex_Sans_Arabic,
  El_Messiri,
  Noto_Naskh_Arabic,
} from "next/font/google";
import { AppProviders } from "@/components/layout/AppProviders";
import "./globals.css";

/* ── Experience typography ── */
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

/* ── Legacy Arabic pages ── */
const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const messiri = El_Messiri({
  subsets: ["arabic", "latin"],
  variable: "--font-messiri",
  display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-noto-naskh",
  display: "swap",
});

const TITLE_EN = "ZERIV — Technology × Design × Culture";
const TITLE_AR = "زيريف — تكنولوجيا × تصميم × ثقافة";
const DESCRIPTION_EN =
  "ZERIV is a Palestinian studio building websites, mobile applications, brands, AI-powered solutions and interactive digital experiences.";
const DESCRIPTION_AR =
  "زيريف استوديو فلسطيني يبني مواقع وتطبيقات موبايل وعلامات تجارية وحلول ذكاء وتجارب رقمية تفاعلية.";
const TAGLINE_EN = "We build digital experiences worth remembering.";
const TAGLINE_AR = "نبني تجارب رقمية تستحق أن تُذكر.";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const isAr = locale === "ar";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isAr ? TITLE_AR : TITLE_EN,
      template: "%s | ZERIV",
    },
    description: isAr ? DESCRIPTION_AR : DESCRIPTION_EN,
    applicationName: "ZERIV",
    keywords: isAr
      ? [
          "زيريف",
          "استوديو رقمي فلسطيني",
          "تطوير مواقع",
          "تطبيقات موبايل",
          "تصميم واجهات",
          "هوية بصرية",
          "حلول ذكاء اصطناعي",
          "فلسطين",
          "تجارب رقمية",
        ]
      : [
          "ZERIV",
          "ZERIV TECH",
          "digital studio",
          "web development",
          "mobile applications",
          "UI/UX design",
          "branding",
          "AI solutions",
          "Palestine",
          "digital experiences",
        ],
    authors: [{ name: "ZERIV TECH" }],
    creator: "ZERIV TECH",
    openGraph: {
      type: "website",
      siteName: "ZERIV",
      locale: isAr ? "ar_PS" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_PS",
      url: "/",
      title: isAr ? TITLE_AR : TITLE_EN,
      description: isAr ? TAGLINE_AR : TAGLINE_EN,
      images: [{ url: "/brand/logo.png", width: 1024, height: 1024, alt: "ZERIV TECH" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isAr ? TITLE_AR : TITLE_EN,
      description: isAr ? TAGLINE_AR : TAGLINE_EN,
      images: ["/brand/logo.png"],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
    icons: {
      icon: "/brand/logo.png",
      apple: "/brand/logo.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f3ea" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale();
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${syne.variable} ${grotesk.variable} ${mono.variable} ${plex.variable} ${messiri.variable} ${notoNaskh.variable} antialiased`}
      >
        <AppProviders initialLocale={locale}>{children}</AppProviders>
      </body>
    </html>
  );
}
