import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TatreezSideRails } from "@/components/patterns/TatreezSideRails";

/**
 * Legacy Arabic pages (about / services / portfolio / contact).
 * Keeps the previous RTL chrome while the new cinematic experience lives at `/`.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <div
        lang="ar"
        dir="rtl"
        className="relative min-h-screen bg-zeriv-bg font-sans text-zeriv-fg"
      >
        <TatreezSideRails />
        <Navbar />
        <main className="relative z-[2]">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
