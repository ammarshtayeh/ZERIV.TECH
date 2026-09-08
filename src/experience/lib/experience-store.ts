"use client";

import { useSyncExternalStore } from "react";

export type Phase = "loading" | "revealing" | "ready";

/**
 * High-frequency values shared between scroll/pointer logic and the WebGL layer.
 * Mutated directly inside rAF/GSAP — never triggers React renders.
 */
export const xp = {
  pointer: { x: 0, y: 0, tx: 0, ty: 0 },
  /** 0 → 1 lattice reveal driven by the preloader hand-off */
  reveal: 0,
  /** 0 → 1 scroll progress through the pinned hero */
  hero: 0,
  /** 0 → 1 scroll progress through Scene 02 */
  identity: 0,
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

const subscribe = subscribePhase;

export function usePhase(): Phase {
  return useSyncExternalStore(subscribe, getPhase, () => "loading");
}
