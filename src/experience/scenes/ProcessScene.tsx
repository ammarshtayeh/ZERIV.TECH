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
 * Method — clean vertical/editorial steps. No pin. Progress line uses width, not scaleX.
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
        gsap.set(fill, { width: "100%" });
        steps.forEach((s) => {
          s.dataset.on = "true";
          s.dataset.done = "true";
        });
        return;
      }

      gsap.fromTo(
        fill,
        { width: "0%" },
        {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );

      steps.forEach((step, i) => {
        gsap.from(step, {
          opacity: 0.4,
          y: 14,
          duration: 0.65,
          ease: motion.ease.out,
          scrollTrigger: {
            trigger: step,
            start: "top 88%",
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
    <section ref={root} id="method" className="xp-scene xp-proc xp-scene--paper" aria-labelledby="xp-proc-heading">
      <header className="xp-proc__head">
        <p className="xp-label">Method</p>
        <h2 id="xp-proc-heading" className="xp-proc__title">
          HOW WE <em>WORK</em>
        </h2>
      </header>

      <div className="xp-proc__track" aria-hidden="true">
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
