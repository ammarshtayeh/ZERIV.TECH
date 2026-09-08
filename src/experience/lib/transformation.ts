/**
 * Signature transformation — one Canvas 2D system, seven states, scrubbed by scroll.
 *
 *   0 EMBROIDERY  cross-stitches on fabric
 *   1 GEOMETRY    stitches become vector diamonds and construction lines
 *   2 GRID        the pattern becomes nodes on a digital grid
 *   3 CIRCUITS    nodes wire up, signals travel
 *   4 CODE        nodes become characters
 *   5 PARTICLES   everything lets go and drifts
 *   6 ZERIV       the particles settle into a frame around the real mark
 *
 * Progress `p` (0 → 1) maps to `st = p * 6`; neighbouring states cross-fade with tent weights.
 */

import { mulberry32 } from "./octagram";

export const STAGES = ["EMBROIDERY", "GEOMETRY", "GRID", "CIRCUITS", "CODE", "PARTICLES", "ZERIV"] as const;

const BONE = "232, 226, 210";
const RED = "206, 17, 38";
const GREEN = "0, 122, 61";
const TAN = "205, 178, 128";
const HUE = [BONE, RED, GREEN, TAN];
const CHARS = "01<>/{}[]=;:#$%&*+-";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const tent = (st: number, k: number) => Math.max(0, 1 - Math.abs(st - k));
const ease = (t: number) => t * t * (3 - 2 * t);

/** tatreez-inspired medallion on a 25×25 grid — returns colour id or -1 */
export function motifAt(i: number, j: number): number {
  const a = Math.abs(i);
  const b = Math.abs(j);
  const m = Math.max(a, b);
  const d = a + b;

  // central eight-pointed star (diamond ∪ square), green heart
  if (d <= 1) return 2;
  if (d <= 4 || m <= 3) return 1;
  // fine bone ring around the star
  if ((m === 6 && d <= 9) || (d === 9 && m <= 6)) return 0;
  // diagonal rays toward the corners
  if (a === b && a >= 8 && a <= 11) return 1;
  // small green diamonds at the four cardinal points
  for (const [cx, cy] of [
    [0, 9],
    [0, -9],
    [9, 0],
    [-9, 0],
  ]) {
    if (Math.abs(i - cx) + Math.abs(j - cy) <= 1) return 2;
  }
  // tan accent pips on the ring's diagonals
  if (a === b && a === 5) return 3;
  // stitched border, alternating
  if (m === 12 && (i + j) % 2 === 0) return 0;
  return -1;
}

interface Cell {
  i: number;
  j: number;
  hue: number;
  rnd: number;
  dir: [number, number];
  ring: number; // 0..1 position around the final octagon
}

interface Trace {
  pts: [number, number][]; // grid coords
  hue: number;
  phase: number;
}

export interface Transformation {
  setProgress: (p: number) => void;
  setPointer: (x: number, y: number) => void;
  resize: () => void;
  start: () => void;
  stop: () => void;
  destroy: () => void;
}

