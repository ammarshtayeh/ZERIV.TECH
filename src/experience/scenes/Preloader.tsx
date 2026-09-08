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
import { BrandLogo } from "../ui/BrandLogo";

interface Props {
  tier: DeviceTier;
  reduced: boolean;
  /** Hero starts revealing — the preloader still holds the frame */
  onHandoff: () => void;
  /** Preloader is fully transparent and can unmount */
  onComplete: () => void;
}

const BONE = "232, 226, 210";
const RED = "206, 17, 38";
const GREEN = "0, 122, 61";
const HUES = [BONE, RED, GREEN];

const PARTICLE_COUNT: Record<DeviceTier, number> = { high: 1500, mid: 1000, low: 560 };

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Opening sequence: darkness → embroidery motif → circuit → zoom → the geometry dissolves into
 * particles that assemble a technical frame around the mark → the actual logo asset is revealed
 * behind a mask and a pass of light → frame disperses as the Hero takes over underneath.
 */
export function Preloader({ tier, reduced, onHandoff, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
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
    const logo = logoRef.current;
    const sweep = sweepRef.current;
    const tag = tagRef.current;
    if (!canvas || !root || !logo || !sweep || !tag) return;
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
    let ringFlag = new Uint8Array(0);
    let hueStart = [0, 0, 0, 0];
    let targetsReady = false;
    let pendingResume = false;
    let lcx = 0;
    let lcy = 0;

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

    /* ── particle targets: a technical frame around the hero's logo ── */
    const buildTargets = async () => {
      try {
        await document.fonts.ready;
      } catch {
        /* layout still fine with fallback fonts */
      }

      const heroLogo = document.querySelector<HTMLElement>("[data-hero-logo]");
      if (!heroLogo) return;
      const r = heroLogo.getBoundingClientRect();
      lcx = r.left + r.width / 2;
      lcy = r.top + r.height / 2;
      const R = Math.max(r.width, r.height) * 0.72;

      // mirror the DOM logo exactly over the hero's
      logo.style.left = `${r.left}px`;
      logo.style.top = `${r.top}px`;
      logo.style.width = `${r.width}px`;
      logo.style.height = `${r.height}px`;

      count = PARTICLE_COUNT[latest.current.tier];
      const pts: [number, number, number][] = []; // x, y, isRing

      // octagon ring — 72% of particles, ordered by angle so a signal can run around it
      const ringN = Math.floor(count * 0.72);
      for (let i = 0; i < ringN; i++) {
        const u = i / ringN;
        const side = Math.floor(u * 8);
        const f = u * 8 - side;
        const a0 = ((side + 0.5) * Math.PI) / 4;
        const a1 = ((side + 1.5) * Math.PI) / 4;
        const x0 = lcx + Math.cos(a0) * R;
        const y0 = lcy + Math.sin(a0) * R;
        const x1 = lcx + Math.cos(a1) * R;
        const y1 = lcy + Math.sin(a1) * R;
        const jitter = (rng() - 0.5) * 2.2;
        pts.push([x0 + (x1 - x0) * f + jitter, y0 + (y1 - y0) * f + jitter, 1]);
      }

      // corner brackets on the logo's bounding box — 16%
      const bracketN = Math.floor(count * 0.16);
      const bl = Math.min(r.width, r.height) * 0.14;
      const gap = Math.min(r.width, r.height) * 0.08;
      const corners: [number, number, number, number][] = [
        [r.left - gap, r.top - gap, 1, 1],
        [r.right + gap, r.top - gap, -1, 1],
        [r.right + gap, r.bottom + gap, -1, -1],
        [r.left - gap, r.bottom + gap, 1, -1],
      ];
      for (let i = 0; i < bracketN; i++) {
        const [bx, by, sx, sy] = corners[i % 4];
        const along = rng() * bl;
        if (rng() < 0.5) pts.push([bx + sx * along, by, 0]);
        else pts.push([bx, by + sy * along, 0]);
      }

      // hairlines running out from the ring on the horizontal axis — remainder
      while (pts.length < count) {
        const dir = rng() < 0.5 ? -1 : 1;
        const d = R * (1.12 + rng() * 0.55);
        pts.push([lcx + dir * d, lcy + (rng() - 0.5) * 1.5, 0]);
      }

      const sources = buildSources(count);
      // pair sources → targets by angle so the flow reads as a rotation into place
      const ang = (x: number, y: number) => Math.atan2(y - lcy, x - lcx);
      const srcSorted = sources
        .map((p, i) => ({ p, k: ang(cx + p[0], cy + p[1]) + i * 1e-6 }))
        .sort((m, n) => m.k - n.k)
        .map((m) => m.p);
      const dstSorted = pts
        .map((p) => ({ p, k: ang(p[0], p[1]) }))
        .sort((m, n) => m.k - n.k)
        .map((m) => m.p);

      const hue = new Uint8Array(count);
      for (let i = 0; i < count; i++) {
        const v = rng();
        hue[i] = v < 0.82 ? 0 : v < 0.92 ? 1 : 2;
      }
      const order = Array.from({ length: count }, (_, i) => i).sort((i, j) => hue[i] - hue[j]);

      ox = new Float32Array(count);
      oy = new Float32Array(count);
      tx = new Float32Array(count);
      ty = new Float32Array(count);
      delay = new Float32Array(count);
      seed = new Float32Array(count);
      ringFlag = new Uint8Array(count);
      const starts = [0, 0, 0, count];
      let seen = 0;
      for (let k = 0; k < count; k++) {
        const i = order[k];
        if (hue[i] > seen) {
          for (let h = seen + 1; h <= hue[i]; h++) starts[h] = k;
          seen = hue[i];
        }
        ox[k] = srcSorted[i][0];
        oy[k] = srcSorted[i][1];
        tx[k] = dstSorted[i][0];
        ty[k] = dstSorted[i][1];
        ringFlag[k] = dstSorted[i][2];
        delay[k] = rng() * 0.4;
        seed[k] = rng() * 6.283;
      }
      for (let h = seen + 1; h < 3; h++) starts[h] = count;
      hueStart = starts;

      // tagline under the frame
      tag.style.left = `${lcx}px`;
      tag.style.top = `${lcy + R + Math.max(18, H * 0.03)}px`;

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

      if (p > 0.85) {
        const alpha = (p - 0.85) / 0.15;
        ctx.fillStyle = `rgba(${RED}, ${alpha})`;
        const sz = 3.2 / s.zoom;
        for (const m of motif.slice(0, 8)) ctx.fillRect(m[0] - sz / 2, m[1] - sz / 2, sz, sz);
        ctx.fillStyle = `rgba(${GREEN}, ${alpha})`;
        for (const m of motif.slice(8, 16)) ctx.fillRect(m[0] - sz / 2, m[1] - sz / 2, sz, sz);
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

        ctx.fillStyle = `rgba(${BONE}, 0.85)`;
        for (let k = 1; k < i; k++) {
          const pt = path.pts[k];
          ctx.fillRect(pt[0] - nodeSize / 2, pt[1] - nodeSize / 2, nodeSize, nodeSize);
        }

        if (p >= 1) {
          const end = path.pts[path.pts.length - 1];
          const pad = 6 / s.zoom;
          ctx.strokeStyle = `rgba(${HUES[path.hue]}, 0.9)`;
          ctx.lineWidth = 1 / s.zoom;
          ctx.strokeRect(end[0] - pad / 2, end[1] - pad / 2, pad, pad);
        }

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

      // a signal running around the ring once it has formed
      const formed = s.form > 0.92;
      const head = (t * 0.55) % 1;

      for (let h = 0; h < 3; h++) {
        const start = hueStart[h];
        const end = hueStart[h + 1];
        if (end <= start) continue;
        const base = alphaBase * (h === 0 ? 0.9 : 1);
        ctx.fillStyle = `rgba(${HUES[h]}, ${base})`;

        for (let k = start; k < end; k++) {
          const f = easeInOutCubic(clamp01((s.form - delay[k]) / (1 - delay[k])));
          const sx = cx + ox[k] * z;
          const sy = cy + oy[k] * z;

          const wob = dis * (1 - f) * 10;
          const dx = Math.sin(t * 1.4 + seed[k]) * wob;
          const dy = Math.cos(t * 1.1 + seed[k] * 1.3) * wob;

          let x = sx + dx + (tx[k] - sx - dx) * f;
          let y = sy + dy + (ty[k] - sy - dy) * f;

          if (disp > 0) {
            const e = disp * disp;
            const rx = x - lcx;
            const ry = y - lcy;
            x += rx * 0.9 * e + Math.sin(seed[k]) * 24 * e;
            y += ry * 0.9 * e + Math.cos(seed[k]) * 24 * e;
          }

          let size = 1.15 + (1 - f) * 1.2;
          if (formed && ringFlag[k]) {
            const ang = (Math.atan2(y - lcy, x - lcx) / (Math.PI * 2) + 1.25) % 1;
            const d = (ang - head + 1) % 1;
            if (d < 0.08) size += (1 - d / 0.08) * 1.8;
          }
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

    tl.to(s, { motif: 1, duration: 0.95, ease: "power2.inOut" }, 0.12)
      .to(s, { circuit: 1, duration: 1.35, ease: "power1.inOut" }, 0.7)
      .to(s, { zoom: 2.15, duration: 1.45, ease: "power2.inOut" }, 1.0)
      .add(() => {
        if (!targetsReady) {
          pendingResume = true;
          tl.pause();
        }
      }, 2.2)
      .to(s, { dissolve: 1, duration: 0.6, ease: "power2.in" }, 2.25)
      .to(s, { form: 1, duration: 1.0, ease: "power3.inOut" }, 2.4)
      .fromTo(
        logo,
        { clipPath: "inset(50% 0 50% 0)", opacity: 1 },
        { clipPath: "inset(0% 0 0% 0)", duration: 0.85, ease: "power3.inOut" },
        2.95
      )
      .fromTo(sweep, { xPercent: -130 }, { xPercent: 130, duration: 0.95, ease: "power2.inOut" }, 3.15)
      .fromTo(
        tag,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        3.45
      )
      .add(() => latest.current.onHandoff(), 3.95)
      .to(s, { disperse: 1, duration: 0.75, ease: "power2.in" }, 4.0)
      .to(tag, { opacity: 0, duration: 0.35, ease: "power1.in" }, 4.0)
      .to(root, { backgroundColor: "rgba(7, 8, 10, 0)", duration: 0.7, ease: "power2.inOut" }, 4.05)
      .set(root, { pointerEvents: "none" }, 4.05)
      .to(logo, { opacity: 0, duration: 0.4, ease: "power1.inOut" }, 4.35)
      .add(() => latest.current.onComplete(), 4.85);

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
    <div ref={rootRef} className="xp-preloader" role="dialog" aria-label="Opening sequence">
      <canvas ref={canvasRef} className="xp-preloader__canvas" aria-hidden="true" />
      <div ref={logoRef} className="xp-preloader__logo">
        <BrandLogo priority decorative sizes="(max-width: 900px) 60vw, 24vw" />
        <div ref={sweepRef} className="xp-preloader__sweep" />
      </div>
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
