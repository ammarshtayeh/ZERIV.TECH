"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "../animations/gsap";
import { usePhase } from "../lib/experience-store";

const LINKS = [
  { href: "/portfolio", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

const MENU = [
  { href: "/portfolio", label: "Work", index: "01" },
  { href: "/services", label: "Services", index: "02" },
  { href: "/about", label: "About", index: "03" },
  { href: "/contact", label: "Contact", index: "04" },
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

      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(el, { pointerEvents: "auto" })
        .fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.9 }
        )
        .fromTo(
          items,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "expo.out" },
          0.35
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
    if (open) {
      t.timeScale(1).play();
    } else {
      t.timeScale(1.6).reverse();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className="xp-nav" data-visible={phase !== "loading"} data-open={open}>
        <Link href="/" className="xp-nav__mark" data-cursor="expand" aria-label="ZERIV — home">
          ZERIV
        </Link>

        <nav className="xp-nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="xp-nav__link" data-cursor="expand">
              {l.label}
            </Link>
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

        <nav className="xp-menu__list" aria-label="Menu">
          {MENU.map((m) => (
            <div key={m.href} className="xp-menu__item-wrap">
              <Link
                href={m.href}
                className="xp-menu__item"
                onClick={close}
                data-cursor="expand"
              >
                <span className="xp-label xp-menu__index">{m.index}</span>
                <span className="xp-menu__label">{m.label}</span>
              </Link>
            </div>
          ))}
        </nav>

        <div className="xp-menu__foot">
          <a className="xp-label" href="mailto:ammar.shtayeh@gmail.com" data-cursor="expand">
            ammar.shtayeh@gmail.com
          </a>
          <span className="xp-label">Palestine · Worldwide</span>
          <span className="xp-label">© {new Date().getFullYear()} ZERIV</span>
        </div>
      </div>
    </>
  );
}
