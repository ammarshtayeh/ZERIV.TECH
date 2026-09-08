"use client";

import { useEffect, type RefObject } from "react";

/**
 * Calls `onChange(visible)` when the element enters/leaves the viewport.
 * Used to pause canvases and rAF loops that are off screen.
 */
export function useInView(
  ref: RefObject<Element | null>,
  onChange: (visible: boolean) => void,
  margin = "20% 0px"
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => onChange(e.isIntersecting), {
      rootMargin: margin,
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, margin]);
}
