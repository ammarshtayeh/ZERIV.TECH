"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../animations/gsap";
import { TransitionLink } from "./TransitionLink";

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
  /** how far the element follows the pointer (0 → 1) */
  strength?: number;
  cursor?: string;
  ariaLabel?: string;
}

/**
 * Magnetic CTA — the element leans toward the pointer while hovered and eases back on leave.
 * Fine pointers only; on touch it is a plain link.
 */
export function MagneticLink({ href, className, children, strength = 0.28, cursor = "expand", ariaLabel }: Props) {
  const wrap = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;

    const xTo = gsap.quickTo(inner, "x", { duration: 0.55, ease: "expo.out" });
    const yTo = gsap.quickTo(inner, "y", { duration: 0.55, ease: "expo.out" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={wrap} className="xp-magnet">
      <TransitionLink href={href} className={className} data-cursor={cursor} aria-label={ariaLabel}>
        {children}
      </TransitionLink>
    </span>
  );
}
