/**
 * Palestinian tatreez border — eight-pointed star chain (Moon of Bethlehem style)
 * Inspired by traditional cross-stitch dress borders.
 */
function TatreezStrip({ side }: { side: "left" | "right" }) {
  const flip = side === "right" ? "scale-x-[-1]" : "";
  const pid = `tatreez-${side}`;

  return (
    <svg
      className={`h-full w-full ${flip}`}
      viewBox="0 0 56 280"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={pid} x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
          {/* Fabric base */}
          <rect width="56" height="56" fill="var(--tatreez-base)" />
          {/* Cross-stitch grid */}
          <path
            d="M0 14H56M0 28H56M0 42H56M14 0V56M28 0V56M42 0V56"
            stroke="var(--tatreez-stitch)"
            strokeWidth="0.35"
            opacity="0.12"
          />
          <path
            d="M0 0L56 56M56 0L0 56"
            stroke="var(--tatreez-stitch)"
            strokeWidth="0.25"
            opacity="0.06"
          />
          {/* Square frame */}
          <rect x="10" y="10" width="36" height="36" stroke="var(--tatreez-thread)" strokeWidth="0.8" fill="none" opacity="0.5" />
          {/* Eight-pointed star — octagram */}
          <path
            d="M28 14 L31 22 L39 22 L33 27 L35 35 L28 30 L21 35 L23 27 L17 22 L25 22 Z"
            fill="var(--tatreez-thread)"
            opacity="0.92"
          />
          <path
            d="M28 14 L31 22 L39 22 L33 27 L35 35 L28 30 L21 35 L23 27 L17 22 L25 22 Z"
            stroke="var(--tatreez-stitch)"
            strokeWidth="0.4"
            opacity="0.35"
          />
          {/* Corner stitch accents */}
          <rect x="12" y="12" width="3" height="3" fill="var(--tatreez-thread)" opacity="0.6" />
          <rect x="41" y="12" width="3" height="3" fill="var(--tatreez-thread)" opacity="0.6" />
          <rect x="12" y="41" width="3" height="3" fill="var(--tatreez-thread)" opacity="0.6" />
          <rect x="41" y="41" width="3" height="3" fill="var(--tatreez-thread)" opacity="0.6" />
          {/* Green accent — flag color */}
          <rect x="26" y="26" width="4" height="4" fill="#007a3d" opacity="0.7" />
        </pattern>
        <linearGradient
          id={`fade-${side}`}
          x1={side === "left" ? "1" : "0"}
          y1="0"
          x2={side === "left" ? "0" : "1"}
          y2="0"
        >
          <stop offset="0%" stopColor="var(--zeriv-bg)" stopOpacity="0" />
          <stop offset="35%" stopColor="var(--zeriv-bg)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--zeriv-bg)" stopOpacity="1" />
        </linearGradient>
        <mask id={`mask-${side}`}>
          <rect width="56" height="280" fill={`url(#fade-${side})`} />
        </mask>
      </defs>
      <rect width="56" height="280" fill={`url(#${pid})`} />
      <rect width="56" height="280" fill={`url(#fade-${side})`} opacity="0.85" />
      <line
        x1={side === "left" ? "55" : "1"}
        y1="0"
        x2={side === "left" ? "55" : "1"}
        y2="280"
        stroke="#ce1126"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  );
}

export function TatreezSideRails() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-y-0 left-0 z-[1] hidden w-12 lg:block xl:w-16 2xl:w-[4.5rem]"
        aria-hidden="true"
      >
        <div className="relative h-full">
          <TatreezStrip side="left" />
          <div className="tatreez-rail-fade-l absolute inset-y-0 right-0 w-10" />
        </div>
      </div>

      <div
        className="pointer-events-none fixed inset-y-0 right-0 z-[1] hidden w-12 lg:block xl:w-16 2xl:w-[4.5rem]"
        aria-hidden="true"
      >
        <div className="relative h-full">
          <TatreezStrip side="right" />
          <div className="tatreez-rail-fade-r absolute inset-y-0 left-0 w-10" />
        </div>
      </div>
    </>
  );
}
