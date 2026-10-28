"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "../animations/gsap";

const NS = "http://www.w3.org/2000/svg";

interface SewnPath {
  d: string;
  cls: "xps--red" | "xps--green" | "xps--bone";
}

/** one octagram medallion as a single path — the crisp outer star only */
function star(cx: number, cy: number, a: number): string {
  const SQ2 = Math.SQRT2;
  const axis: [number, number][] = [
    [-a, -a],
    [a, -a],
    [a, a],
    [-a, a],
  ];
  const diag: [number, number][] = [
    [0, -a * SQ2],
    [a * SQ2, 0],
    [0, a * SQ2],
    [-a * SQ2, 0],
  ];
  const ring = (pts: [number, number][]) =>
    pts
      .map((p, i) => {
        const q = pts[(i + 1) % pts.length];
        return `M ${(cx + p[0]).toFixed(1)} ${(cy + p[1]).toFixed(1)} L ${(cx + q[0]).toFixed(1)} ${(cy + q[1]).toFixed(1)}`;
      })
      .join(" ");
  // small cross at the heart
  const h = a * 0.34;
  const cross = `M ${cx - h} ${cy} L ${cx + h} ${cy} M ${cx} ${cy - h} L ${cx} ${cy + h}`;
  return `${ring(axis)} ${ring(diag)} ${cross}`;
}

/** a chain of diamonds along a straight run — the classic tatreez border */
function diamonds(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  dw: number,
  dh: number
): string {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  const n = Math.max(2, Math.floor(len / dw));
  const ux = dx / len;
  const uy = dy / len;
  // perpendicular
  const px = -uy;
  const py = ux;
  let d = "";
  for (let i = 0; i < n; i++) {
    const cx = x0 + ux * ((i + 0.5) * (len / n));
    const cy = y0 + uy * ((i + 0.5) * (len / n));
    const hw = dw / 2;
    d +=
      `M ${(cx - ux * hw).toFixed(1)} ${(cy - uy * hw).toFixed(1)} ` +
      `L ${(cx + px * dh).toFixed(1)} ${(cy + py * dh).toFixed(1)} ` +
      `L ${(cx + ux * hw).toFixed(1)} ${(cy + uy * hw).toFixed(1)} ` +
      `L ${(cx - px * dh).toFixed(1)} ${(cy - py * dh).toFixed(1)} Z `;
  }
  return d.trim();
}

function line(x0: number, y0: number, x1: number, y1: number): string {
  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}

/**
 * Builds the embroidered frame, sewn clockwise from the top-left medallion.
 * Order matters — the scroll needle follows this exact sequence.
 */
function buildFrame(w: number, h: number): SewnPath[] {
  const m = w < 700 ? 14 : 26;
  const a = w < 700 ? 17 : 26; // medallion half-size
  const pad = a + 10;
  const cxL = m + pad;
  const cxR = w - m - pad;
  const cyT = m + pad;
  const cyB = h - m - pad;
  const dh = w < 700 ? 5 : 7;

  return [
    { d: star(cxL, cyT, a), cls: "xps--red" }, // 1 · top-left medallion
    { d: diamonds(cxL + pad + 12, m + 10, cxR - pad - 12, m + 10, 34, dh), cls: "xps--red" }, // 2 · top border
    { d: line(cxL + pad + 12, m + 26, cxR - pad - 12, m + 26), cls: "xps--green" }, // 3 · top running thread
    { d: star(cxR, cyT, a), cls: "xps--green" }, // 4 · top-right medallion
    { d: diamonds(w - m - 10, cyT + pad + 12, w - m - 10, cyB - pad - 12, 34, dh), cls: "xps--red" }, // 5 · right border
    { d: line(w - m - 26, cyT + pad + 12, w - m - 26, cyB - pad - 12), cls: "xps--bone" }, // 6 · right running thread
    { d: star(cxR, cyB, a), cls: "xps--red" }, // 7 · bottom-right medallion
    { d: diamonds(cxR - pad - 12, h - m - 10, cxL + pad + 12, h - m - 10, 34, dh), cls: "xps--red" }, // 8 · bottom border
    { d: line(cxR - pad - 12, h - m - 26, cxL + pad + 12, h - m - 26), cls: "xps--green" }, // 9 · bottom running thread
    { d: star(cxL, cyB, a), cls: "xps--green" }, // 10 · bottom-left medallion
    { d: diamonds(m + 10, cyB - pad - 12, m + 10, cyT + pad + 12, 34, dh), cls: "xps--red" }, // 11 · left border
    { d: line(m + 26, cyB - pad - 12, m + 26, cyT + pad + 12), cls: "xps--bone" }, // 12 · left running thread
  ];
}

