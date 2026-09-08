"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../animations/gsap";
import { motion } from "../animations/motion";
import { projects } from "../data/projects";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { xp } from "../lib/experience-store";
import { CinematicMedia } from "../ui/CinematicMedia";

interface Props {
  reduced: boolean;
  narrow: boolean;
}

/**
 * Scene 04 — the work as film frames.
 * Desktop: the section pins and scroll drives a horizontal track (drag works too).
 * Mobile: each project is a full-height vertical scene with a masked media reveal.
 */
export function WorkScene({ reduced, narrow }: Props) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useSceneProgress(root, "work");

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>(".xp-work__item");
      const setCounter = (i: number) => {
        if (counter.current) counter.current.textContent = String(i + 1).padStart(2, "0");
      };

      if (narrow || reduced) {
        /* vertical scenes — masked reveal per item */
        items.forEach((item, i) => {
          const media = item.querySelector<HTMLElement>(".xp-work__media");
          const meta = item.querySelectorAll<HTMLElement>(".xp-work__meta > *");
          if (reduced) {
            gsap.set(media, { clipPath: "inset(0% 0 0% 0)" });
            gsap.set(meta, { opacity: 1, y: 0 });
            return;
          }
          gsap
            .timeline({
              scrollTrigger: {
                trigger: item,
                start: "top 75%",
                once: true,
                onEnter: () => setCounter(i),
              },
              defaults: { ease: motion.ease.out },
            })
            .fromTo(media, { clipPath: "inset(100% 0 0% 0)" }, { clipPath: "inset(0% 0 0% 0)", duration: 1.3 }, 0)
            .fromTo(meta, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.35);
        });
        return;
      }

      /* horizontal pinned sequence */
      const distance = () => Math.max(1, tr.scrollWidth - window.innerWidth);
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: motion.scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            setCounter(Math.min(items.length - 1, Math.floor(st.progress * items.length + 0.2)));
          },
        },
      });

      items.forEach((item) => {
        const img = item.querySelector<HTMLElement>(".xp-media");
        const name = item.querySelector<HTMLElement>(".xp-work__name");
        gsap.fromTo(
          img,
          { xPercent: -10, scale: 1.18 },
          {
            xPercent: 10,
            scale: 1.18,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          name,
          { xPercent: 12 },
          {
            xPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      /* drag to scrub the timeline (fine pointers) */
      let dragging = false;
      let lastX = 0;
      const down = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
        if ((e.target as HTMLElement).closest("a")) return;
        dragging = true;
        lastX = e.clientX;
        el.dataset.dragging = "true";
      };
      const move = (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        const lenis = xp.lenis;
        if (lenis) lenis.scrollTo(lenis.targetScroll - dx * 1.6, { immediate: true });
        else window.scrollBy(0, -dx * 1.6);
      };
      const up = () => {
        dragging = false;
        el.dataset.dragging = "false";
      };
      el.addEventListener("pointerdown", down);
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);

      return () => {
        el.removeEventListener("pointerdown", down);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
      };
    }, el);

    // media can change layout after load
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [narrow, reduced]);

  return (
    <section ref={root} id="work" className="xp-scene xp-work" aria-labelledby="xp-work-heading" data-layout={narrow ? "stack" : "track"}>
      <div className="xp-work__pin">
        <header className="xp-work__head">
          <p className="xp-label">SCN_04 — SELECTED WORK</p>
          <p className="xp-label xp-work__counter" aria-hidden="true">
            <span ref={counter}>01</span> / {String(projects.length).padStart(2, "0")}
          </p>
        </header>

        <div ref={track} className="xp-work__track" data-cursor={narrow ? undefined : "drag"}>
          <div className="xp-work__intro">
            <h2 id="xp-work-heading" className="xp-work__title">
              <span>SELECTED</span>
              <span>WORK</span>
            </h2>
            <p className="xp-work__intro-copy">
              Real products, live in the world — platforms, marketplaces and stores built for
              Palestinian founders and beyond.
            </p>
            <p className="xp-label xp-work__hint" aria-hidden="true">
              {narrow ? "SCROLL" : "SCROLL · DRAG"} →
            </p>
          </div>

          {projects.map((p) => (
            <article key={p.id} className="xp-work__item" data-accent={p.accent}>
              <a
                href={p.url ?? "#"}
                target={p.url ? "_blank" : undefined}
                rel={p.url ? "noopener noreferrer" : undefined}
                className="xp-work__media"
                data-cursor="view"
                aria-label={`${p.name} — open live site`}
              >
                <CinematicMedia source={p.media} sizes="(max-width: 900px) 92vw, 62vw" />
                <span className="xp-work__media-frame" aria-hidden="true" />
                <span className="xp-work__hover" aria-hidden="true">
                  VIEW PROJECT
                </span>
              </a>

              <div className="xp-work__meta">
                <p className="xp-label xp-work__index">{p.index}</p>
                <h3 className="xp-work__name">{p.name}</h3>
                <p className="xp-work__arabic" lang="ar" dir="rtl">
                  {p.arabicTitle}
                </p>
                <p className="xp-work__summary">{p.summary}</p>
                <p className="xp-label xp-work__facts">
                  <span>{p.disciplines.join(" / ")}</span>
                  <span>{p.year}</span>
                </p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="xp-work__visit"
                    data-cursor="open"
                  >
                    VIEW PROJECT <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}

          <div className="xp-work__outro">
            <p className="xp-label">MORE IN PRODUCTION</p>
            <p className="xp-work__outro-copy">Your project could be frame 05.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
