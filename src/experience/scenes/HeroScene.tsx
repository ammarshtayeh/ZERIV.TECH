"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";
import { getPhase, subscribePhase, xp } from "../lib/experience-store";
import { BrandLogo } from "../ui/BrandLogo";

const STATEMENT = ["WE BUILD", "DIGITAL", "EXPERIENCES."];

interface Props {
  reduced: boolean;
}

/**
 * Scene 01 — the mark and the statement.
 * The approved logo is the anchor; oversized typography bleeds past the viewport; the lattice
 * lives behind both. On scroll the statement drifts apart while the logo travels into the nav.
 */
export function HeroScene({ reduced }: Props) {
  const root = useRef<HTMLElement>(null);
  const [introDone, setIntroDone] = useState(false);

  /* ── Intro: fired once by the preloader hand-off (phase leaves "loading") ── */
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    let started = false;
    const ctx = gsap.context(() => {}, el);

    const run = () => {
      if (started || getPhase() === "loading") return;
      started = true;

      ctx.add(() => {
        const logo = el.querySelector<HTMLElement>(".xp-hero__logo");
        const lines = el.querySelectorAll<HTMLElement>(".xp-hero__line");
        const meta = el.querySelectorAll<HTMLElement>(".xp-hero__meta");

        if (reduced) {
          gsap.set(logo, { opacity: 1 });
          gsap.set(lines, { yPercent: 0, y: 0 });
          gsap.set(meta, { opacity: 1, y: 0 });
          xp.reveal = 1;
          el.dataset.intro = "done";
          setIntroDone(true);
          return;
        }

        gsap
          .timeline({
            defaults: { ease: motion.ease.out },
            onComplete: () => {
              el.dataset.intro = "done";
              setIntroDone(true);
            },
          })
          // the preloader's copy of the mark is exactly on top — show ours immediately
          .set(logo, { opacity: 1 }, 0)
          .fromTo(
            lines,
            { yPercent: 112, y: 0 },
            { yPercent: 0, duration: motion.duration.cinematic, stagger: 0.11 },
            0.35
          )
          .fromTo(
            meta,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
            0.9
          )
          .to(xp, { reveal: 1, duration: 1.9, ease: "power2.inOut" }, 0.1);
      });
    };

    const unsubscribe = subscribePhase(run);
    run();

    return () => {
      unsubscribe();
      ctx.revert();
    };
  }, [reduced]);

  /* ── Scroll: pinned hero dissolves into Scene 02; the logo docks into the nav ── */
  useEffect(() => {
    if (!introDone) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const logo = el.querySelector<HTMLElement>(".xp-hero__logo");
      const navSlot = document.querySelector<HTMLElement>(".xp-nav__logo");
      const wraps = el.querySelectorAll<HTMLElement>(".xp-hero__line-wrap");
      const dest = { x: 0, y: 0, scale: 1 };

      const dock = (on: boolean) => {
        document.documentElement.dataset.xpDocked = on ? "true" : "false";
      };
      dock(false);

      // Measure once per refresh — never inside the tween, or clearProps fights the flight.
      const measure = () => {
        if (!logo || !navSlot) return;
        gsap.set(logo, { x: 0, y: 0, scale: 1 });
        const from = logo.getBoundingClientRect();
        const to = navSlot.getBoundingClientRect();
        dest.x = to.left - from.left;
        dest.y = to.top - from.top;
        dest.scale = from.width ? to.width / from.width : 1;
      };
      measure();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=115%",
          pin: true,
          scrub: motion.scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
          onUpdate: (st) => {
            xp.hero = st.progress;
            dock(st.progress > 0.985);
          },
          onLeave: () => dock(true),
          onEnterBack: () => dock(false),
        },
      });

      tl.to(
        wraps,
        {
          xPercent: (i: number) => (i % 2 === 0 ? -1 : 1) * (10 + i * 6),
          yPercent: (i: number) => -18 - i * 8,
          opacity: 0,
          duration: 0.8,
        },
        0
      )
        .to(".xp-hero__chrome", { opacity: 0, duration: 0.4 }, 0)
        .to(
          logo,
          {
            x: () => dest.x,
            y: () => dest.y,
            scale: () => dest.scale,
            transformOrigin: "0% 0%",
            duration: 1,
            ease: "power2.inOut",
          },
          0
        );
    }, el);

    return () => {
      ctx.revert();
      delete document.documentElement.dataset.xpDocked;
    };
  }, [introDone]);

  return (
    <section ref={root} id="top" className="xp-scene xp-hero" data-intro="pending" aria-label="ZERIV">
      <div className="xp-hero__chrome">
        <div className="xp-hero__meta xp-hero__meta--scene">
          <span className="xp-label">ZERIV / 001</span>
          <span className="xp-label xp-hero__coords">PALESTINE · 31.9° N · 35.2° E</span>
        </div>

        <div className="xp-hero__meta xp-hero__meta--scroll" aria-hidden="true">
          <span className="xp-label">SCROLL</span>
          <span className="xp-hero__scroll-line" />
        </div>

        <p className="xp-hero__meta xp-hero__meta--tag xp-label">
          TECHNOLOGY <em>×</em> DESIGN <em>×</em> CULTURE
        </p>

        <p className="xp-hero__meta xp-hero__meta--status xp-label">
          <i /> DIGITAL SYSTEM ACTIVE
        </p>
      </div>

      <h1 className="xp-hero__logo" data-hero-logo>
        <BrandLogo priority sizes="(max-width: 900px) 60vw, 24vw" />
      </h1>

      <h2 className="xp-hero__statement" aria-label={STATEMENT.join(" ")}>
        {STATEMENT.map((line) => (
          <span key={line} className="xp-hero__line-wrap" aria-hidden="true">
            <span className="xp-hero__line">{line}</span>
          </span>
        ))}
      </h2>
    </section>
  );
}
