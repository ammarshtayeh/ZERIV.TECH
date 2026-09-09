"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { getCapabilities, getProjectLocalized } from "../data/localized";
import { ServiceVisual } from "../ui/ServiceVisual";
import { TransitionLink } from "../ui/TransitionLink";

export function ServicesStudio() {
  const { t, locale } = useLocale();
  const caps = getCapabilities(locale);

  return (
    <div className="xp-studio">
      <header className="xp-studio__hero">
        <p className="xp-label">{t("services.label")}</p>
        <h1 className="xp-studio__display">
          <span>{t("services.title")}</span>
        </h1>
        <p className="xp-studio__lede">{t("services.lede")}</p>
      </header>

      <div className="xp-svc">
        {caps.map((c) => {
          const related = c.related.map((id) => getProjectLocalized(locale, id)).filter(Boolean);
          return (
            <article key={c.id} className="xp-svc__block" id={c.id}>
              <div className="xp-svc__intro">
                <p className="xp-label">{c.index}</p>
                <h2 className="xp-svc__title">{c.title}</h2>
                <p className="xp-svc__line">{c.line}</p>
              </div>

              <div className="xp-svc__grid">
                <div className="xp-svc__visual">
                  <ServiceVisual kind={c.id} />
                </div>
                <div className="xp-svc__detail">
                  <div>
                    <p className="xp-label">{t("services.audience")}</p>
                    <p className="xp-svc__copy">{c.audience}</p>
                  </div>
                  <div>
                    <p className="xp-label">{t("services.includes")}</p>
                    <ul className="xp-svc__list">
                      {c.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="xp-label">{t("services.tech")}</p>
                    <p className="xp-label xp-svc__tags">{c.tech.join(" · ")}</p>
                  </div>
                </div>
              </div>

              {related.length > 0 && (
                <div className="xp-svc__related">
                  <p className="xp-label">{t("services.related")}</p>
                  <ul>
                    {related.map(
                      (p) =>
                        p && (
                          <li key={p.id}>
                            <TransitionLink href={`/work/${p.id}`} data-cursor="view">
                              {p.name} <span aria-hidden="true">→</span>
                            </TransitionLink>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="xp-studio__cta">
        <p className="xp-studio__cta-copy">{t("studio.ctaCopy")}</p>
        <TransitionLink href="/contact" className="xp-studio__cta-link" data-cursor="expand">
          {t("studio.ctaLink")}
        </TransitionLink>
      </div>
    </div>
  );
}
