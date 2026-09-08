"use client";

import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "../animations/gsap";
import { xp } from "../lib/experience-store";

type ProgressKey = "capabilities" | "work" | "signature" | "final";

/**
 * Writes a scene's 0 → 1 viewport progress into the shared store so the WebGL layer
 * can choreograph itself without React re-renders.
 */
export function useSceneProgress(
  ref: RefObject<HTMLElement | null>,
  key: ProgressKey,
  opts: { start?: string; end?: string } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: opts.start ?? "top bottom",
      end: opts.end ?? "bottom top",
      onUpdate: (self) => {
        xp[key] = self.progress;
      },
      onLeaveBack: () => {
        xp[key] = 0;
      },
    });
    return () => {
      st.kill();
      xp[key] = 0;
    };
  }, [ref, key, opts.start, opts.end]);
}
