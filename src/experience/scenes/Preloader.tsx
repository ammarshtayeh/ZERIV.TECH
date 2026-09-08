"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../animations/gsap";
import {
  generateCircuit,
  mulberry32,
  octagramSegments,
  pointAt,
  type CircuitPath,
  type Seg,
} from "../lib/octagram";
import type { DeviceTier } from "../hooks/useDeviceTier";

interface Props {
  tier: DeviceTier;
  reduced: boolean;
  /** Hero starts revealing — particles still hold the word */
  onHandoff: () => void;
  /** Preloader is fully transparent and can unmount */
  onComplete: () => void;
}

const BONE = "232, 226, 210";
const RED = "206, 17, 38";
const GREEN = "0, 122, 61";
const HUES = [BONE, RED, GREEN];

const PARTICLE_CAP: Record<DeviceTier, number> = { high: 3400, mid: 1900, low: 900 };
const SAMPLE_STEP: Record<DeviceTier, number> = { high: 5, mid: 7, low: 9 };

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function Preloader({ tier, reduced, onHandoff, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const latest = useRef({ tier, onHandoff, onComplete });
  latest.current = { tier, onHandoff, onComplete };

  useEffect(() => {
    if (reduced) {
      latest.current.onHandoff();
      const t = window.setTimeout(() => latest.current.onComplete(), 60);
      return () => window.clearTimeout(t);
    }

    const canvas = canvasRef.current;
    const root = rootRef.current;
    const tag = tagRef.current;
    if (!canvas || !root || !tag) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    /* ── state ─────────────────────────────────────────── */
    let W = 0;
    let H = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let a = 0;

    const rng = mulberry32(7);
    let motif: Seg[] = [];
    let motifLen = 0;
    let paths: CircuitPath[] = [];

    // particles
    let count = 0;
    let ox = new Float32Array(0);
    let oy = new Float32Array(0);
    let tx = new Float32Array(0);
    let ty = new Float32Array(0);
    let delay = new Float32Array(0);
    let seed = new Float32Array(0);
    let hueStart = [0, 0, 0, 0];
    let targetsReady = false;
    let pendingResume = false;

    const s = {
      motif: 0,
      circuit: 0,
      zoom: 1,
      dissolve: 0,
      form: 0,
      disperse: 0,
      time: 0,
    };

    /* ── layout ────────────────────────────────────────── */
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2;
      cy = H / 2;
      a = Math.min(W, H) * 0.062;
      motif = octagramSegments(a);
      motifLen = motif.reduce((acc, m) => acc + Math.hypot(m[2] - m[0], m[3] - m[1]), 0);
      paths = generateCircuit(a, mulberry32(11));
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── particle sources: uniform samples along circuit + motif ── */
    const buildSources = (n: number) => {
      const total = paths.reduce((acc, p) => acc + p.len, 0) + motifLen;
      const src: [number, number][] = [];
      for (let i = 0; i < n; i++) {
        let d = ((i + rng()) / n) * total;
        let placed = false;
        for (const p of paths) {
          if (d <= p.len) {
            src.push(pointAt(p, d));
            placed = true;
            break;
          }
          d -= p.len;
        }
        if (!placed) {
          // fall onto the motif
          for (const m of motif) {
            const len = Math.hypot(m[2] - m[0], m[3] - m[1]);
            if (d <= len) {
              const t = d / len;
              src.push([m[0] + (m[2] - m[0]) * t, m[1] + (m[3] - m[1]) * t]);
              placed = true;
              break;
            }
            d -= len;
          }
        }
        if (!placed) src.push([0, 0]);
      }
      return src;
    };

    /* ── particle targets: rasterise the live hero letters ── */
    const buildTargets = async () => {
      try {
        await document.fonts.ready;
        await document.fonts.load("800 100px Syne");
      } catch {
        /* font may be unavailable — sampling still works with fallback */
      }

      const letters = Array.from(
        document.querySelectorAll<HTMLElement>("[data-hero-letter]")
      );
      if (!letters.length) return;

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d");
      if (!octx) return;

      octx.fillStyle = "#fff";
      octx.textBaseline = "middle";
      octx.textAlign = "left";

      let bottom = 0;
      let left = Infinity;
      for (const el of letters) {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        octx.font = `${cs.fontWeight} ${parseFloat(cs.fontSize)}px ${cs.fontFamily}`;
        octx.fillText(el.dataset.heroLetter ?? "", r.left, r.top + r.height / 2);
        bottom = Math.max(bottom, r.bottom);
        left = Math.min(left, r.left);
      }

      const step = SAMPLE_STEP[latest.current.tier];
      const img = octx.getImageData(0, 0, W, H).data;
      const pts: number[] = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (img[(y * W + x) * 4 + 3] > 110) {
            pts.push(x + (rng() - 0.5) * step * 0.7, y + (rng() - 0.5) * step * 0.7);
          }
        }
      }

      // cap & shuffle down if needed
      const cap = PARTICLE_CAP[latest.current.tier];
      let pairs: [number, number][] = [];
      for (let i = 0; i < pts.length; i += 2) pairs.push([pts[i], pts[i + 1]]);
      if (pairs.length > cap) {
        for (let i = pairs.length - 1; i > 0; i--) {
          const j = Math.floor(rng() * (i + 1));
          [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
        }
        pairs = pairs.slice(0, cap);
      }
      count = pairs.length;

      // sweep: sort both sets by x so the flow reads left → right
      pairs.sort((p, q) => p[0] - q[0]);
      const sources = buildSources(count).sort((p, q) => p[0] - q[0]);

      // group by hue so we can batch fillStyle changes
      const hue = new Uint8Array(count);
      for (let i = 0; i < count; i++) {
        const r = rng();
        hue[i] = r < 0.8 ? 0 : r < 0.91 ? 1 : 2;
      }
      const order = Array.from({ length: count }, (_, i) => i).sort((i, j) => hue[i] - hue[j]);

      ox = new Float32Array(count);
      oy = new Float32Array(count);
      tx = new Float32Array(count);
      ty = new Float32Array(count);
      delay = new Float32Array(count);
      seed = new Float32Array(count);
      const starts = [0, 0, 0, count];
      let seen = 0;
      for (let k = 0; k < count; k++) {
        const i = order[k];
        if (hue[i] > seen) {
          for (let h = seen + 1; h <= hue[i]; h++) starts[h] = k;
          seen = hue[i];
        }
        ox[k] = sources[i][0];
        oy[k] = sources[i][1];
        tx[k] = pairs[i][0];
        ty[k] = pairs[i][1];
        delay[k] = rng() * 0.4;
        seed[k] = rng() * 6.283;
      }
      for (let h = seen + 1; h < 3; h++) starts[h] = count;
      hueStart = starts;

      // position the tagline under the word
      tag.style.left = `${left}px`;
      tag.style.top = `${bottom + Math.max(16, H * 0.02)}px`;

      targetsReady = true;
      if (pendingResume) tlRef.current?.resume();
    };

    void buildTargets();

    /* ── drawing ───────────────────────────────────────── */
    const drawMotif = () => {
      const p = s.motif;
      if (p <= 0) return;
      let budget = p * motifLen;
      ctx.lineCap = "square";
      ctx.lineJoin = "miter";

      for (const m of motif) {
        if (budget <= 0) break;
        const len = Math.hypot(m[2] - m[0], m[3] - m[1]);
        const t = Math.min(1, budget / len);
        const x2 = m[0] + (m[2] - m[0]) * t;
        const y2 = m[1] + (m[3] - m[1]) * t;

        ctx.strokeStyle = `rgba(${BONE}, 0.18)`;
        ctx.lineWidth = 4 / s.zoom;
        ctx.beginPath();
        ctx.moveTo(m[0], m[1]);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(${BONE}, ${0.55 + 0.45 * p})`;
        ctx.lineWidth = 1.2 / s.zoom;
        ctx.beginPath();
        ctx.moveTo(m[0], m[1]);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        budget -= len;
      }

      // stitch nodes at the vertices once the motif is complete
      if (p > 0.85) {
        const alpha = (p - 0.85) / 0.15;
        ctx.fillStyle = `rgba(${RED}, ${alpha})`;
        const sz = 3.2 / s.zoom;
        for (const m of motif.slice(0, 8)) {
          ctx.fillRect(m[0] - sz / 2, m[1] - sz / 2, sz, sz);
        }
        ctx.fillStyle = `rgba(${GREEN}, ${alpha})`;
        for (const m of motif.slice(8, 16)) {
          ctx.fillRect(m[0] - sz / 2, m[1] - sz / 2, sz, sz);
        }
      }
    };

    const drawCircuit = () => {
      const c = s.circuit;
      if (c <= 0) return;
      ctx.lineCap = "butt";
      ctx.lineJoin = "miter";
      const nodeSize = 3 / s.zoom;

      for (const path of paths) {
        const p = clamp01((c - path.t0) / (1 - path.t0));
        if (p <= 0) continue;
        const eased = 1 - Math.pow(1 - p, 3);
        const visible = eased * path.len;

        // trace
        ctx.strokeStyle = `rgba(${BONE}, 0.42)`;
        ctx.lineWidth = 1 / s.zoom;
        ctx.beginPath();
        ctx.moveTo(path.pts[0][0], path.pts[0][1]);
        let i = 1;
        while (i < path.pts.length && path.cum[i] <= visible) {
          ctx.lineTo(path.pts[i][0], path.pts[i][1]);
          i++;
        }
        if (i < path.pts.length) {
          const [ex, ey] = pointAt(path, visible);
          ctx.lineTo(ex, ey);
        }
        ctx.stroke();

        // nodes at reached corners
        ctx.fillStyle = `rgba(${BONE}, 0.85)`;
        for (let k = 1; k < i; k++) {
          const pt = path.pts[k];
          ctx.fillRect(pt[0] - nodeSize / 2, pt[1] - nodeSize / 2, nodeSize, nodeSize);
        }

        // terminal pad
        if (p >= 1) {
          const end = path.pts[path.pts.length - 1];
          const pad = 6 / s.zoom;
          ctx.strokeStyle = `rgba(${HUES[path.hue]}, 0.9)`;
          ctx.lineWidth = 1 / s.zoom;
          ctx.strokeRect(end[0] - pad / 2, end[1] - pad / 2, pad, pad);
        }

        // signal pulse travelling along the visible trace
        if (visible > 0) {
          const speed = 90 + path.hue * 30;
          const d = ((s.time * speed + path.t0 * 400) % (visible + 40)) - 20;
          if (d > 0 && d < visible) {
            const [sx, sy] = pointAt(path, d);
            const [bx, by] = pointAt(path, Math.max(0, d - 14));
            ctx.strokeStyle = `rgba(${HUES[path.hue]}, 0.35)`;
            ctx.lineWidth = 2.2 / s.zoom;
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(sx, sy);
            ctx.stroke();
            ctx.fillStyle = `rgba(${HUES[path.hue]}, 1)`;
            const ps = 2.6 / s.zoom;
            ctx.fillRect(sx - ps / 2, sy - ps / 2, ps, ps);
          }
        }
      }
    };

    const drawParticles = () => {
      if (!targetsReady || s.dissolve <= 0) return;
      const z = s.zoom;
      const dis = s.dissolve;
      const disp = s.disperse;
      const t = s.time;
      const alphaBase = Math.min(1, dis * 1.4) * (1 - disp);
      if (alphaBase <= 0.01) return;

      for (let h = 0; h < 3; h++) {
        const start = hueStart[h];
        const end = hueStart[h + 1];
        if (end <= start) continue;
        ctx.fillStyle = `rgba(${HUES[h]}, ${alphaBase * (h === 0 ? 0.92 : 1)})`;

        for (let k = start; k < end; k++) {
          const f = easeInOutCubic(clamp01((s.form - delay[k]) / (1 - delay[k])));
          const sx = cx + ox[k] * z;
          const sy = cy + oy[k] * z;

          // loose drift while the geometry is dissolving
          const wob = dis * (1 - f) * 10;
          const dx = Math.sin(t * 1.4 + seed[k]) * wob;
          const dy = Math.cos(t * 1.1 + seed[k] * 1.3) * wob;

          let x = sx + dx + (tx[k] - sx - dx) * f;
          let y = sy + dy + (ty[k] - sy - dy) * f;

          if (disp > 0) {
            const e = disp * disp;
            x += (x - cx) * 0.18 * e + Math.sin(seed[k]) * 30 * e;
            y -= (40 + (seed[k] / 6.283) * 160) * e;
          }

          const size = 1.1 + (1 - f) * 1.2;
          ctx.fillRect(x, y, size, size);
        }
      }
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      s.time += dt;

      ctx.clearRect(0, 0, W, H);

      const lineAlpha = 1 - s.dissolve;
      if (lineAlpha > 0.005) {
        ctx.save();
        ctx.globalAlpha = lineAlpha;
        ctx.translate(cx, cy);
        ctx.scale(s.zoom, s.zoom);
        drawMotif();
        drawCircuit();
        ctx.restore();
      }

      drawParticles();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    /* ── master timeline ───────────────────────────────── */
    const tl = gsap.timeline({ defaults: { ease: "none" } });
    tlRef.current = tl;

    tl.to(s, { motif: 1, duration: 1.4, ease: "power2.inOut" }, 0.25)
      .to(s, { circuit: 1, duration: 2.0, ease: "power1.inOut" }, 1.15)
      .to(s, { zoom: 2.15, duration: 2.1, ease: "power2.inOut" }, 1.7)
      .add(() => {
        if (!targetsReady) {
          pendingResume = true;
          tl.pause();
        }
      }, 3.45)
      .to(s, { dissolve: 1, duration: 0.9, ease: "power2.in" }, 3.5)
      .to(s, { form: 1, duration: 1.45, ease: "power3.inOut" }, 3.85)
      .fromTo(
        tag,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        4.95
      )
      .add(() => latest.current.onHandoff(), 5.75)
      .to(s, { disperse: 1, duration: 1.05, ease: "power2.in" }, 5.8)
      .to(tag, { opacity: 0, duration: 0.45, ease: "power1.in" }, 5.8)
      .to(
        root,
        { backgroundColor: "rgba(7, 8, 10, 0)", duration: 0.95, ease: "power2.inOut" },
        5.85
      )
      .set(root, { pointerEvents: "none" }, 5.85)
      .add(() => latest.current.onComplete(), 6.95);

    // skip control appears after the motif settles
    if (skipRef.current) {
      gsap.fromTo(
        skipRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.2, ease: "power2.out" }
      );
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      tl.kill();
      tlRef.current = null;
    };
  }, [reduced]);

  const skip = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (tl.paused()) tl.resume();
    tl.timeScale(4.5);
    if (skipRef.current) skipRef.current.style.pointerEvents = "none";
  };

  if (reduced) return null;

  return (
    <div ref={rootRef} className="xp-preloader" aria-hidden="true">
      <canvas ref={canvasRef} className="xp-preloader__canvas" />
      <p ref={tagRef} className="xp-preloader__tag">
        TECHNOLOGY <span>×</span> DESIGN <span>×</span> CULTURE
      </p>
      <button
        ref={skipRef}
        type="button"
        className="xp-preloader__skip"
        onClick={skip}
        data-cursor="expand"
      >
        SKIP
      </button>
    </div>
  );
}
