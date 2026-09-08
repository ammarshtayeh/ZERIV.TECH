"use client";

import { useMemo, useState } from "react";
import { projects, type ExperienceProject } from "../data/projects";
import { CinematicMedia } from "../ui/CinematicMedia";
import { TransitionLink } from "../ui/TransitionLink";

const FILTERS = ["All", "Web", "Mobile", "UI/UX", "Branding", "AI"] as const;
type Filter = (typeof FILTERS)[number];

function matches(p: ExperienceProject, filter: Filter) {
  if (filter === "All") return true;
  const hay = `${p.disciplines.join(" ")} ${p.industry} ${p.summary}`.toLowerCase();
  if (filter === "Web") return /web|platform|e-?commerce|marketplace|product/.test(hay);
  if (filter === "Mobile") return /mobile|ios|android|app/.test(hay);
  if (filter === "UI/UX") return /ui|ux|design|product/.test(hay);
  if (filter === "Branding") return /brand|identity|luxury/.test(hay);
  if (filter === "AI") return /ai|edtech|llm/.test(hay);
  return true;
}

export function WorkIndex() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = useMemo(() => projects.filter((p) => matches(p, filter)), [filter]);

  return (
    <div className="xp-studio">
      <header className="xp-studio__hero">
        <p className="xp-label">Portfolio</p>
        <h1 className="xp-studio__display">
          <span>SELECTED</span>
          <span>WORK</span>
        </h1>
        <p className="xp-studio__lede">
          Digital products, platforms and experiences built by ZERIV.
        </p>
      </header>

      <div className="xp-filters" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            className="xp-filters__btn"
            data-active={filter === f ? "true" : "false"}
            onClick={() => setFilter(f)}
          >
            {f}
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
                View case study <span aria-hidden="true">→</span>
              </TransitionLink>
            </div>

            <TransitionLink
              href={`/work/${p.id}`}
              className="xp-ed__media"
              data-cursor="view"
              aria-label={`${p.name} — view case study`}
            >
              <CinematicMedia source={p.media} sizes="(max-width: 900px) 92vw, 56vw" />
              <span className="xp-ed__frame" aria-hidden="true" />
            </TransitionLink>
          </article>
        ))}
      </div>

      {list.length === 0 && (
        <p className="xp-studio__empty">No projects in this category yet.</p>
      )}
    </div>
  );
}
