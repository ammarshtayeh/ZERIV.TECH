"use client";

export function TatreezPattern({ className = "", id = "tatreez" }: { className?: string; id?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <defs>
        <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="transparent" />
          <path d="M10 0L20 10L10 20L0 10Z" fill="currentColor" opacity="0.14" />
          <rect x="8" y="8" width="4" height="4" fill="currentColor" opacity="0.22" />
          <path d="M0 0H5V5H0Z M15 0H20V5H15Z M0 15H5V20H0Z M15 15H20V20H15Z" fill="currentColor" opacity="0.16" />
          <path d="M10 3V7M10 13V17M3 10H7M13 10H17" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
        </pattern>
      </defs>
      <rect width="120" height="120" fill={`url(#${id})`} />
    </svg>
  );
}

export function KeffiyehPattern({ className = "", id = "keffiyeh" }: { className?: string; id?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <defs>
        <pattern id={id} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 16H32M16 0V32" stroke="currentColor" strokeWidth="0.7" opacity="0.09" />
          <path d="M0 0L32 32M32 0L0 32" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.08" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
    </svg>
  );
}

export function PalestinianArch({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 280" fill="none" aria-hidden="true">
      <path
        d="M20 280V120C20 60 60 20 100 20C140 20 180 60 180 120V280"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.18"
      />
      <path
        d="M40 280V130C40 80 68 45 100 45C132 45 160 80 160 130V280"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.1"
      />
      <path d="M100 20V8" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

export function CircuitPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <path
        d="M20 100H60M60 100V60M60 60H100M100 60V20M100 100H140M140 100V140M140 140H180"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.25"
      />
      <circle cx="60" cy="100" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="100" cy="60" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="140" cy="100" r="2" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export function DiamondSeparator({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M6 0L12 6L6 12L0 6Z" />
    </svg>
  );
}

export function TatreezBorder({ className = "", thick = false }: { className?: string; thick?: boolean }) {
  const h = thick ? "h-1.5" : "h-1";
  return (
    <div className={`flex ${h} w-full overflow-hidden ${className}`} aria-hidden="true">
      <div className="h-full flex-[2] bg-zeriv-red" />
      <div className="h-full flex-1 bg-zeriv-black" />
      <div className="h-full flex-[2] bg-zeriv-white dark:bg-zeriv-white/90" />
      <div className="h-full flex-[2] bg-zeriv-green" />
      <div className="h-full flex-1 bg-zeriv-black" />
      <div className="h-full flex-[2] bg-zeriv-red" />
    </div>
  );
}

export function OliveBranch({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 40" fill="none" aria-hidden="true">
      <path d="M5 25C20 20 35 15 75 10" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <ellipse cx="20" cy="22" rx="4" ry="2" fill="currentColor" opacity="0.25" transform="rotate(-30 20 22)" />
      <ellipse cx="35" cy="17" rx="4" ry="2" fill="currentColor" opacity="0.25" transform="rotate(-25 35 17)" />
      <ellipse cx="50" cy="14" rx="4" ry="2" fill="currentColor" opacity="0.25" transform="rotate(-20 50 14)" />
      <ellipse cx="65" cy="11" rx="4" ry="2" fill="currentColor" opacity="0.25" transform="rotate(-15 65 11)" />
    </svg>
  );
}

export function FlagStripe({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-2 w-full overflow-hidden rounded-full ${className}`} aria-hidden="true">
      <div className="h-full flex-1 bg-zeriv-red" />
      <div className="h-full flex-1 bg-zeriv-green" />
    </div>
  );
}
