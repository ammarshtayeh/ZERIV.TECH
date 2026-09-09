import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/site";
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
  weight: ["400", "500", "600", "700"],
  variable: "--font-messiri",
  display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-noto-naskh",
  display: "swap",
});

const DESCRIPTION =
  "ZERIV is a Palestinian studio building websites, mobile applications, brands, AI-powered solutions and interactive digital experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ZERIV — Technology × Design × Culture",
    template: "%s | ZERIV",
  },
  description: DESCRIPTION,
  applicationName: "ZERIV",
  keywords: [
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
    locale: "en_US",
    url: "/",
    title: "ZERIV — Technology × Design × Culture",
    description: "We build digital experiences worth remembering.",
    images: [{ url: "/brand/logo.png", width: 1024, height: 1024, alt: "ZERIV TECH" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZERIV — Technology × Design × Culture",
    description: "We build digital experiences worth remembering.",
    images: ["/brand/logo.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${grotesk.variable} ${mono.variable} ${plex.variable} ${messiri.variable} ${notoNaskh.variable} antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
