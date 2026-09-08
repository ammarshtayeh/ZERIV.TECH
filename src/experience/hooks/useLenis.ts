"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../animations/gsap";
import { xp } from "../lib/experience-store";

/**
 * Smooth scrolling synced to GSAP's ticker so ScrollTrigger and Lenis share one clock.
 * Scroll is locked until `enabled` flips true (after the preloader hand-off).
 */
export function useLenis(enabled: boolean, disabled = false) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (disabled) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    xp.lenis = lenis;
    lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      xp.lenis = null;
    };
  }, [disabled]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (enabled) {
      lenis.start();
      ScrollTrigger.refresh();
    } else {
      lenis.stop();
    }
  }, [enabled]);

  return lenisRef;
}
