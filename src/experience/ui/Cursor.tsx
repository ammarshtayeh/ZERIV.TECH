"use client";

import { useEffect, useRef } from "react";
import { useIsFinePointer } from "../hooks/useDeviceTier";

const MODES = ["default", "expand", "view", "explore", "open", "drag"] as const;
type Mode = (typeof MODES)[number];
const LABELS: Partial<Record<Mode, string>> = {
  view: "VIEW",
  explore: "EXPLORE",
  open: "OPEN",
  drag: "DRAG",
};

/**
 * Desktop-only cursor. A cross-stitch × that follows with a light lag; it grows into a ring on
 * interactive elements and into a labelled disc for VIEW / EXPLORE / OPEN / DRAG contexts.
 * A red thread — the needle's trail — is sewn behind it on a fixed canvas.
 * Driven entirely through the DOM — no React state on pointer events.
 */
export function Cursor() {
  const fine = useIsFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const trail = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!fine) return;
    const el = ref.current;
    const lb = label.current;
    const cv = trail.current;
    if (!el || !lb || !cv) return;

    document.documentElement.classList.add("xp-cursor-on");

    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const sizeTrail = () => {
      cv.width = Math.round(window.innerWidth * dpr);
      cv.height = Math.round(window.innerHeight * dpr);
      cv.style.width = `${window.innerWidth}px`;
      cv.style.height = `${window.innerHeight}px`;
    };
    sizeTrail();
    window.addEventListener("resize", sizeTrail);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let px = x;
    let py = y;
    let raf = 0;
    let mode: Mode = "default";
    let pressed = false;
    let onRed = false;
    let frame = 0;

    const setMode = (next: Mode) => {
      if (next === mode) return;
      mode = next;
      el.dataset.mode = next;
      const text = LABELS[next];
      if (text) lb.textContent = text;
    };

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.visible = "true";
    };
    const over = (e: PointerEvent) => {
      const node = e.target as HTMLElement | null;
      const target = node?.closest<HTMLElement>("[data-cursor]");
      const raw = target?.dataset.cursor as Mode | undefined;
      setMode(raw && MODES.includes(raw) ? raw : "default");
      // red × drowns on red surfaces (hero block, capabilities) — flip to bone
      onRed = !!node?.closest("[data-cursor-red]");
      el.dataset.tone = onRed ? "onred" : "default";
    };
    const down = () => {
      pressed = true;
      el.dataset.pressed = "true";
    };
    const up = () => {
      pressed = false;
      el.dataset.pressed = "false";
    };
    const leave = () => (el.dataset.visible = "false");
    const enter = () => (el.dataset.visible = "true");

    const loop = () => {
      const k = pressed ? 0.3 : 0.22;
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // sew the thread: fade the whole canvas a touch, then stitch to the new position
      if (ctx) {
        frame++;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (frame % 2 === 0) {
          ctx.globalCompositeOperation = "destination-out";
          ctx.fillStyle = "rgba(0,0,0,0.11)";
          ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        }
        const dist = Math.hypot(x - px, y - py);
        if (dist > 0.75) {
          ctx.globalCompositeOperation = "source-over";
          ctx.strokeStyle = onRed
            ? "rgba(247,243,234,0.9)"
            : document.documentElement.classList.contains("dark")
              ? "rgba(226,30,46,0.85)"
              : "rgba(200,16,34,0.8)";
          ctx.lineWidth = 1.4;
          ctx.lineCap = "round";
          ctx.setLineDash([5, 4]);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        px = x;
        py = y;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sizeTrail);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
      document.documentElement.classList.remove("xp-cursor-on");
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <canvas ref={trail} className="xp-trail" aria-hidden="true" />
      <div ref={ref} className="xp-cursor" data-mode="default" data-visible="false" aria-hidden="true">
        <span className="xp-cursor__x" aria-hidden="true" />
        <span ref={label} className="xp-cursor__label">
          VIEW
        </span>
      </div>
    </>
  );
}
