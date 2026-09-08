/**
 * Octagram — the single symbol of the ZERIV visual system.
 * Two squares rotated 45° = a tatreez medallion, a circuit junction, a 3D lattice.
 */

export const SQ2 = Math.SQRT2;

export type Seg = [number, number, number, number];

/** Deterministic PRNG so the preloader composition is identical on every load. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function inOctagram(x: number, y: number, a: number) {
  return (
    (Math.abs(x) <= a && Math.abs(y) <= a) ||
    Math.abs(x) + Math.abs(y) <= a * SQ2
  );
}

/** Normalised radius inside the octagram (0 centre → 1 outer edge). */
export function octRadius(x: number, y: number, a: number) {
  const box = Math.max(Math.abs(x), Math.abs(y));
  const dia = (Math.abs(x) + Math.abs(y)) / SQ2;
  return Math.min(box, dia) / a;
}

/** 2D line segments for the motif, in a space where `a` is the half-size of the base square. */
export function octagramSegments(a = 1): Seg[] {
  const segs: Seg[] = [];

  const square = (r: number, rotated: boolean) => {
    const pts: [number, number][] = rotated
      ? [
          [0, -r * SQ2],
          [r * SQ2, 0],
          [0, r * SQ2],
          [-r * SQ2, 0],
        ]
      : [
          [-r, -r],
          [r, -r],
          [r, r],
          [-r, r],
        ];
    for (let i = 0; i < 4; i++) {
      const p = pts[i];
      const q = pts[(i + 1) % 4];
      segs.push([p[0], p[1], q[0], q[1]]);
    }
  };

  square(a, false);
  square(a, true);
  square(a * 0.42, false);
  square(a * 0.42, true);

  // stitched cross through the centre
  segs.push([-a * 0.42, 0, a * 0.42, 0], [0, -a * 0.42, 0, a * 0.42]);

  return segs;
}

/* ── Circuit growth ─────────────────────────────────────────── */

export interface CircuitPath {
  pts: [number, number][];
  /** cumulative length at each point */
  cum: number[];
  len: number;
  /** normalised start time inside the circuit phase (0 → 1) */
  t0: number;
  /** 0 bone · 1 red · 2 green */
  hue: 0 | 1 | 2;
}

type Dir = [number, number];

/**
 * Grows orthogonal circuit traces outward from the octagram's exit points.
 * Pure geometry; rendering decides how much of each path is visible.
 */
export function generateCircuit(a: number, rng: () => number): CircuitPath[] {
  const step = a * 0.55;
  const paths: CircuitPath[] = [];

  const exits: { p: [number, number]; d: Dir }[] = [
    { p: [0, -a * SQ2], d: [0, -1] },
    { p: [a * SQ2, 0], d: [1, 0] },
    { p: [0, a * SQ2], d: [0, 1] },
    { p: [-a * SQ2, 0], d: [-1, 0] },
    { p: [a, -a], d: rng() < 0.5 ? [1, 0] : [0, -1] },
    { p: [a, a], d: rng() < 0.5 ? [1, 0] : [0, 1] },
    { p: [-a, a], d: rng() < 0.5 ? [-1, 0] : [0, 1] },
    { p: [-a, -a], d: rng() < 0.5 ? [-1, 0] : [0, -1] },
    // secondary exits along square edges
    { p: [a, -a * 0.5], d: [1, 0] },
    { p: [a, a * 0.5], d: [1, 0] },
    { p: [-a, -a * 0.5], d: [-1, 0] },
    { p: [-a, a * 0.5], d: [-1, 0] },
    { p: [-a * 0.5, -a], d: [0, -1] },
    { p: [a * 0.5, -a], d: [0, -1] },
    { p: [-a * 0.5, a], d: [0, 1] },
    { p: [a * 0.5, a], d: [0, 1] },
  ];

  const finish = (pts: [number, number][], t0: number, hue: 0 | 1 | 2) => {
    const cum = [0];
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i][0] - pts[i - 1][0];
      const dy = pts[i][1] - pts[i - 1][1];
      cum.push(cum[i - 1] + Math.hypot(dx, dy));
    }
    paths.push({ pts, cum, len: cum[cum.length - 1], t0, hue });
  };

  const walk = (
    start: [number, number],
    dir: Dir,
    steps: number,
    t0: number,
    depth: number
  ) => {
    const pts: [number, number][] = [start];
    let [x, y] = start;
    let d = dir;

    for (let i = 0; i < steps; i++) {
      // occasionally turn — always away from the centre
      if (i > 0 && rng() < 0.38) {
        const perps: Dir[] = d[0] !== 0 ? [[0, 1], [0, -1]] : [[1, 0], [-1, 0]];
        const outward = perps.filter((p) => p[0] * x + p[1] * y >= 0);
        const pick = outward.length ? outward : perps;
        const nd = pick[Math.floor(rng() * pick.length)];

        // branch from the corner
        if (depth === 0 && rng() < 0.4) {
          const other = perps.find((p) => p !== nd) ?? perps[0];
          if (other[0] * x + other[1] * y >= 0) {
            walk([x, y], other, 3 + Math.floor(rng() * 5), t0 + 0.25 + rng() * 0.3, 1);
          }
        }
        d = nd;
      }
      x += d[0] * step;
      y += d[1] * step;
      pts.push([x, y]);
    }

    const hue: 0 | 1 | 2 = rng() < 0.72 ? 0 : rng() < 0.55 ? 1 : 2;
    finish(pts, Math.min(t0, 0.7), hue);
  };

  exits.forEach((e, i) => {
    const main = i < 8;
    walk(
      e.p,
      e.d,
      main ? 8 + Math.floor(rng() * 7) : 4 + Math.floor(rng() * 5),
      main ? rng() * 0.25 : 0.2 + rng() * 0.3,
      0
    );
  });

  return paths;
}

