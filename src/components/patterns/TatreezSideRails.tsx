/**
 * Palestinian tatreez side borders — zigzag + cypress + diamond chain.
 * Cross-stitch pixel motifs (Ramallah / Bethlehem dress borders).
 */
import {
  StitchGrid,
  ZIGZAG_BORDER,
  CYPRESS_TREE,
  DIAMOND_CHAIN,
  TatreezFabricGrid,
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
          <rect width="56" height="70" fill="var(--tatreez-base)" />
          <TatreezFabricGrid width={56} height={70} />

          {/* Outer zigzag — asnan al-haj */}
          <g transform="translate(2, 6)">
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
          <g transform="translate(18, 2)">
            <StitchGrid stitches={CYPRESS_TREE} />
          </g>

          {/* Diamond chain — square-stitch geometry */}
          <g transform="translate(36, 10)">
            <StitchGrid stitches={DIAMOND_CHAIN} />
            <g transform="translate(0, 28)">
              <StitchGrid stitches={DIAMOND_CHAIN} />
            </g>
            <g transform="translate(0, 56)">
              <StitchGrid stitches={DIAMOND_CHAIN} />
            </g>
          </g>

          {/* Green flag accent stitches */}
          <rect x="26" y="34" width="4" height="4" fill="#007a3d" opacity="0.75" />
          <rect x="30" y="38" width="4" height="4" fill="#007a3d" opacity="0.55" />
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
      </defs>

      <rect width="56" height="280" fill={`url(#${pid})`} />
      <rect width="56" height="280" fill={`url(#fade-${side})`} opacity="0.85" />
      <line
        x1={side === "left" ? "55" : "1"}
        y1="0"
        x2={side === "left" ? "55" : "1"}
        y2="280"
        stroke="#ce1126"
        strokeWidth="1"
        opacity="0.35"
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
