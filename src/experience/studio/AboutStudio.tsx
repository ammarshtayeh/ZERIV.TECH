"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { TransitionLink } from "../ui/TransitionLink";

export function AboutStudio() {
  const { t } = useLocale();

  return (
    <div className="xp-studio">
      <header className="xp-studio__hero">
        <p className="xp-label">{t("about.label")}</p>
        <h1 className="xp-studio__display">
          <span>{t("about.title1")}</span>
          <span>{t("about.title2")}</span>
        </h1>
        <p className="xp-studio__lede">{t("about.lede")}</p>
      </header>

      <section className="xp-about__statement">
        <p>{t("about.statement")}</p>
      </section>

      <section className="xp-about__grid">
        <div>
          <p className="xp-label">{t("about.s1l")}</p>
          <h2 className="xp-about__h">{t("about.s1h")}</h2>
          <p className="xp-about__copy">{t("about.s1")}</p>
        </div>
        <div>
          <p className="xp-label">{t("about.s2l")}</p>
          <h2 className="xp-about__h">{t("about.s2h")}</h2>
          <p className="xp-about__copy">{t("about.s2")}</p>
        </div>
        <div>
          <p className="xp-label">{t("about.s3l")}</p>
          <h2 className="xp-about__h">{t("about.s3h")}</h2>
          <p className="xp-about__copy">{t("about.s3")}</p>
        </div>
      </section>

      <section className="xp-about__band">
        <p className="xp-label">{t("about.bandLabel")}</p>
        <p className="xp-about__band-line">{t("about.band")}</p>
        <p className="xp-about__copy">{t("about.bandCopy")}</p>
      </section>

      <div className="xp-studio__cta">
        <TransitionLink href="/work" className="xp-studio__cta-link" data-cursor="expand">
          {t("about.ctaWork")}
        </TransitionLink>
        <TransitionLink href="/contact" className="xp-studio__cta-link" data-cursor="expand">
          {t("about.ctaContact")}
        </TransitionLink>
      </div>
    </div>
  );
}
