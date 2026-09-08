/**
 * ZERIV motion language — one vocabulary for every scene.
 * Use these instead of ad-hoc numbers so motion feels like a single system.
 */
export const motion = {
  duration: {
    /** hover feedback, cursor, tiny state changes */
    fast: 0.35,
    /** UI reveals, menu items, labels */
    ui: 0.7,
    /** scene-level reveals */
    cinematic: 1.25,
  },
  ease: {
    /** reveals that settle */
    out: "expo.out",
    /** state → state transitions */
    inOut: "power3.inOut",
    /** things leaving */
    in: "power2.in",
    /** CSS equivalents */
    css: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  stagger: {
    chars: 0.045,
    words: 0.09,
    items: 0.07,
  },
  /** ScrollTrigger scrub lag in seconds */
  scrub: 0.85,
} as const;