/** Point at distance `d` along a path. */
export function pointAt(path: CircuitPath, d: number): [number, number] {
  const { pts, cum } = path;
  if (d <= 0) return pts[0];
  if (d >= path.len) return pts[pts.length - 1];
  let i = 1;
  while (cum[i] < d) i++;
  const t = (d - cum[i - 1]) / (cum[i] - cum[i - 1]);
  return [
    pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t,
    pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t,
  ];
}

/* ── 3D lattice for the WebGL object ─────────────────────────── */

export interface Lattice {
  offsets: Float32Array;
  rands: Float32Array;
  colorIds: Float32Array;
  dists: Float32Array;
  lines: Float32Array;
  count: number;
  spacing: number;
}

/**
 * Builds a stepped 3D octagram out of stitch positions.
 * z = 0  → full fill · z = ±1 → ring band · z = ±2 → outline only.
 */
export function buildLattice(n: number, halfSize = 1.5): Lattice {
  const a = halfSize / SQ2; // base square half-size so outer tips reach halfSize
  const spacing = (2 * halfSize) / (n - 1);
  const rng = mulberry32(31);

  const offsets: number[] = [];
  const rands: number[] = [];
  const colorIds: number[] = [];
  const dists: number[] = [];
  const index = new Map<string, number>();

  const key = (i: number, j: number, k: number) => `${i},${j},${k}`;

  /**
   * 0 bone · 1 red · 2 green · 3 ash
   * Mostly monochrome: a red core, sparse green stitches, bone outline.
   */
  const colorFor = (x: number, y: number, k: number, i: number, j: number) => {
    if (Math.abs(k) === 2) return 0;
    if (Math.abs(k) === 1) return 3;
    const r = octRadius(x, y, a);
    if (r < 0.2) return 1;
    if (r < 0.5) return (i + j) % 5 === 0 ? 0 : 3;
    if (r < 0.8) return (i * 7 + j * 3) % 13 === 0 ? 2 : 3;
    return 0;
  };

  for (let k = -2; k <= 2; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const x = -halfSize + i * spacing;
        const y = -halfSize + j * spacing;
        if (!inOctagram(x, y, a)) continue;

        const r = octRadius(x, y, a);
        const edge = 1 - spacing / a;
        const keep =
          k === 0 ||
          (Math.abs(k) === 1 && r > 0.48 && r < 0.86) ||
          (Math.abs(k) === 2 && r > edge);
        if (!keep) continue;

        index.set(key(i, j, k), offsets.length / 3);
        offsets.push(x, y, k * spacing * 1.4);
        rands.push(rng() * 2 - 1, rng() * 2 - 1, rng() * 2 - 1);
        colorIds.push(colorFor(x, y, k, i, j));
        dists.push(Math.min(1, Math.hypot(x, y, k * spacing) / (halfSize * 1.05)));
      }
    }
  }

  // wireframe edges between grid neighbours (same layer)
  const lines: number[] = [];
  index.forEach((idx, k) => {
    const [i, j, l] = k.split(",").map(Number);
    const ox = offsets[idx * 3];
    const oy = offsets[idx * 3 + 1];
    const oz = offsets[idx * 3 + 2];
    const right = index.get(key(i + 1, j, l));
    const up = index.get(key(i, j + 1, l));
    if (right !== undefined) {
      lines.push(ox, oy, oz, offsets[right * 3], offsets[right * 3 + 1], offsets[right * 3 + 2]);
    }
    if (up !== undefined) {
      lines.push(ox, oy, oz, offsets[up * 3], offsets[up * 3 + 1], offsets[up * 3 + 2]);
    }
  });

  return {
    offsets: new Float32Array(offsets),
    rands: new Float32Array(rands),
    colorIds: new Float32Array(colorIds),
    dists: new Float32Array(dists),
    lines: new Float32Array(lines),
    count: offsets.length / 3,
    spacing,
  };
}
