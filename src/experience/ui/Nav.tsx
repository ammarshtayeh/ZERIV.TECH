"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";
import { getPhase, scrollToTarget, usePhase, xp } from "../lib/experience-store";
import { contact } from "../data/contact";
import { BrandLogo } from "./BrandLogo";
import { TransitionLink } from "./TransitionLink";

type Mode = "home" | "site";

const HOME_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const SITE_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const HOME_MENU = [
  { href: "#work", label: "Work", index: "01" },
  { href: "#services", label: "Services", index: "02" },
  { href: "#about", label: "About", index: "03" },
  { href: "#contact", label: "Contact", index: "04" },
];

const SITE_MENU = [
  { href: "/work", label: "Work", index: "01" },
  { href: "/services", label: "Services", index: "02" },
  { href: "/about", label: "About", index: "03" },
  { href: "/contact", label: "Contact", index: "04" },
];

interface Props {
  mode?: Mode;
}

export function Nav({ mode = "home" }: Props) {
  const phase = usePhase();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const links = mode === "site" ? SITE_LINKS : HOME_LINKS;
  const menu = mode === "site" ? SITE_MENU : HOME_MENU;
  const visible = mode === "site" || phase !== "loading";

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
        .fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.75 })
        .fromTo(
          items,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: motion.stagger.items, ease: motion.ease.out },
          0.28
        )
        .fromTo(aside, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, 0.5)
        .fromTo(foot, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, 0.55);
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

  const onHomeAnchor = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      setOpen(false);
      window.setTimeout(() => scrollToTarget(href), open ? 220 : 0);
    },
    [open]
  );

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="xp-nav" data-visible={visible} data-open={open}>
        {mode === "home" ? (
          <a
            href="#top"
            className="xp-nav__logo"
            data-cursor="expand"
            aria-label="ZERIV — back to top"
            onClick={(e) => onHomeAnchor(e, "#top")}
          >
            <BrandLogo sizes="120px" decorative />
          </a>
        ) : (
          <TransitionLink href="/" className="xp-nav__logo" data-cursor="expand" aria-label="ZERIV — home">
            <BrandLogo sizes="120px" decorative />
          </TransitionLink>
        )}

        <nav className="xp-nav__links" aria-label="Primary">
          {links.map((l) =>
            l.href.startsWith("#") ? (
              <a
                key={l.href}
                href={l.href}
                className="xp-nav__link"
                data-cursor="expand"
                onClick={(e) => onHomeAnchor(e, l.href)}
              >
                {l.label}
              </a>
            ) : (
              <TransitionLink
                key={l.href}
                href={l.href}
                className="xp-nav__link"
                data-cursor="expand"
                data-active={isActive(l.href) ? "true" : "false"}
              >
                {l.label}
              </TransitionLink>
            )
          )}
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
        <div className="xp-menu__body">
          <nav className="xp-menu__list" aria-label="Menu">
            {menu.map((m) => (
              <div key={m.href} className="xp-menu__item-wrap">
                {m.href.startsWith("#") ? (
                  <a
                    href={m.href}
                    className="xp-menu__item"
                    onClick={(e) => onHomeAnchor(e, m.href)}
                    data-cursor="expand"
                    tabIndex={open ? 0 : -1}
                  >
                    <span className="xp-label xp-menu__index">{m.index}</span>
                    <span className="xp-menu__label">{m.label}</span>
                  </a>
                ) : (
                  <TransitionLink
                    href={m.href}
                    className="xp-menu__item"
                    onClick={close}
                    data-cursor="expand"
                    tabIndex={open ? 0 : -1}
                  >
                    <span className="xp-label xp-menu__index">{m.index}</span>
                    <span className="xp-menu__label">{m.label}</span>
                  </TransitionLink>
                )}
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
          <span className="xp-label">{contact.location}</span>
          <span className="xp-label">© {new Date().getFullYear()} ZERIV TECH</span>
        </div>
      </div>
    </>
  );
}
