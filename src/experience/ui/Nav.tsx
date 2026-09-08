"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";
import { getPhase, scrollToTarget, usePhase, xp } from "../lib/experience-store";
import { contact } from "../data/contact";
import { BrandLogo } from "./BrandLogo";
import { TransitionLink } from "./TransitionLink";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const MENU = [
  { href: "#work", label: "Work", index: "01" },
  { href: "#services", label: "Services", index: "02" },
  { href: "#about", label: "About", index: "03" },
  { href: "#method", label: "Method", index: "04" },
  { href: "#contact", label: "Contact", index: "05" },
];

export function Nav() {
  const phase = usePhase();
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = overlay.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>(".xp-menu__item");
      const foot = el.querySelectorAll<HTMLElement>(".xp-menu__foot > *");
      const aside = el.querySelectorAll<HTMLElement>(".xp-menu__aside > *");

      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: motion.ease.inOut } })
        .set(el, { pointerEvents: "auto" })
        .fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.9 }
        )
        .fromTo(
          items,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: motion.stagger.items, ease: motion.ease.out },
          0.35
        )
        .fromTo(
          aside,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" },
          0.6
        )
        .fromTo(
          foot,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" },
          0.7
        );
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) t.timeScale(1).play();
    else t.timeScale(1.6).reverse();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("xp-menu-open");
    xp.lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("xp-menu-open");
      if (getPhase() === "ready") xp.lenis?.start();
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const anchor = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      setOpen(false);
      // let the overlay start closing before the page moves
      window.setTimeout(() => scrollToTarget(href), open ? 260 : 0);
    },
    [open]
  );

  return (
    <>
      <header className="xp-nav" data-visible={phase !== "loading"} data-open={open}>
        <a
          href="#top"
          className="xp-nav__logo"
          data-cursor="expand"
          aria-label="ZERIV — back to top"
          onClick={(e) => anchor(e, "#top")}
        >
          <BrandLogo sizes="120px" decorative />
        </a>

        <nav className="xp-nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="xp-nav__link"
              data-cursor="expand"
              onClick={(e) => anchor(e, l.href)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="xp-nav__menu"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="xp-menu"
          data-cursor="expand"
        >
          <span className="xp-nav__menu-label">{open ? "Close" : "Menu"}</span>
          <span className="xp-nav__menu-glyph" aria-hidden="true" />
        </button>
      </header>

      <div
        ref={overlay}
        id="xp-menu"
        className="xp-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
      >
        <svg className="xp-menu__pattern" aria-hidden="true">
          <defs>
            <pattern id="xp-oct" width="72" height="72" patternUnits="userSpaceOnUse">
              <path
                d="M36 14 L58 36 L36 58 L14 36 Z M20.5 20.5 H51.5 V51.5 H20.5 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xp-oct)" />
        </svg>

        <div className="xp-menu__body">
          <nav className="xp-menu__list" aria-label="Menu">
            {MENU.map((m) => (
              <div key={m.href} className="xp-menu__item-wrap">
                <a
                  href={m.href}
                  className="xp-menu__item"
                  onClick={(e) => anchor(e, m.href)}
                  data-cursor="expand"
                  tabIndex={open ? 0 : -1}
                >
                  <span className="xp-label xp-menu__index">{m.index}</span>
                  <span className="xp-menu__label">{m.label}</span>
                </a>
              </div>
            ))}
          </nav>

          <aside className="xp-menu__aside">
            <p className="xp-label">Start a project</p>
            <TransitionLink
              href="/contact"
              className="xp-menu__cta"
              onClick={close}
              data-cursor="expand"
              tabIndex={open ? 0 : -1}
            >
              Tell us what you&apos;re building <span aria-hidden="true">→</span>
            </TransitionLink>
            <p className="xp-label">Follow</p>
            <ul className="xp-menu__socials">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    tabIndex={open ? 0 : -1}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="xp-menu__foot">
          <a className="xp-label" href={`mailto:${contact.email}`} data-cursor="expand" tabIndex={open ? 0 : -1}>
            {contact.email}
          </a>
          <span className="xp-label">{contact.location} · Worldwide</span>
          <span className="xp-label">© {new Date().getFullYear()} ZERIV TECH</span>
        </div>
      </div>
    </>
  );
}
