"use client";

import { useEffect, useMemo, useRef } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";
import { contact } from "../data/contact";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { BrandLogo } from "../ui/BrandLogo";
import { TransitionLink } from "../ui/TransitionLink";

interface Props {
  reduced: boolean;
}

/**
 * Contact close — clear statement, one CTA, real contact details.
 * Content stays visible by default so a missed ScrollTrigger never leaves a blank void.
 */
export function FinalScene({ reduced }: Props) {
  const root = useRef<HTMLElement>(null);
  const { t, locale } = useLocale();
  const statement = useMemo(() => [t("final.l1"), t("final.l2"), t("final.l3")], [t, locale]);

  useSceneProgress(root, "final", { start: "top 85%", end: "bottom bottom" });

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll<HTMLElement>(".xp-final__line");
      const rest = el.querySelectorAll<HTMLElement>(".xp-final__rest > *");
      const logo = el.querySelector<HTMLElement>(".xp-final__logo");

      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
          defaults: { ease: motion.ease.out },
        })
        .from(lines, { yPercent: 110, duration: 1.05, stagger: 0.1 }, 0)
        .from(rest, { opacity: 0, y: 16, duration: 0.75, stagger: 0.08 }, 0.35)
        .from(logo, { opacity: 0, duration: 0.9 }, 0.45);
    }, el);

    return () => ctx.revert();
  }, [reduced, locale]);

  return (
    <section ref={root} id="contact" className="xp-scene xp-final" aria-labelledby="xp-final-heading">
      <p className="xp-label xp-final__label">{t("final.label")}</p>

      <h2 id="xp-final-heading" className="xp-final__statement" aria-label={statement.join(" ")}>
        {statement.map((l) => (
          <span key={l} className="xp-final__line-wrap" aria-hidden="true">
            <span className="xp-final__line">{l}</span>
          </span>
        ))}
      </h2>

      <div className="xp-final__rest">
        <TransitionLink href="/contact" className="xp-final__cta" data-cursor="expand">
          {t("final.cta")} <span aria-hidden="true">→</span>
        </TransitionLink>

        <p className="xp-final__direct">
          <span className="xp-label">{t("final.or")}</span>
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
