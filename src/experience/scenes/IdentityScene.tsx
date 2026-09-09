"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";
import { xp } from "../lib/experience-store";

const POSITION = ["WE TURN", "IDEAS INTO", "DIGITAL SYSTEMS."];
const SENTENCES = ["WE DON'T JUST BUILD WEBSITES.", "WE BUILD DIGITAL IDENTITIES."];

interface Props {
  reduced: boolean;
}

/**
 * Positioning — editorial, no pin.
 * A long pin here was colliding with Selected Work; reveal once on enter instead.
 */
export function IdentityScene({ reduced }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const pos = el.querySelectorAll<HTMLElement>(".xp-identity__pos-line");
      const words = el.querySelectorAll<HTMLElement>(".xp-identity__word");
      const copy = el.querySelector<HTMLElement>(".xp-identity__copy");

      if (reduced) {
        gsap.set(pos, { yPercent: 0, opacity: 1 });
        gsap.set(words, { "--w": 800, opacity: 1, filter: "blur(0px)" });
        gsap.set(copy, { opacity: 1, y: 0 });
        xp.identity = 1;
        return;
      }

      gsap.set(pos, { yPercent: 110, opacity: 1 });
      gsap.set(words, { "--w": 400, opacity: 0.2, filter: "blur(4px)" });
      gsap.set(copy, { opacity: 0, y: 16 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            once: true,
          },
          defaults: { ease: motion.ease.out },
        })
        .to(pos, { yPercent: 0, duration: 1, stagger: 0.1 }, 0)
        .to(words, { "--w": 800, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.04 }, 0.35)
        .to(copy, { opacity: 1, y: 0, duration: 0.7 }, 0.7);

      gsap.to(xp, {
        identity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} id="about" className="xp-scene xp-identity xp-scene--paper" aria-labelledby="xp-identity-heading">
      <div className="xp-identity__inner">
        <h2 id="xp-identity-heading" className="xp-identity__position" aria-label={POSITION.join(" ")}>
          {POSITION.map((line) => (
            <span key={line} className="xp-identity__pos-wrap" aria-hidden="true">
              <span className="xp-identity__pos-line">{line}</span>
            </span>
          ))}
        </h2>

        <p className="xp-identity__statement">
          <span className="xp-sr">{SENTENCES.join(" ")}</span>
          {SENTENCES.map((sentence, si) => (
            <span key={sentence} className="xp-identity__sentence" data-s={si} aria-hidden="true">
              {sentence.split(" ").map((word, wi) => (
                <span key={`${word}-${wi}`} className="xp-identity__word">
                  {word}
                </span>
              ))}
            </span>
          ))}
        </p>

        <p className="xp-identity__copy">
          A Palestinian studio. Strategy, design and engineering — websites, products, brands and
          interactive systems, built as one piece of work.
        </p>
      </div>
    </section>
  );
}
