"use client";

import React from "react";

// r: Red (#ce1126), g: Green (#007a3d), b: Body (var(--zeriv-fg)), w: White (#ffffff), .: Empty
const PATTERN_DATA = [
  "r..........g",
  ".r........g.",
  "r....b....g",
  ".r..bbb..g.",
  "r..bbbbb..g",
  ".rbbbbbbbg.",
  "r..bbbbb..g",
  ".r..bbb..g.",
  "r....b....g",
  ".r...r...g.",
  "r...rrr...g",
  ".r...r...g.",
  "r..........g",
  ".r........g.",
  "r....g....g",
  ".r..ggg..g.",
  "r..g.r.g..g",
  ".r..rrr..g.",
  "r..g.r.g..g",
  ".r..ggg..g.",
  "r....g....g",
  ".r........g.",
  "r..........g",
  ".r........g.",
  "r....r....g",
  ".r..rbr..g.",
  "r..rb.br..g",
  ".r..rbr..g.",
  "r....r....g",
  ".r........g.",
  "r..........g",
  ".r........g.",
  "r....b....g",
  ".r..bbb..g.",
  "r..bb.bb..g",
  ".r..bbb..g.",
  "r....b....g",
  ".r........g.",
  "r..........g",
  ".r........g.",
  "r..........g",
  ".r........g.",
  "r..........g",
  ".r........g.",
  "r..........g",
  ".r........g.",
  "r..........g",
  ".r........g.",
];

export function TatreezSideRails() {
  const renderStitches = (stitchSize: number) => {
    const rects: React.JSX.Element[] = [];
    PATTERN_DATA.forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === ".") return;
        let fill = "transparent";
        if (cell === "r") fill = "#ce1126"; // Palestinian red
        else if (cell === "g") fill = "#007a3d"; // Palestinian green
        else if (cell === "b") fill = "var(--zeriv-fg)"; // Adaptable body color (white in dark, black in light)
        else if (cell === "w") fill = "#ffffff";
        
        rects.push(
          <rect
            key={`${stitchSize}-${x}-${y}`}
            x={x * stitchSize}
            y={y * stitchSize}
            width={stitchSize - 0.4} // subtle gap between stitches
            height={stitchSize - 0.4}
            fill={fill}
            rx={0.3}
          />
        );
      });
    });
    return rects;
  };

  return (
    <>
      <style>{`
        .tatreez-rect-left {
          fill: url(#tatreez-left-mobile);
        }
        .tatreez-rect-right {
          fill: url(#tatreez-right-mobile);
        }
        @media (min-width: 1024px) {
          .tatreez-rect-left {
            fill: url(#tatreez-left-desktop);
          }
          .tatreez-rect-right {
            fill: url(#tatreez-right-desktop);
          }
        }
      `}</style>

      {/* Left side rail */}
      <div
        className="pointer-events-none fixed inset-y-0 left-0 z-40 w-5 lg:w-12 xl:w-16 border-r border-zeriv-border bg-zeriv-bg/25 backdrop-blur-[0.5px]"
        aria-hidden="true"
      >
        <svg className="h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Mobile: 2px stitches (width 24px, height 96px) */}
            <pattern
              id="tatreez-left-mobile"
              width={24}
              height={96}
              patternUnits="userSpaceOnUse"
              x="50%"
              y="0"
              patternTransform="translate(-12, 0)"
            >
              {renderStitches(2)}
            </pattern>
            {/* Desktop: 4px stitches (width 48px, height 192px) */}
            <pattern
              id="tatreez-left-desktop"
              width={48}
              height={192}
              patternUnits="userSpaceOnUse"
              x="50%"
              y="0"
              patternTransform="translate(-24, 0)"
            >
              {renderStitches(4)}
            </pattern>
          </defs>
          <rect className="tatreez-rect-left" width="100%" height="100%" />
        </svg>
      </div>

      {/* Right side rail */}
      <div
        className="pointer-events-none fixed inset-y-0 right-0 z-40 w-5 lg:w-12 xl:w-16 border-l border-zeriv-border bg-zeriv-bg/25 backdrop-blur-[0.5px]"
        aria-hidden="true"
      >
        <svg className="h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Mobile Right: mirrored pattern */}
            <pattern
              id="tatreez-right-mobile"
              width={24}
              height={96}
              patternUnits="userSpaceOnUse"
              x="50%"
              y="0"
              patternTransform="translate(-12, 0) scale(-1, 1)"
            >
              {renderStitches(2)}
            </pattern>
            {/* Desktop Right: mirrored pattern */}
            <pattern
              id="tatreez-right-desktop"
              width={48}
              height={192}
              patternUnits="userSpaceOnUse"
              x="50%"
              y="0"
              patternTransform="translate(-24, 0) scale(-1, 1)"
            >
              {renderStitches(4)}
            </pattern>
          </defs>
          <rect className="tatreez-rect-right" width="100%" height="100%" />
        </svg>
      </div>
    </>
  );
}
