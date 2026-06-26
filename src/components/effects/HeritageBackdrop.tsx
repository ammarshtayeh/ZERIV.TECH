"use client";

import { TatreezPattern } from "@/components/patterns/Patterns";

export function HeritageBackdrop({
  variant = "default",
}: {
  variant?: "hero" | "default" | "accent";
}) {
  const opacity = variant === "hero" ? "opacity-[0.08]" : "opacity-[0.05]";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className={`absolute -left-16 top-0 h-[28rem] w-[28rem] text-zeriv-red ${opacity}`}>
        <TatreezPattern id={`tatreez-red-${variant}`} className="h-full w-full" />
      </div>
      <div className={`absolute -right-16 bottom-0 h-[28rem] w-[28rem] text-zeriv-green ${opacity}`}>
        <TatreezPattern id={`tatreez-green-${variant}`} className="h-full w-full" />
      </div>
      {variant === "hero" && (
        <>
          <div className="absolute top-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-zeriv-red/[0.05] blur-[80px] dark:bg-zeriv-red/[0.08]" />
          <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-zeriv-green/[0.06] blur-[60px] dark:bg-zeriv-green/[0.08]" />
        </>
      )}
    </div>
  );
}
