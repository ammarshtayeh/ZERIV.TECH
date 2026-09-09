"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { getProjects } from "../data/localized";
import type { ExperienceProject } from "../data/projects";
import { CinematicMedia } from "../ui/CinematicMedia";
import { TransitionLink } from "../ui/TransitionLink";

const FILTER_KEYS = ["all", "web", "mobile", "uiux", "branding", "ai"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

function matches(p: ExperienceProject, filter: FilterKey) {
  if (filter === "all") return true;
  const hay = `${p.disciplines.join(" ")} ${p.industry} ${p.summary}`.toLowerCase();
  if (filter === "web") return /web|platform|e-?commerce|marketplace|product|ويب|منصة|تجارة/.test(hay);
  if (filter === "mobile") return /mobile|ios|android|app|موبايل/.test(hay);
  if (filter === "uiux") return /ui|ux|design|product|واجهات|تصميم/.test(hay);
  if (filter === "branding") return /brand|identity|luxury|هوية|علامة/.test(hay);
  if (filter === "ai") return /ai|edtech|llm|ذكاء|تعليم/.test(hay);
  return true;
}

export function WorkIndex() {
  const { t, locale } = useLocale();
  const [filter, setFilter] = useState<FilterKey>("all");
  const projects = getProjects(locale);
  const list = useMemo(() => projects.filter((p) => matches(p, filter)), [projects, filter]);
  const titleParts = t("work.pageTitle").split(/\s+/);

  return (
    <div className="xp-studio">
      <header className="xp-studio__hero">
        <p className="xp-label">{t("work.label")}</p>
        <h1 className="xp-studio__display">
          {titleParts.map((part) => (
            <span key={part}>{part}</span>
          ))}
        </h1>
        <p className="xp-studio__lede">{t("work.pageLede")}</p>
      </header>

      <div className="xp-filters" role="tablist" aria-label={t("work.label")}>
        {FILTER_KEYS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            className="xp-filters__btn"
            data-active={filter === f ? "true" : "false"}
            onClick={() => setFilter(f)}
          >
            {t(`work.filter.${f}`)}
          </button>
        ))}
      </div>

      <div className="xp-ed__list xp-ed__list--page">
        {list.map((p, i) => (
          <article key={p.id} className="xp-ed__row" data-accent={p.accent} data-flip={i % 2 === 1}>
            <div className="xp-ed__meta">
              <p className="xp-label xp-ed__index">{p.index}</p>
              <h2 className="xp-ed__name">{p.name}</h2>
              <p className="xp-ed__summary">{p.summary}</p>
              <p className="xp-label xp-ed__facts">
                <span>{p.disciplines.join(" · ")}</span>
                <span>{p.year}</span>
              </p>
              <TransitionLink href={`/work/${p.id}`} className="xp-ed__cta" data-cursor="view">
                {t("work.case")} <span aria-hidden="true">→</span>
              </TransitionLink>
            </div>

            <TransitionLink
              href={`/work/${p.id}`}
              className="xp-ed__media"
              data-cursor="view"
              aria-label={`${p.name} — ${t("work.case")}`}
            >
              <CinematicMedia source={p.media} sizes="(max-width: 900px) 92vw, 56vw" />
              <span className="xp-ed__frame" aria-hidden="true" />
            </TransitionLink>
          </article>
        ))}
      </div>

      {list.length === 0 && <p className="xp-studio__empty">{t("work.empty")}</p>}
    </div>
  );
}
