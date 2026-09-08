"use client";

import { useEffect, useRef, useState } from "react";
import { useIsFinePointer } from "../hooks/useDeviceTier";

type Mode = "default" | "expand" | "view";

/**
 * Desktop-only cursor. Follows the pointer with a light lag,
 * grows on interactive elements and shows a label over project media.
 */
export function Cursor() {
  const fine = useIsFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const el = ref.current;
    if (!el) return;

    document.documentElement.classList.add("xp-cursor-on");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) setVisible(true);
    };

    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const next = (target?.dataset.cursor as Mode | undefined) ?? "default";
      setMode(next === "view" || next === "expand" ? next : "default");
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
      document.documentElement.classList.remove("xp-cursor-on");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fine]);

  if (!fine) return null;

  return (
    <div ref={ref} className="xp-cursor" data-mode={mode} data-visible={visible} aria-hidden="true">
      <span className="xp-cursor__label">VIEW</span>
    </div>
  );
}
