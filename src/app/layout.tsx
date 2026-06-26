import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, El_Messiri, Noto_Naskh_Arabic } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TatreezSideRails } from "@/components/patterns/TatreezSideRails";
import "./globals.css";

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
    default: "ZERIV TECH | وكالة رقمية فلسطينية",
    template: "%s | ZERIV TECH",
  },
  description:
    "ZERIV TECH — وكالة رقمية فلسطينية متخصصة في تطوير المواقع والتطبيقات والمنصات، التصميم الجرافيكي، الهوية البصرية، وUI/UX.",
  keywords: [
    "ZERIV TECH",
    "وكالة رقمية",
    "تطوير مواقع",
    "تصميم جرافيك",
    "هوية بصرية",
    "فلسطين",
  ],
  authors: [{ name: "ZERIV TECH" }],
  openGraph: {
    title: "ZERIV TECH | وكالة رقمية فلسطينية",
    description: "نصمم ونبرمج مواقع وتطبيقات وحلول رقمية — بروح فلسطينية.",
    locale: "ar_PS",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ZERIV TECH" }],
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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${plex.variable} ${messiri.variable} ${notoNaskh.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="relative min-h-screen bg-zeriv-bg text-zeriv-fg">
            <div className="site-grain pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />
            <TatreezSideRails />
            <Navbar />
            <main className="relative z-[2]">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
