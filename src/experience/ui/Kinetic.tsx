"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";

/* ════════════════════════════════════════════════════════════
   KINETIC — the living-type system
   ════════════════════════════════════════════════════════════ */

const ARABIC = /[\u0600-\u06FF]/;

interface KineticCharsProps {
  text: string;
  className?: string;
  /** visual accent on the whole unit group */
  accent?: "outline" | "red" | "green";
  /** periodic RGB-split glitch on the whole phrase */
  glitch?: boolean;
  /** disable the pointer wave (render static, still mask-revealable) */
  wave?: boolean;
}

/**
 * Living text. Latin splits per character, Arabic per word (joining must survive).
 * Units near the pointer lift, thicken and tilt; everything eases back on leave.
 */
export function KineticChars({
  text,
  className,
  accent,
  glitch = false,
  wave = true,
}: KineticCharsProps) {
  const root = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const pointer = useRef({ x: 0, y: 0, inside: false });

  const units = useMemo(() => {
    if (ARABIC.test(text)) return text.split(/\s+/).filter(Boolean);
    return [...text];
  }, [text]);

  const isWords = ARABIC.test(text);

  useEffect(() => {
    const el = root.current;
    if (!el || !wave) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const inners = Array.from(el.querySelectorAll<HTMLElement>(".xpk__i"));
    if (!inners.length) return;

    const tick = () => {
      raf.current = 0;
      if (!pointer.current.inside) return;
      const { x, y } = pointer.current;
      for (const inner of inners) {
        const r = inner.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y);
        const k = Math.max(0, 1 - d / 150);
        inner.style.setProperty("--k", (k * k).toFixed(3));
      }
    };
    const schedule = () => {
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      pointer.current.inside = true;
      el.dataset.live = "true";
      schedule();
    };
    const onLeave = () => {
      pointer.current.inside = false;
      delete el.dataset.live;
      for (const inner of inners) inner.style.removeProperty("--k");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [wave, units.length]);

  return (
    <span
      ref={root}
      className={`xpk${className ? ` ${className}` : ""}`}
      data-accent={accent}
      data-glitch={glitch ? "true" : undefined}
      data-words={isWords ? "true" : undefined}
      data-text={glitch ? text : undefined}
      aria-hidden="true"
    >
      {units.map((u, i) => (
        <span key={`${u}-${i}`} className="xpk__u">
          <span className="xpk__i">{u === " " ? "\u00A0" : u}</span>
          {isWords && i < units.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

/* ── Marquee — an infinite stitched band ───────────────────── */

interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
  /** outlined (stroke) instead of solid type */
  outline?: boolean;
  /** seconds per loop */
  speed?: number;
}

export function Marquee({ items, className, reverse, outline, speed = 26 }: MarqueeProps) {
  const seq = (hidden: boolean) => (
    <div className="xpm__seq" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span className="xpm__unit" key={`${item}-${i}`}>
          <span className="xpm__item">{item}</span>
          <Stitch className="xpm__star" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`xpm${className ? ` ${className}` : ""}`}
      dir="ltr"
      data-reverse={reverse ? "true" : undefined}
      data-outline={outline ? "true" : undefined}
      style={{ "--xpm-dur": `${speed}s` } as CSSProperties}
    >
      <div className="xpm__track">
        {seq(false)}
        {seq(true)}
      </div>
    </div>
  );
}

/* ── Stitch — the eight-point tatreez star, as a glyph ─────── */

export function Stitch({ className }: { className?: string }) {
  return (
    <svg className={`xpst${className ? ` ${className}` : ""}`} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 1.5 L14.6 9.4 L22.5 12 L14.6 14.6 L12 22.5 L9.4 14.6 L1.5 12 L9.4 9.4 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* V4: Thread / Ghost / Hud removed — the SewnPanel carries the embroidery now. */
