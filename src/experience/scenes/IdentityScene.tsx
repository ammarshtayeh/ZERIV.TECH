"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../animations/gsap";
import { xp } from "../lib/experience-store";

const POSITION = ["WE TURN", "IDEAS INTO", "DIGITAL SYSTEMS."];
const SENTENCES = ["WE DON'T JUST BUILD WEBSITES.", "WE BUILD DIGITAL IDENTITIES."];

interface Props {
  reduced: boolean;
}

/**
 * Scene 02 — positioning, then the editorial statement.
 * Words gain weight and light as the user scrolls; behind them the lattice
 * lets go of its stitched form and becomes a field of particles.
 */
export function IdentityScene({ reduced }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const pos = el.querySelectorAll<HTMLElement>(".xp-identity__pos-line");
      const first = el.querySelectorAll<HTMLElement>('[data-s="0"] .xp-identity__word');
      const second = el.querySelectorAll<HTMLElement>('[data-s="1"] .xp-identity__word');
      const copy = el.querySelector<HTMLElement>(".xp-identity__copy");
      const index = el.querySelector<HTMLElement>(".xp-identity__index");

      if (reduced) {
        gsap.set(pos, { yPercent: 0, opacity: 1 });
        gsap.set([first, second], { "--w": 800, opacity: 1, filter: "blur(0px)" });
        gsap.set(copy, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          onUpdate: (st) => {
            xp.identity = st.progress;
          },
        },
      });

      tl.fromTo(pos, { yPercent: 110, opacity: 1 }, { yPercent: 0, duration: 0.8, stagger: 0.12 }, 0)
        .to(pos, { opacity: 0.18, duration: 0.45 }, 1.15)
        .to(first, { "--w": 800, opacity: 1, filter: "blur(0px)", duration: 0.85, stagger: 0.18 }, 1.2)
        .to(first, { opacity: 0.22, duration: 0.45 }, 2.35)
        .to(second, { "--w": 800, opacity: 1, filter: "blur(0px)", duration: 0.85, stagger: 0.2 }, 2.4)
        .fromTo(copy, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 2.9);

      if (index) tl.to(index, { opacity: 1, duration: 0.4 }, 0.25);
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} id="about" className="xp-scene xp-identity" aria-labelledby="xp-identity-heading">
      <div className="xp-identity__inner">
        <p className="xp-label xp-identity__label">SCN_02 — POSITION</p>

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

        <p className="xp-label xp-identity__index" aria-hidden="true">
          02 / 07
        </p>
      </div>
    </section>
  );
}
