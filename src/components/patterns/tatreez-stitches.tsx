/**
 * Palestinian tatreez (cross-stitch) motifs — pixel/block geometry only.
 * No smooth stars or Moroccan-style curves.
 */

const STITCH = 4;

type StitchGridProps = {
  stitches: string;
  thread?: string;
  stitchColor?: string;
  className?: string;
};

/** stitches: rows top→bottom, cols left→right; "r" red, "b" black, "g" green, "." empty */
export function StitchGrid({
  stitches,
  thread = "var(--tatreez-thread)",
  stitchColor = "var(--tatreez-stitch)",
  className = "",
}: StitchGridProps) {
  const rows = stitches.trim().split("\n");

  return (
    <g className={className}>
      {rows.map((row, y) =>
        row.split("").map((cell, x) => {
          if (cell === ".") return null;
          const fill =
            cell === "r"
              ? thread
              : cell === "b"
                ? stitchColor
                : cell === "g"
                  ? "#007a3d"
                  : thread;
          return (
            <rect
              key={`${x}-${y}`}
              x={x * STITCH}
              y={y * STITCH}
              width={STITCH}
              height={STITCH}
              fill={fill}
            />
          );
        })
      )}
    </g>
  );
}

/** "Old man's teeth" zigzag border column (asnān al-ḥājj) */
export const ZIGZAG_BORDER = `
r.r.
.r.r
r.r.
.r.r
`.trim();

/** Cypress tree (sāru) — classic thobe border motif */
export const CYPRESS_TREE = `
...r...
..rrr..
.rrrrr.
rrrrrrr
.rrrrr.
..rrr..
...r...
`.trim();

/** Diamond chain from square stitches (not smooth stars) */
export const DIAMOND_CHAIN = `
..r..
.rbr.
rb.br
.rbr.
..r..
`.trim();

/** Small cross-stitch medallion — Moon of Bethlehem (pixel octagram) */
export const MOON_MEDALLION = `
...r...
..rbr..
.rbrbr.
rbr.rbr
.rbrbr.
..rbr..
...r...
`.trim();

export function TatreezFabricGrid({ width, height }: { width: number; height: number }) {
  return (
    <g>
      <path
        d={`M0 ${height / 4}H${width}M0 ${height / 2}H${width}M0 ${(3 * height) / 4}H${width}`}
        stroke="var(--tatreez-stitch)"
        strokeWidth="0.35"
        opacity="0.1"
      />
      <path
        d={`M${width / 4} 0V${height}M${width / 2} 0V${height}M${(3 * width) / 4} 0V${height}`}
        stroke="var(--tatreez-stitch)"
        strokeWidth="0.35"
        opacity="0.1"
      />
    </g>
  );
}
