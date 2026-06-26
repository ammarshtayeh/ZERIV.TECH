"use client";

export function HeritageBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-zeriv-red/20 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-zeriv-green/15 to-transparent" />
    </div>
  );
}
