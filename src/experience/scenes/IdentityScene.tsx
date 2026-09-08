"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../animations/gsap";
import { xp } from "../lib/experience-store";

const SENTENCES = [
  "WE DON'T JUST BUILD WEBSITES.",
  "WE BUILD DIGITAL IDENTITIES.",
];

interface Props {
  reduced: boolean;
}

/**
 * Scene 02 — the statement.
 * Words gain weight, focus and light as the user scrolls; behind them the lattice
 * lets go of its stitched form and becomes a field of particles.
 */
export function IdentityScene({ reduced }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const first = el.querySelectorAll<HTMLElement>('[data-s="0"] .xp-identity__word');
      const second = el.querySelectorAll<HTMLElement>('[data-s="1"] .xp-identity__word');
      const index = el.querySelector<HTMLElement>(".xp-identity__index");

      if (reduced) {
        gsap.set([first, second], { "--w": 800, opacity: 1, filter: "blur(0px)" });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=230%",
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          onUpdate: (st) => {
            xp.identity = st.progress;
          },
        },
      });

      tl.to(
        first,
        { "--w": 800, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.22 },
        0
      )
        .to(first, { opacity: 0.2, duration: 0.6 }, 2.35)
        .to(
          second,
          { "--w": 800, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.24 },
          2.45
        );

      if (index) {
        tl.to(index, { opacity: 1, duration: 0.5 }, 0.3);
      }
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="xp-scene xp-identity" aria-labelledby="xp-identity-heading">
      <div className="xp-identity__inner">
        <p className="xp-label xp-identity__label">SCN_02 — WHO WE ARE</p>

        <h2 id="xp-identity-heading" className="xp-identity__statement">
          {SENTENCES.map((sentence, si) => (
            <span
              key={sentence}
              className="xp-identity__sentence"
              data-s={si}
              aria-label={sentence}
            >
              {sentence.split(" ").map((word, wi) => (
                <span key={`${word}-${wi}`} className="xp-identity__word" aria-hidden="true">
                  {word}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <p className="xp-label xp-identity__index" aria-hidden="true">
          02 / 07
        </p>
      </div>
    </section>
  );
}
