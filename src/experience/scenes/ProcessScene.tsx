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
 * Method — vertical timeline without pin.
 * Pinning here stacked into Signature / Final and broke scroll rhythm.
 */
export function ProcessScene({ reduced }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const steps = el.querySelectorAll<HTMLElement>(".xp-proc__step");
      const fill = el.querySelector<HTMLElement>(".xp-proc__fill");

      if (reduced) {
        gsap.set(steps, { opacity: 1, y: 0 });
        gsap.set(fill, { scaleX: 1 });
        steps.forEach((s) => {
          s.dataset.on = "true";
          s.dataset.done = "true";
        });
        return;
      }

      gsap.set(steps, { opacity: 0.35, y: 18 });
      gsap.set(fill, { scaleX: 0, transformOrigin: "0% 50%" });

      gsap.to(fill, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 65%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });

      steps.forEach((step, i) => {
        gsap.to(step, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: motion.ease.out,
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            once: true,
            onEnter: () => {
              steps.forEach((s, k) => {
                s.dataset.on = k === i ? "true" : "false";
                s.dataset.done = k < i ? "true" : "false";
              });
            },
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} id="method" className="xp-scene xp-proc" aria-labelledby="xp-proc-heading">
      <header className="xp-proc__head">
        <p className="xp-label">Method</p>
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