export function createTransformation(canvas: HTMLCanvasElement, opts: { density: number }): Transformation {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) throw new Error("2d context unavailable");

  const HALF = 12;
  const rng = mulberry32(31);

  /* motif cells */
  const cells: Cell[] = [];
  for (let j = -HALF; j <= HALF; j++) {
    for (let i = -HALF; i <= HALF; i++) {
      const hue = motifAt(i, j);
      if (hue < 0) continue;
      const ang = Math.atan2(j, i);
      cells.push({
        i,
        j,
        hue,
        rnd: rng(),
        dir: [Math.cos(ang) + (rng() - 0.5) * 0.8, Math.sin(ang) + (rng() - 0.5) * 0.8],
        ring: (ang / (Math.PI * 2) + 1) % 1,
      });
    }
  }
  const cellMap = new Map<string, Cell>();
  cells.forEach((c) => cellMap.set(`${c.i},${c.j}`, c));
  const has = (i: number, j: number) => cellMap.has(`${i},${j}`);

  /* orthogonal adjacency (for geometry + circuits) */
  const edges: [Cell, Cell][] = [];
  for (const c of cells) {
    const r = cellMap.get(`${c.i + 1},${c.j}`);
    const dn = cellMap.get(`${c.i},${c.j + 1}`);
    if (r) edges.push([c, r]);
    if (dn) edges.push([c, dn]);
  }

  /* long traces from the border outward to the canvas edge */
  const traces: Trace[] = [];
  const border = cells.filter((c) => Math.max(Math.abs(c.i), Math.abs(c.j)) === HALF);
  for (let k = 0; k < border.length; k += 3) {
    const c = border[k];
    const out: [number, number] = [Math.sign(c.i) * (Math.abs(c.i) === HALF ? 1 : 0), Math.sign(c.j) * (Math.abs(c.j) === HALF ? 1 : 0)];
    if (!out[0] && !out[1]) continue;
    const len1 = 3 + Math.floor(rng() * 5);
    const len2 = 3 + Math.floor(rng() * 6);
    const p0: [number, number] = [c.i, c.j];
    const p1: [number, number] = [c.i + out[0] * len1, c.j + out[1] * len1];
    const side: [number, number] = out[0] ? [0, rng() < 0.5 ? -1 : 1] : [rng() < 0.5 ? -1 : 1, 0];
    const p2: [number, number] = [p1[0] + side[0] * len2, p1[1] + side[1] * len2];
    const p3: [number, number] = [p2[0] + out[0] * (4 + rng() * 6), p2[1] + out[1] * (4 + rng() * 6)];
    traces.push({ pts: [p0, p1, p2, p3], hue: rng() < 0.75 ? 0 : rng() < 0.5 ? 1 : 2, phase: rng() });
  }

  /* non-motif grid cells (for the GRID stage) — thinned by density */
  const bgCells: [number, number][] = [];
  for (let j = -HALF; j <= HALF; j++)
    for (let i = -HALF; i <= HALF; i++) if (!has(i, j) && rng() < opts.density) bgCells.push([i, j]);

  /* ── state ── */
  let W = 0;
  let H = 0;
  let cx = 0;
  let cy = 0;
  let cs = 10; // cell size
  let R = 0; // final ring radius
  let progress = 0;
  let time = 0;
  let px = 0;
  let py = 0;
  let raf = 0;
  let running = false;
  let last = 0;

  const resize = () => {
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W / 2;
    cy = H / 2;
    const S = Math.min(W, H) * (W < 900 ? 0.86 : 0.7);
    cs = S / (HALF * 2 + 1);
    R = Math.min(W, H) * (W < 900 ? 0.36 : 0.3);
  };

  const gx = (i: number) => cx + i * cs;
  const gy = (j: number) => cy + j * cs;

  /* ── stage renderers ── */
  const drawEmbroidery = (w: number, st: number) => {
    // stitches appear from the centre outward as the scene begins
    const grow = clamp01(st * 2.4 + 0.3);
    ctx.lineCap = "square";
    ctx.lineWidth = Math.max(1.2, cs * 0.22);
    const half = cs * 0.36;
    for (const c of cells) {
      const dist = Math.hypot(c.i, c.j) / (HALF * 1.42);
      const a = clamp01((grow - dist) * 4) * w;
      if (a <= 0.01) continue;
      const x = gx(c.i) + (c.rnd - 0.5) * 0.8;
      const y = gy(c.j) + (c.rnd - 0.5) * 0.8;
      ctx.strokeStyle = `rgba(${HUE[c.hue]}, ${a * 0.95})`;
      ctx.beginPath();
      ctx.moveTo(x - half, y - half);
      ctx.lineTo(x + half, y + half);
      ctx.moveTo(x + half, y - half);
      ctx.lineTo(x - half, y + half);
      ctx.stroke();
    }
  };

  const drawGeometry = (w: number) => {
    ctx.lineWidth = 1;
    ctx.lineCap = "butt";
    const half = cs * 0.42;
    for (const c of cells) {
      const x = gx(c.i);
      const y = gy(c.j);
      ctx.strokeStyle = `rgba(${c.hue === 1 ? RED : c.hue === 2 ? GREEN : BONE}, ${w * 0.85})`;
      ctx.beginPath();
      ctx.moveTo(x, y - half);
      ctx.lineTo(x + half, y);
      ctx.lineTo(x, y + half);
      ctx.lineTo(x - half, y);
      ctx.closePath();
      ctx.stroke();
    }
    // construction lines — diagonals & axes through the composition
    ctx.strokeStyle = `rgba(${BONE}, ${w * 0.16})`;
    const ext = cs * (HALF + 3);
    ctx.beginPath();
    ctx.moveTo(cx - ext, cy);
    ctx.lineTo(cx + ext, cy);
    ctx.moveTo(cx, cy - ext);
    ctx.lineTo(cx, cy + ext);
    ctx.moveTo(cx - ext, cy - ext);
    ctx.lineTo(cx + ext, cy + ext);
    ctx.moveTo(cx + ext, cy - ext);
    ctx.lineTo(cx - ext, cy + ext);
    ctx.stroke();
    ctx.strokeStyle = `rgba(${BONE}, ${w * 0.3})`;
    ctx.beginPath();
    ctx.rect(gx(-HALF) - cs / 2, gy(-HALF) - cs / 2, cs * (HALF * 2 + 1), cs * (HALF * 2 + 1));
    ctx.stroke();
  };

  const drawGrid = (w: number) => {
    ctx.fillStyle = `rgba(${BONE}, ${w * 0.22})`;
    for (const [i, j] of bgCells) ctx.fillRect(gx(i) - 0.75, gy(j) - 0.75, 1.5, 1.5);
    for (const c of cells) {
      const s = c.hue === 0 ? 2.4 : 3.2;
      ctx.fillStyle = `rgba(${HUE[c.hue]}, ${w})`;
      ctx.fillRect(gx(c.i) - s / 2, gy(c.j) - s / 2, s, s);
    }
    // faint neighbour links appear as the grid "wakes"
    ctx.strokeStyle = `rgba(${BONE}, ${w * 0.18})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const [a, b] of edges) {
      ctx.moveTo(gx(a.i), gy(a.j));
      ctx.lineTo(gx(b.i), gy(b.j));
    }
    ctx.stroke();
  };

  const drawCircuits = (w: number) => {
    ctx.lineWidth = 1;
    ctx.lineCap = "butt";
    ctx.lineJoin = "miter";
    ctx.strokeStyle = `rgba(${BONE}, ${w * 0.55})`;
    ctx.beginPath();
    for (const [a, b] of edges) {
      ctx.moveTo(gx(a.i), gy(a.j));
      ctx.lineTo(gx(b.i), gy(b.j));
    }
    ctx.stroke();

    // nodes
    for (const c of cells) {
      ctx.fillStyle = `rgba(${HUE[c.hue]}, ${w})`;
      ctx.fillRect(gx(c.i) - 1.5, gy(c.j) - 1.5, 3, 3);
    }

    // outward traces + pulses
    for (const t of traces) {
      ctx.strokeStyle = `rgba(${BONE}, ${w * 0.42})`;
      ctx.beginPath();
      ctx.moveTo(gx(t.pts[0][0]), gy(t.pts[0][1]));
      for (let k = 1; k < t.pts.length; k++) ctx.lineTo(gx(t.pts[k][0]), gy(t.pts[k][1]));
      ctx.stroke();
      const end = t.pts[t.pts.length - 1];
      ctx.strokeStyle = `rgba(${HUE[t.hue]}, ${w * 0.9})`;
      ctx.strokeRect(gx(end[0]) - 3, gy(end[1]) - 3, 6, 6);

      // signal
      const u = (time * 0.35 + t.phase) % 1;
      const seg = Math.min(t.pts.length - 2, Math.floor(u * (t.pts.length - 1)));
      const f = u * (t.pts.length - 1) - seg;
      const sx = gx(t.pts[seg][0] + (t.pts[seg + 1][0] - t.pts[seg][0]) * f);
      const sy = gy(t.pts[seg][1] + (t.pts[seg + 1][1] - t.pts[seg][1]) * f);
      ctx.fillStyle = `rgba(${HUE[t.hue]}, ${w})`;
      ctx.fillRect(sx - 2, sy - 2, 4, 4);
    }
  };

  const drawCode = (w: number) => {
    ctx.font = `500 ${Math.max(8, cs * 0.78)}px var(--font-mono), ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const tick = Math.floor(time * 4);
    for (const c of cells) {
      const idx = (Math.floor(c.rnd * 977) + tick + c.i * 3 + c.j * 7) % CHARS.length;
      const ch = CHARS[(idx + CHARS.length) % CHARS.length];
      ctx.fillStyle = `rgba(${c.hue === 1 ? RED : c.hue === 2 ? GREEN : BONE}, ${w * (c.hue === 0 ? 0.75 : 1)})`;
      ctx.fillText(ch, gx(c.i), gy(c.j));
    }
    // sparse ambient characters on the empty grid
    ctx.fillStyle = `rgba(${BONE}, ${w * 0.16})`;
    for (let k = 0; k < bgCells.length; k += 4) {
      const [i, j] = bgCells[k];
      ctx.fillText(CHARS[(k + tick) % CHARS.length], gx(i), gy(j));
    }
  };

  /** particles: cells scatter (q 0→1), then settle onto the ring (r 0→1) */
  const drawParticles = (w: number, q: number, r: number) => {
    const spread = cs * 9;
    const orbit = time * 0.18;
    for (const c of cells) {
      const x0 = gx(c.i);
      const y0 = gy(c.j);
      const eq = ease(q);
      const drift = Math.sin(time * 0.9 + c.rnd * 6.28) * cs * 0.6 * eq;
      let x = x0 + c.dir[0] * spread * eq * (0.6 + c.rnd * 0.8) + drift;
      let y = y0 + c.dir[1] * spread * eq * (0.6 + c.rnd * 0.8) - drift * 0.6;
      // pointer repulsion
      const ddx = x - px;
      const ddy = y - py;
      const dd = Math.hypot(ddx, ddy);
      if (dd < 120 && dd > 0.001) {
        const f = (1 - dd / 120) * 26 * eq;
        x += (ddx / dd) * f;
        y += (ddy / dd) * f;
      }
      if (r > 0) {
        const er = ease(r);
        // octagon frame around the mark
        const ang = c.ring * Math.PI * 2 + orbit;
        const side = Math.floor(((ang / (Math.PI * 2)) % 1 + 1) % 1 * 8);
        const f = ((((ang / (Math.PI * 2)) % 1) + 1) % 1) * 8 - side;
        const a0 = ((side + 0.5) * Math.PI) / 4;
        const a1 = ((side + 1.5) * Math.PI) / 4;
        const rr = R * (c.hue === 0 ? 1 : 1.07);
        const rx = cx + Math.cos(a0) * rr + (Math.cos(a1) - Math.cos(a0)) * rr * f;
        const ry = cy + Math.sin(a0) * rr + (Math.sin(a1) - Math.sin(a0)) * rr * f;
        x += (rx - x) * er;
        y += (ry - y) * er;
      }
      const s = 1.4 + (1 - eq) * 1.2 + r * 0.6;
      ctx.fillStyle = `rgba(${HUE[c.hue]}, ${w * (c.hue === 0 ? 0.85 : 1)})`;
      ctx.fillRect(x - s / 2, y - s / 2, s, s);
    }
  };

  /* ── frame ── */
  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    time += dt;

    ctx.clearRect(0, 0, W, H);
    const st = progress * 6;
    const zoom = 1 + progress * 0.22;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(zoom, zoom);
    ctx.translate(-cx, -cy);

    const w0 = tent(st, 0);
    const w1 = tent(st, 1);
    const w2 = tent(st, 2);
    const w3 = tent(st, 3);
    const w4 = tent(st, 4);
    const wP = clamp01(st - 4); // particles fade in from 4 → 5 and stay
    const q = clamp01((st - 4.4) / 0.9); // scatter amount
    const r = clamp01((st - 5.3) / 0.7); // ring settle

    if (w0 > 0) drawEmbroidery(w0, st);
    if (w1 > 0) drawGeometry(w1);
    if (w2 > 0) drawGrid(w2);
    if (w3 > 0) drawCircuits(w3);
    if (w4 > 0) drawCode(w4);
    if (wP > 0) drawParticles(wP, q, r);

    ctx.restore();
    if (running) raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  resize();
  return {
    setProgress: (p) => {
      progress = clamp01(p);
    },
    setPointer: (x, y) => {
      px = x;
      py = y;
    },
    resize,
    start,
    stop,
    destroy: () => {
      stop();
      cells.length = 0;
    },
  };
}
