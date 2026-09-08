"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../animations/gsap";
import { getPhase, subscribePhase, xp } from "../lib/experience-store";

const WORD = "ZERIV";
const STATEMENT = ["WE BUILD", "DIGITAL", "EXPERIENCES."];

interface Props {
  reduced: boolean;
}

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
        const letters = el.querySelectorAll<HTMLElement>(".xp-hero__letter");
        const lines = el.querySelectorAll<HTMLElement>(".xp-hero__line");
        const meta = el.querySelectorAll<HTMLElement>(".xp-hero__meta");

        if (reduced) {
          gsap.set(letters, { yPercent: 0, y: 0, opacity: 1 });
          gsap.set(lines, { yPercent: 0, y: 0 });
          gsap.set(meta, { opacity: 1, y: 0 });
          xp.reveal = 1;
          el.dataset.intro = "done";
          setIntroDone(true);
          return;
        }

        // CSS holds the hidden state until now; fromTo hands ownership to GSAP.
        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            onComplete: () => {
              el.dataset.intro = "done";
              setIntroDone(true);
            },
          })
          .fromTo(
            letters,
            { yPercent: 30, y: 0, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.25, stagger: 0.07 },
            0
          )
          .fromTo(
            lines,
            { yPercent: 112, y: 0 },
            { yPercent: 0, duration: 1.15, stagger: 0.11 },
            0.4
          )
          .fromTo(
            meta,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
            0.85
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

  /* ── Scroll: pinned hero dissolves into Scene 02 ── */
  useEffect(() => {
    if (!introDone) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const wraps = el.querySelectorAll<HTMLElement>(".xp-hero__letter-wrap");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=115%",
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          onUpdate: (st) => {
            xp.hero = st.progress;
          },
        },
      });

      tl.to(
        wraps,
        {
          yPercent: (i: number) => (i % 2 === 0 ? -1 : 1) * (16 + i * 7),
          opacity: 0.06,
          duration: 1,
        },
        0
      )
        .to(".xp-hero__word", { scale: 0.9, transformOrigin: "0% 100%", duration: 1 }, 0)
        .to(".xp-hero__statement", { yPercent: -28, opacity: 0, duration: 0.65 }, 0)
        .to(".xp-hero__chrome", { opacity: 0, duration: 0.4 }, 0);
    }, el);

    return () => ctx.revert();
  }, [introDone]);

  return (
    <section ref={root} className="xp-scene xp-hero" data-intro="pending" aria-label="ZERIV">
      <div className="xp-hero__chrome">
        <div className="xp-hero__meta xp-hero__meta--scene">
          <span className="xp-label">SCN_01 — IDENTITY</span>
          <span className="xp-label xp-hero__coords">31.9° N · 35.2° E</span>
        </div>

        <div className="xp-hero__meta xp-hero__meta--scroll" aria-hidden="true">
          <span className="xp-label">SCROLL</span>
          <span className="xp-hero__scroll-line" />
        </div>

        <p className="xp-hero__meta xp-hero__meta--tag xp-label">
          TECHNOLOGY <em>×</em> DESIGN <em>×</em> CULTURE
        </p>
      </div>

      <h2 className="xp-hero__statement" aria-label={STATEMENT.join(" ")}>
        {STATEMENT.map((line) => (
          <span key={line} className="xp-hero__line-wrap" aria-hidden="true">
            <span className="xp-hero__line">{line}</span>
          </span>
        ))}
      </h2>

      <h1 className="xp-hero__word" aria-label={WORD}>
        {Array.from(WORD).map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            className="xp-hero__letter-wrap"
            data-hero-letter={ch}
            aria-hidden="true"
          >
            <span className="xp-hero__letter">{ch}</span>
          </span>
        ))}
      </h1>
    </section>
  );
}
