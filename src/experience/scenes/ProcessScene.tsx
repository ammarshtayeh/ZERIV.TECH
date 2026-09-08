"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";
import { methodSteps } from "../data/process";

interface Props {
  reduced: boolean;
  narrow: boolean;
}

/**
 * How ZERIV works — a single horizontal timeline, not five cards.
 * Scroll fills the spine; each step takes the floor in sequence.
 */
export function ProcessScene({ reduced, narrow }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const steps = el.querySelectorAll<HTMLElement>(".xp-proc__step");
      const fill = el.querySelector<HTMLElement>(".xp-proc__fill");

      const setActive = (p: number) => {
        const i = Math.min(steps.length - 1, Math.floor(p * steps.length + 0.12));
        steps.forEach((s, k) => {
          s.dataset.on = k === i ? "true" : "false";
          s.dataset.done = k < i ? "true" : "false";
        });
      };

      if (reduced || narrow) {
        gsap.set(steps, { opacity: 1 });
        gsap.set(fill, { scaleX: 1 });
        if (reduced) setActive(1);
        return;
      }

      gsap.fromTo(
        fill,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "0% 50%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: motion.scrub,
            anticipatePin: 1,
            onUpdate: (st) => setActive(st.progress),
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced, narrow]);

  return (
    <section ref={root} id="method" className="xp-scene xp-proc" aria-labelledby="xp-proc-heading">
      <header className="xp-proc__head">
        <p className="xp-label">SCN_06 — METHOD</p>
        <h2 id="xp-proc-heading" className="xp-proc__title">
          HOW WE <em>WORK</em>
        </h2>
      </header>

      <div className="xp-proc__track" aria-hidden="true">
        <span className="xp-proc__spine" />
        <span className="xp-proc__fill" />
      </div>

      <ol className="xp-proc__list">
        {methodSteps.map((s) => (
          <li key={s.index} className="xp-proc__step" data-on="false" data-done="false">
            <p className="xp-label xp-proc__index">{s.index}</p>
            <h3 className="xp-proc__name">{s.title}</h3>
            <p className="xp-proc__line">{s.line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