/**
 * The sewn frame — your scroll embroiders a tatreez border around the poster.
 * A fixed SVG above the content; GSAP scrubs each path's dash offset in order,
 * and a needle rides the tip of the thread currently being sewn.
 */
export function SewnPanel({ reduced }: { reduced: boolean }) {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svg.current;
    if (!el) return;

    let paths: SVGPathElement[] = [];
    let lens: number[] = [];
    let total = 1;
    let needleG: SVGGElement | null = null;
    let lastP = -1;
    let st: ScrollTrigger | null = null;

    const apply = (p: number) => {
      if (Math.abs(p - lastP) < 0.0004) return;
      lastP = p;
      let acc = 0;
      let needlePlaced = false;
      for (let i = 0; i < paths.length; i++) {
        const wi = lens[i] / total;
        const local = Math.min(1, Math.max(0, (p - acc) / wi));
        paths[i].style.strokeDashoffset = String(1 - local);
        if (!needlePlaced && needleG && local > 0 && local < 1) {
          const tip = paths[i].getPointAtLength(local * lens[i]);
          const ahead = paths[i].getPointAtLength(Math.min(lens[i], local * lens[i] + 3));
          const ang = (Math.atan2(ahead.y - tip.y, ahead.x - tip.x) * 180) / Math.PI;
          needleG.setAttribute("transform", `translate(${tip.x.toFixed(1)} ${tip.y.toFixed(1)}) rotate(${ang.toFixed(1)})`);
          needleG.style.opacity = "1";
          needlePlaced = true;
        }
        acc += wi;
      }
      if (!needlePlaced && needleG) needleG.style.opacity = p >= 1 ? "0" : needleG.style.opacity;
    };

    const build = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      el.setAttribute("viewBox", `0 0 ${w} ${h}`);
      el.innerHTML = "";

      paths = buildFrame(w, h).map(({ d, cls }) => {
        const node = document.createElementNS(NS, "path");
        node.setAttribute("d", d);
        node.setAttribute("class", `xps__path ${cls}`);
        node.setAttribute("pathLength", "1");
        node.style.strokeDasharray = "1";
        node.style.strokeDashoffset = reduced ? "0" : "1";
        el.appendChild(node);
        return node;
      });

      // the needle
      needleG = document.createElementNS(NS, "g");
      needleG.setAttribute("class", "xps__needle");
      needleG.style.opacity = "0";
      needleG.innerHTML = `
        <line x1="0" y1="0" x2="3" y2="-22" class="xps__needle-body" />
        <circle cx="2.7" cy="-19" r="1.7" class="xps__needle-eye" />`;
      el.appendChild(needleG);

      lens = paths.map((p) => p.getTotalLength());
      total = Math.max(1, lens.reduce((s, v) => s + v, 0));
      lastP = -1;
      apply(st ? st.progress : reduced ? 1 : 0);
    };

    build();

    if (!reduced) {
      st = ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: (self) => apply(self.progress),
      });
    }

    let resizeT = 0;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        build();
        st?.refresh();
      }, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeT);
      st?.kill();
    };
  }, [reduced]);

  return <svg ref={svg} className="xps" aria-hidden="true" preserveAspectRatio="none" />;
}
