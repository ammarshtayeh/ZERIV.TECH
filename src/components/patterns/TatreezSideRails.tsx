/**
 * Palestinian tatreez side borders — ultra-subtle luxury glass-etched style.
 * Cross-stitch pixel motifs in gold, barely visible.
 */
import {
  StitchGrid,
  ZIGZAG_BORDER,
  CYPRESS_TREE,
  DIAMOND_CHAIN,
} from "@/components/patterns/tatreez-stitches";

function TatreezStrip({ side }: { side: "left" | "right" }) {
  const flip = side === "right" ? "scale-x-[-1]" : "";
  const pid = `tatreez-rail-${side}`;

  return (
    <svg
      className={`h-full w-full ${flip}`}
      viewBox="0 0 56 280"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={pid} x="0" y="0" width="56" height="70" patternUnits="userSpaceOnUse">
          <rect width="56" height="70" fill="transparent" />

          {/* Outer zigzag — gold glass-etched */}
          <g transform="translate(2, 6)" opacity="0.12">
            <StitchGrid stitches={ZIGZAG_BORDER} />
            <g transform="translate(0, 16)">
              <StitchGrid stitches={ZIGZAG_BORDER} />
            </g>
            <g transform="translate(0, 32)">
              <StitchGrid stitches={ZIGZAG_BORDER} />
            </g>
            <g transform="translate(0, 48)">
              <StitchGrid stitches={ZIGZAG_BORDER} />
            </g>
          </g>

          {/* Cypress tree column */}
          <g transform="translate(18, 2)" opacity="0.08">
            <StitchGrid stitches={CYPRESS_TREE} />
          </g>

          {/* Diamond chain */}
          <g transform="translate(36, 10)" opacity="0.1">
            <StitchGrid stitches={DIAMOND_CHAIN} />
            <g transform="translate(0, 28)">
              <StitchGrid stitches={DIAMOND_CHAIN} />
            </g>
            <g transform="translate(0, 56)">
              <StitchGrid stitches={DIAMOND_CHAIN} />
            </g>
          </g>

          {/* Gold accent stitches */}
          <rect x="26" y="34" width="4" height="4" fill="#D4AF37" opacity="0.15" />
          <rect x="30" y="38" width="4" height="4" fill="#D4AF37" opacity="0.1" />
        </pattern>

        <linearGradient
          id={`fade-${side}`}
          x1={side === "left" ? "1" : "0"}
          y1="0"
          x2={side === "left" ? "0" : "1"}
          y2="0"
        >
          <stop offset="0%" stopColor="#0B0B0B" stopOpacity="0" />
          <stop offset="20%" stopColor="#0B0B0B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0B0B0B" stopOpacity="1" />
        </linearGradient>
      </defs>

      <rect width="56" height="280" fill={`url(#${pid})`} />
      <rect width="56" height="280" fill={`url(#fade-${side})`} opacity="0.9" />
      <line
        x1={side === "left" ? "55" : "1"}
        y1="0"
        x2={side === "left" ? "55" : "1"}
        y2="280"
        stroke="#D4AF37"
        strokeWidth="0.5"
        opacity="0.08"
      />
    </svg>
  );
}

export function TatreezSideRails() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-y-0 left-0 z-[1] hidden w-10 lg:block xl:w-14 2xl:w-16"
        aria-hidden="true"
      >
        <div className="relative h-full opacity-40">
          <TatreezStrip side="left" />
        </div>
      </div>

      <div
        className="pointer-events-none fixed inset-y-0 right-0 z-[1] hidden w-10 lg:block xl:w-14 2xl:w-16"
        aria-hidden="true"
      >
        <div className="relative h-full opacity-40">
          <TatreezStrip side="right" />
        </div>
      </div>
    </>
  );
}
