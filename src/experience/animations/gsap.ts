"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "expo.out", duration: 1 });
  // dev aid: ?xpslow=4 slows every timeline 4× so cinematic sequences can be inspected frame by frame
  if (process.env.NODE_ENV !== "production") {
    const slow = Number(new URLSearchParams(window.location.search).get("xpslow"));
    if (slow > 1) gsap.globalTimeline.timeScale(1 / slow);
  }
}

export { gsap, ScrollTrigger };
