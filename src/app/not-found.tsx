import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/experience/ui/BrandLogo";
import "@/experience/experience.css";

export const metadata: Metadata = {
  title: "Connection lost",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="xp xp-lost">
      <p className="xp-label xp-lost__meta">ZERIV / 404</p>
      <p className="xp-lost__mark">
        <BrandLogo decorative sizes="180px" />
      </p>
      <p className="xp-label">CONNECTION LOST</p>
      <h1 className="xp-lost__code">404</h1>
      <p className="xp-lost__copy">This path is not on the system.</p>
      <Link href="/" className="xp-lost__cta" data-cursor="expand">
        RETURN TO SYSTEM <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
