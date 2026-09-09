"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";
import { getFeaturedProjects } from "../data/localized";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { CinematicMedia } from "../ui/CinematicMedia";
import { TransitionLink } from "../ui/TransitionLink";

interface Props {
  reduced: boolean;
}

/**
 * Homepage selected work — large editorial rows.
 * Proof early. Links into the full Work page and case studies.
 */
export function WorkScene({ reduced }: Props) {
  const root = useRef<HTMLElement>(null);
  const { t, locale } = useLocale();
  const featured = getFeaturedProjects(locale);
  useSceneProgress(root, "work");

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>(".xp-ed__row").forEach((row) => {
        const media = row.querySelector<HTMLElement>(".xp-ed__media");
        const meta = row.querySelectorAll<HTMLElement>(".xp-ed__meta > *");
        gsap
          .timeline({
            scrollTrigger: { trigger: row, start: "top 80%", once: true },
            defaults: { ease: motion.ease.out },
          })
          .fromTo(media, { clipPath: "inset(100% 0 0% 0)" }, { clipPath: "inset(0% 0 0% 0)", duration: 1.15 }, 0)
          .fromTo(meta, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.05 }, 0.25);
      });
    }, el);
    return () => ctx.revert();
  }, [reduced, locale]);

  const titleParts = t("work.title").split(/\s+/);

  return (
    <section ref={root} id="work" className="xp-scene xp-ed xp-scene--paper" aria-labelledby="xp-work-heading">
      <header className="xp-ed__head">
        <p className="xp-label">{t("work.label")}</p>
        <h2 id="xp-work-heading" className="xp-ed__title">
          {titleParts.map((part) => (
            <span key={part}>{part}</span>
          ))}
        </h2>
        <p className="xp-ed__lede">{t("work.lede")}</p>
      </header>

      <div className="xp-ed__list">
        {featured.map((p, i) => (
          <article key={p.id} className="xp-ed__row" data-accent={p.accent} data-flip={i % 2 === 1}>
            <div className="xp-ed__meta">
              <p className="xp-label xp-ed__index">{p.index}</p>
              <h3 className="xp-ed__name">{p.name}</h3>
              <p className="xp-ed__summary">{p.summary}</p>
              <p className="xp-label xp-ed__facts">
                <span>{p.disciplines.join(" / ")}</span>
                <span>{p.year}</span>
              </p>
              <TransitionLink href={`/work/${p.id}`} className="xp-ed__cta" data-cursor="view">
                {t("work.view")} <span aria-hidden="true">→</span>
              </TransitionLink>
            </div>

            <TransitionLink
              href={`/work/${p.id}`}
              className="xp-ed__media"
              data-cursor="view"
              aria-label={`${p.name} — ${t("work.view")}`}
            >
              <CinematicMedia source={p.media} sizes="(max-width: 900px) 92vw, 54vw" />
              <span className="xp-ed__frame" aria-hidden="true" />
            </TransitionLink>
          </article>
        ))}
      </div>

      <div className="xp-ed__foot">
        <TransitionLink href="/work" className="xp-ed__all" data-cursor="expand">
          {t("work.all")} <span aria-hidden="true">→</span>
        </TransitionLink>
      </div>
    </section>
  );
}
