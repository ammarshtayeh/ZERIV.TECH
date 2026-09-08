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
 * Desktop-only cursor. A minimal dot that follows with a light lag; it grows into a ring on
 * interactive elements and into a labelled disc for VIEW / EXPLORE / OPEN / DRAG contexts.
 * Driven entirely through the DOM — no React state on pointer events.
 */
export function Cursor() {
  const fine = useIsFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!fine) return;
    const el = ref.current;
    const lb = label.current;
    if (!el || !lb) return;

    document.documentElement.classList.add("xp-cursor-on");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let mode: Mode = "default";
    let pressed = false;

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
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const raw = target?.dataset.cursor as Mode | undefined;
      setMode(raw && MODES.includes(raw) ? raw : "default");
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
    <div ref={ref} className="xp-cursor" data-mode="default" data-visible="false" aria-hidden="true">
      <span ref={label} className="xp-cursor__label">
        VIEW
      </span>
    </div>
  );
}
