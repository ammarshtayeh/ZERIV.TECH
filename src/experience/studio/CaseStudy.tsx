"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { getAdjacentLocalized, getProjectLocalized } from "../data/localized";
import { CinematicMedia } from "../ui/CinematicMedia";
import { TransitionLink } from "../ui/TransitionLink";

interface Props {
  slug: string;
}

export function CaseStudy({ slug }: Props) {
  const { t, locale } = useLocale();
  const project = getProjectLocalized(locale, slug);
  if (!project) return null;

  const { next } = getAdjacentLocalized(locale, slug);

  return (
    <article className="xp-case" data-accent={project.accent}>
      <header className="xp-case__hero">
        <p className="xp-label">
          <TransitionLink href="/work">{t("case.back")}</TransitionLink>
          <span aria-hidden="true"> / </span>
          {project.index}
        </p>
        <h1 className="xp-case__name">{project.name}</h1>
        <p className="xp-case__statement">{project.summary}</p>
        <dl className="xp-case__meta">
          <div>
            <dt className="xp-label">{t("case.year")}</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt className="xp-label">{t("nav.services")}</dt>
            <dd>{project.disciplines.join(" · ")}</dd>
          </div>
          <div>
            <dt className="xp-label">{t("case.type")}</dt>
            <dd>{project.industry}</dd>
          </div>
        </dl>
      </header>

      <figure className="xp-case__media xp-case__media--hero">
        <CinematicMedia source={project.media} sizes="100vw" priority />
      </figure>

      <section className="xp-case__block">
        <p className="xp-label">{t("case.overview")}</p>
        <h2 className="xp-case__h">{t("case.overview")}</h2>
        <p className="xp-case__copy">{project.overview}</p>
      </section>

      <section className="xp-case__split">
        <div>
          <p className="xp-label">{t("case.challenge")}</p>
          <h2 className="xp-case__h">{t("case.challenge")}</h2>
          <p className="xp-case__copy">{project.challenge}</p>
        </div>
        <div>
          <p className="xp-label">{t("case.approach")}</p>
          <h2 className="xp-case__h">{t("case.approach")}</h2>
          <p className="xp-case__copy">{project.approach}</p>
        </div>
      </section>

      <section className="xp-case__block xp-case__block--bright">
        <p className="xp-label">{t("case.overview")}</p>
        <figure className="xp-case__media">
          <CinematicMedia source={project.media} sizes="(max-width: 900px) 92vw, 80vw" />
        </figure>
      </section>

      <section className="xp-case__block">
        <p className="xp-label">{t("case.stack")}</p>
        <h2 className="xp-case__h">{t("case.stack")}</h2>
        <ul className="xp-case__stack">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {project.url && (
          <a
            className="xp-case__live"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
          >
            {t("case.live")}
          </a>
        )}
      </section>

      {next && (
        <nav className="xp-case__next" aria-label={t("case.next")}>
          <p className="xp-label">{t("case.next")}</p>
          <TransitionLink href={`/work/${next.id}`} className="xp-case__next-link" data-cursor="view">
            <span className="xp-case__next-index">{next.index}</span>
            <span className="xp-case__next-name">{next.name}</span>
            <span aria-hidden="true">→</span>
          </TransitionLink>
        </nav>
      )}
    </article>
  );
}
