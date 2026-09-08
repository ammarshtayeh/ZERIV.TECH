import type { Metadata } from "next";
import {
  Syne,
  Space_Grotesk,
  JetBrains_Mono,
  IBM_Plex_Sans_Arabic,
  El_Messiri,
  Noto_Naskh_Arabic,
} from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "ZERIV — Technology × Design × Culture",
    template: "%s | ZERIV",
  },
  description:
    "ZERIV is a Palestinian technology and creative agency building websites, mobile applications, brands and AI-powered digital experiences.",
  keywords: ["ZERIV", "creative agency", "web development", "Palestine", "digital experiences"],
  authors: [{ name: "ZERIV TECH" }],
  openGraph: {
    title: "ZERIV — Technology × Design × Culture",
    description: "We build digital experiences worth remembering.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ZERIV" }],
  },
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
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
        {children}
      </body>
    </html>
  );
}
