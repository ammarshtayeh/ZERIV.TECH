"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { contact } from "../data/contact";
import { StudioContactForm } from "../ui/StudioContactForm";

export function ContactStudio() {
  const { t } = useLocale();

  return (
    <div className="xp-studio">
      <header className="xp-studio__hero">
        <p className="xp-label">{t("contact.label")}</p>
        <h1 className="xp-studio__display">
          <span>{t("contact.title")}</span>
        </h1>
        <p className="xp-studio__lede">{t("contact.lede")}</p>
      </header>

      <div className="xp-contact">
        <aside className="xp-contact__aside">
          <div>
            <p className="xp-label">{t("contact.email")}</p>
            <a href={`mailto:${contact.email}`} data-cursor="expand">
              {contact.email}
            </a>
          </div>
          <div>
            <p className="xp-label">{t("contact.phone")}</p>
            <a href={contact.phoneHref} data-cursor="expand">
              {contact.phone}
            </a>
          </div>
          <div>
            <p className="xp-label">{t("contact.location")}</p>
            <p>{contact.location}</p>
          </div>
          <div>
            <p className="xp-label">{t("contact.social")}</p>
            <ul className="xp-contact__socials">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" data-cursor="open">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="xp-contact__form">
          <StudioContactForm />
        </div>
      </div>
    </div>
  );
}
