"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";
import { contact } from "../data/contact";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { BrandLogo } from "../ui/BrandLogo";
import { MagneticLink } from "../ui/MagneticLink";

const STATEMENT = ["LET'S BUILD", "SOMETHING", "WORTH REMEMBERING."];

interface Props {
  reduced: boolean;
}

/**
 * Scene 07 — the finale. Enormous statement, one CTA, and the lattice fragments from Scene 01
 * return behind the mark and re-stitch themselves. The journey closes where it began.
 */
export function FinalScene({ reduced }: Props) {
  const root = useRef<HTMLElement>(null);

  useSceneProgress(root, "final", { start: "top 85%", end: "bottom bottom" });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll<HTMLElement>(".xp-final__line");
      const rest = el.querySelectorAll<HTMLElement>(".xp-final__rest > *");
      const logo = el.querySelector<HTMLElement>(".xp-final__logo");

      if (reduced) {
        gsap.set(lines, { yPercent: 0 });
        gsap.set(rest, { opacity: 1, y: 0 });
        gsap.set(logo, { clipPath: "inset(0% 0 0% 0)", opacity: 1 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: "top 65%", once: true },
          defaults: { ease: motion.ease.out },
        })
        .fromTo(lines, { yPercent: 108 }, { yPercent: 0, duration: motion.duration.cinematic, stagger: 0.12 }, 0)
        .fromTo(rest, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.6);

      gsap.fromTo(
        logo,
        { clipPath: "inset(50% 0 50% 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0% 0)",
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 40%", end: "bottom bottom", scrub: motion.scrub },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} id="contact" className="xp-scene xp-final" aria-labelledby="xp-final-heading">
      <p className="xp-label xp-final__label">Start a project</p>

      <h2 id="xp-final-heading" className="xp-final__statement" aria-label={STATEMENT.join(" ")}>
        {STATEMENT.map((l) => (
          <span key={l} className="xp-final__line-wrap" aria-hidden="true">
            <span className="xp-final__line">{l}</span>
          </span>
        ))}
      </h2>

      <div className="xp-final__rest">
        <MagneticLink href="/contact" className="xp-final__cta" strength={0.22}>
          <span className="xp-final__cta-text">START A PROJECT</span>
          <span className="xp-final__cta-arrow" aria-hidden="true">
            →
          </span>
        </MagneticLink>

        <p className="xp-final__direct">
          <span className="xp-label">or write directly</span>
          <a href={`mailto:${contact.email}`} data-cursor="expand">
            {contact.email}
          </a>
          <a href={contact.phoneHref} data-cursor="expand">
            {contact.phone}
          </a>
        </p>
      </div>

      <div className="xp-final__logo" aria-hidden="true">
        <BrandLogo decorative sizes="(max-width: 900px) 46vw, 20vw" />
      </div>
    </section>
  );
}
