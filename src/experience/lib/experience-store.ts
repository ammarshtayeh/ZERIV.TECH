"use client";

import { useSyncExternalStore } from "react";
import type Lenis from "lenis";

export type Phase = "loading" | "revealing" | "ready";

/**
 * High-frequency values shared between scroll/pointer logic and the WebGL layer.
 * Mutated directly inside rAF/GSAP — never triggers React renders.
 */
export const xp = {
  pointer: { x: 0, y: 0, tx: 0, ty: 0 },
  /** 0 → 1 lattice reveal driven by the preloader hand-off */
  reveal: 0,
  /** 0 → 1 scroll progress through each pinned/tracked scene */
  hero: 0,
  identity: 0,
  capabilities: 0,
  work: 0,
  signature: 0,
  final: 0,
  /** hovered capability index, -1 when none */
  service: -1,
  /** smooth scroll instance (set by useLenis) */
  lenis: null as Lenis | null,
};

/* ── Low-frequency phase store (React-visible) ── */
let phase: Phase = "loading";
const listeners = new Set<() => void>();

export function setPhase(next: Phase) {
  if (phase === next) return;
  phase = next;
  listeners.forEach((l) => l());
}

export function getPhase() {
  return phase;
}

export function subscribePhase(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function usePhase(): Phase {
  return useSyncExternalStore(subscribePhase, getPhase, () => "loading");
}

/** Scroll to an in-page target through Lenis when available. */
export function scrollToTarget(target: string | HTMLElement, offset = 0) {
  if (xp.lenis) {
    xp.lenis.scrollTo(target, { offset, duration: 1.6 });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  el?.scrollIntoView({ behavior: "smooth" });
}
