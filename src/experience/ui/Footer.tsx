"use client";

import type { MouseEvent } from "react";
import { contact } from "../data/contact";
import { scrollToTarget } from "../lib/experience-store";
import { BrandLogo } from "./BrandLogo";
import { TransitionLink } from "./TransitionLink";

const ANCHORS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#method", label: "Method" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <footer className="xp-footer" aria-label="Footer">
      <div className="xp-footer__top">
        <a href="#top" className="xp-footer__mark" onClick={(e) => go(e, "#top")} data-cursor="expand" aria-label="ZERIV — back to top">
          <BrandLogo decorative sizes="140px" />
        </a>
        <p className="xp-footer__tag">
          A Palestinian-born creative technology studio.
          <br />
          <span>TECHNOLOGY</span> × <span>DESIGN</span> × <span>CULTURE</span>
        </p>
      </div>

      <div className="xp-footer__grid">
        <div className="xp-footer__col">
          <p className="xp-label xp-footer__h">Contact</p>
          <a href={`mailto:${contact.email}`} data-cursor="expand">
            {contact.email}
          </a>
          <a href={contact.phoneHref} data-cursor="expand">
            {contact.phone}
          </a>
          <TransitionLink href="/contact" data-cursor="expand">
            Project brief →
          </TransitionLink>
        </div>

        <div className="xp-footer__col">
          <p className="xp-label xp-footer__h">Follow</p>
          {contact.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" data-cursor="open">
              {s.label} ↗
            </a>
          ))}
        </div>

        <div className="xp-footer__col">
          <p className="xp-label xp-footer__h">Location</p>
          <span>{contact.location}</span>
          <span className="xp-footer__mono">{contact.coordinates}</span>
          <span className="xp-footer__mono">Working worldwide</span>
        </div>

        <div className="xp-footer__col">
          <p className="xp-label xp-footer__h">Index</p>
          {ANCHORS.map((a) => (
            <a key={a.href} href={a.href} onClick={(e) => go(e, a.href)} data-cursor="expand">
              {a.label}
            </a>
          ))}
        </div>
      </div>

      <div className="xp-footer__bottom">
        <span className="xp-label">© {year} {contact.company}. All rights reserved.</span>
        <span className="xp-label xp-footer__made">
          Made in <em>Palestine</em>
        </span>
        <a href="#top" className="xp-label xp-footer__up" onClick={(e) => go(e, "#top")} data-cursor="expand">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
