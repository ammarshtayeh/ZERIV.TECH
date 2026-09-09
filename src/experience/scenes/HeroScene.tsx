"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";
import { getPhase, subscribePhase, xp } from "../lib/experience-store";
import { BrandLogo } from "../ui/BrandLogo";

interface Props {
  reduced: boolean;
}

/**
 * Scene 01 — clean first frame: official mark, one statement, one line of positioning.
 * Logo docks into the nav on scroll. No HUD chrome.
 */
export function HeroScene({ reduced }: Props) {
  const root = useRef<HTMLElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const { t, locale } = useLocale();
  const statement = useMemo(() => [t("hero.l1"), t("hero.l2"), t("hero.l3")], [t, locale]);

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
          .set(logo, { opacity: 1 }, 0)
          .fromTo(
            lines,
            { yPercent: 112, y: 0 },
            { yPercent: 0, duration: motion.duration.cinematic, stagger: 0.11 },
            0.35
          )
          .fromTo(meta, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.06 }, 0.85)
          .to(xp, { reveal: 1, duration: 1.7, ease: "power2.inOut" }, 0.1);
      });
    };

    const unsubscribe = subscribePhase(run);
    run();

    return () => {
      unsubscribe();
      ctx.revert();
    };
  }, [reduced, locale]);

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

      const mobile = window.matchMedia("(max-width: 900px)").matches;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: mobile ? "bottom top" : "+=70%",
          pin: !mobile,
          pinSpacing: true,
          scrub: mobile ? 0.45 : 0.65,
          anticipatePin: mobile ? 0 : 1,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
          onUpdate: (st) => {
            xp.hero = st.progress;
            dock(st.progress > (mobile ? 0.4 : 0.92));
          },
          onLeave: () => dock(true),
          onEnterBack: () => dock(false),
        },
      });

      tl.to(
        wraps,
        {
          xPercent: (i: number) => (i % 2 === 0 ? -1 : 1) * (8 + i * 5),
          yPercent: (i: number) => -14 - i * 6,
          opacity: 0,
          duration: 0.8,
        },
        0
      )
        .to(".xp-hero__chrome", { opacity: 0, duration: 0.35 }, 0)
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
  }, [introDone, locale]);

  return (
    <section ref={root} id="top" className="xp-scene xp-hero" data-intro="pending" aria-label="ZERIV">
      <div className="xp-hero__chrome">
        <p className="xp-hero__meta xp-hero__meta--tag xp-label">{t("hero.tag")}</p>
        <p className="xp-hero__meta xp-hero__meta--line">{t("hero.line")}</p>
        <div className="xp-hero__meta xp-hero__meta--scroll" aria-hidden="true">
          <span className="xp-label">{t("hero.scroll")}</span>
          <span className="xp-hero__scroll-line" />
        </div>
      </div>

      <h1 className="xp-hero__logo" data-hero-logo>
        <BrandLogo priority sizes="(max-width: 900px) 60vw, 24vw" />
      </h1>

      <h2 className="xp-hero__statement" aria-label={statement.join(" ")}>
        {statement.map((line) => (
          <span key={line} className="xp-hero__line-wrap" aria-hidden="true">
            <span className="xp-hero__line">{line}</span>
          </span>
        ))}
      </h2>
    </section>
  );
}
