"use client";

import type { MouseEvent } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { contact } from "../data/contact";
import { scrollToTarget } from "../lib/experience-store";
import { BrandLogo } from "./BrandLogo";
import { TransitionLink } from "./TransitionLink";

type Mode = "home" | "site";

interface Props {
  mode?: Mode;
}

export function Footer({ mode = "home" }: Props) {
  const year = new Date().getFullYear();
  const { t } = useLocale();

  const index =
    mode === "site"
      ? [
          { href: "/work", label: t("nav.work") },
          { href: "/services", label: t("nav.services") },
          { href: "/about", label: t("nav.about") },
          { href: "/contact", label: t("nav.contact") },
        ]
      : [
          { href: "#work", label: t("nav.work") },
          { href: "#services", label: t("nav.services") },
          { href: "#about", label: t("nav.about") },
          { href: "#contact", label: t("nav.contact") },
        ];

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <footer className="xp-footer" aria-label="Footer">
      <div className="xp-footer__top">
        {mode === "home" ? (
          <a
            href="#top"
            className="xp-footer__mark"
            onClick={(e) => go(e, "#top")}
            data-cursor="expand"
            aria-label={t("nav.top")}
          >
            <BrandLogo decorative sizes="140px" />
          </a>
        ) : (
          <TransitionLink href="/" className="xp-footer__mark" data-cursor="expand" aria-label={t("nav.home")}>
            <BrandLogo decorative sizes="140px" />
          </TransitionLink>
        )}
        <p className="xp-footer__tag">
          {t("footer.tag")}
          <br />
          <span>TECHNOLOGY</span> × <span>DESIGN</span> × <span>CULTURE</span>
        </p>
      </div>

      <div className="xp-footer__grid">
        <div className="xp-footer__col">
          <p className="xp-label xp-footer__h">{t("footer.contact")}</p>
          <a href={`mailto:${contact.email}`} data-cursor="expand">
            {contact.email}
          </a>
          <a href={contact.phoneHref} data-cursor="expand">
            {contact.phone}
          </a>
          <TransitionLink href="/contact" data-cursor="expand">
            {t("footer.brief")}
          </TransitionLink>
        </div>

        <div className="xp-footer__col">
          <p className="xp-label xp-footer__h">{t("footer.follow")}</p>
          {contact.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" data-cursor="open">
              {s.label} ↗
            </a>
          ))}
        </div>

        <div className="xp-footer__col">
          <p className="xp-label xp-footer__h">{t("footer.location")}</p>
          <span>{contact.location}</span>
          <span className="xp-footer__mono">{t("footer.worldwide")}</span>
        </div>

        <div className="xp-footer__col">
          <p className="xp-label xp-footer__h">{t("footer.index")}</p>
          {index.map((a) =>
            a.href.startsWith("#") ? (
              <a key={a.href} href={a.href} onClick={(e) => go(e, a.href)} data-cursor="expand">
                {a.label}
              </a>
            ) : (
              <TransitionLink key={a.href} href={a.href} data-cursor="expand">
                {a.label}
              </TransitionLink>
            )
          )}
        </div>
      </div>

      <div className="xp-footer__bottom">
        <span className="xp-label">
          © {year} {contact.company}. {t("footer.rights")}
        </span>
        <span className="xp-label xp-footer__made">
          {t("footer.made")} <em>{t("footer.palestine")}</em>
        </span>
        {mode === "home" ? (
          <a href="#top" className="xp-label xp-footer__up" onClick={(e) => go(e, "#top")} data-cursor="expand">
            {t("footer.top")}
          </a>
        ) : (
          <TransitionLink href="/" className="xp-label xp-footer__up" data-cursor="expand">
            {t("footer.home")}
          </TransitionLink>
        )}
      </div>
    </footer>
  );
}
