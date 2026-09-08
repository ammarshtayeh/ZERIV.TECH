"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BrandLogo } from "@/experience/ui/BrandLogo";
import "@/experience/experience.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="xp xp-lost">
      <p className="xp-label xp-lost__meta">ZERIV / ERROR</p>
      <p className="xp-lost__mark">
        <BrandLogo decorative sizes="180px" />
      </p>
      <p className="xp-label">SIGNAL INTERRUPTED</p>
      <h1 className="xp-lost__code">ERR</h1>
      <p className="xp-lost__copy">The system could not complete this request.</p>
      <button type="button" className="xp-lost__retry" onClick={reset}>
        RETRY SYSTEM <span aria-hidden="true">→</span>
      </button>
      <Link href="/" className="xp-lost__cta">
        RETURN TO ORIGIN <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
