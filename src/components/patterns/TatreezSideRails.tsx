"use client";

import React from "react";

const STITCH_SIZE = 4;
const COLS = 12; // 48px width
const ROWS = 48; // 192px height

// r: Red (#ce1126), g: Green (#007a3d), b: Body (var(--zeriv-fg)), w: White (#ffffff), .: Empty
// We want this pattern to represent beautiful authentic tatreez.
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
  const width = COLS * STITCH_SIZE; // 48
  const height = ROWS * STITCH_SIZE; // 192

  const renderStitches = () => {
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
            key={`${x}-${y}`}
            x={x * STITCH_SIZE}
            y={y * STITCH_SIZE}
            width={STITCH_SIZE - 0.5} // slightly smaller to create a stitch gap
            height={STITCH_SIZE - 0.5}
            fill={fill}
            rx={0.5}
          />
        );
      });
    });
    return rects;
  };

  return (
    <>
      {/* Left side rail */}
      <div
        className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-12 lg:block xl:w-16 border-r border-zeriv-border bg-zeriv-bg/20 backdrop-blur-[0.5px]"
        aria-hidden="true"
      >
        <svg className="h-full w-full opacity-65" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="tatreez-pattern-left"
              width={width}
              height={height}
              patternUnits="userSpaceOnUse"
              x="50%"
              y="0"
              patternTransform="translate(-24, 0)"
            >
              {renderStitches()}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tatreez-pattern-left)" />
        </svg>
      </div>

      {/* Right side rail */}
      <div
        className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden w-12 lg:block xl:w-16 border-l border-zeriv-border bg-zeriv-bg/20 backdrop-blur-[0.5px]"
        aria-hidden="true"
      >
        <svg className="h-full w-full opacity-65" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="tatreez-pattern-right"
              width={width}
              height={height}
              patternUnits="userSpaceOnUse"
              x="50%"
              y="0"
              patternTransform="translate(-24, 0) scale(-1, 1)"
            >
              {renderStitches()}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tatreez-pattern-right)" />
        </svg>
      </div>
    </>
  );
}
