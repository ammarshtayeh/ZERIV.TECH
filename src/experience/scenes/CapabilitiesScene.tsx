"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";
import { capabilities, type ServiceVisualKind } from "../data/services";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { xp } from "../lib/experience-store";
import { ServiceVisual } from "../ui/ServiceVisual";

interface Props {
  reduced: boolean;
}

/**
 * Scene 03 — six disciplines as typography.
 * Each row is a full-width statement; hovering (or focusing / tapping) gives it a personality:
 * the type flips, the WebGL object reshapes itself and a vector visual answers on the right.
 */
export function CapabilitiesScene({ reduced }: Props) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>(-1);
  const [pinned, setPinned] = useState<number>(-1); // touch / keyboard selection

  useSceneProgress(root, "capabilities");

  useEffect(() => {
    xp.service = active >= 0 ? active : pinned;
  }, [active, pinned]);

  /* reveal rows as they enter */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const rows = el.querySelectorAll<HTMLElement>(".xp-caps__row");
      if (reduced) {
        gsap.set(rows, { opacity: 1 });
        gsap.set(el.querySelectorAll(".xp-caps__title-inner"), { yPercent: 0 });
        return;
      }
      rows.forEach((row) => {
        const inner = row.querySelectorAll<HTMLElement>(".xp-caps__title-inner");
        const rule = row.querySelector<HTMLElement>(".xp-caps__rule");
        gsap
          .timeline({
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
            defaults: { ease: motion.ease.out },
          })
          .to(row, { opacity: 1, duration: 0.4, ease: "none" }, 0)
          .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 1.1, transformOrigin: "0% 50%" }, 0)
          .fromTo(inner, { yPercent: 105 }, { yPercent: 0, duration: motion.duration.cinematic }, 0.05);
      });
      gsap.fromTo(
        el.querySelectorAll(".xp-caps__head > *"),
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration.ui,
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  const onToggle = useCallback((i: number) => {
    setPinned((p) => (p === i ? -1 : i));
  }, []);

  const current = active >= 0 ? active : pinned;
  const kind: ServiceVisualKind | null = current >= 0 ? capabilities[current].id : null;

  return (
    <section
      ref={root}
      id="services"
      className="xp-scene xp-caps"
      aria-labelledby="xp-caps-heading"
      data-active={current}
    >
      <header className="xp-caps__head">
        <p className="xp-label">Capabilities</p>
        <h2 id="xp-caps-heading" className="xp-caps__heading">
          <span>SIX DISCIPLINES.</span>
          <span>ONE STUDIO.</span>
        </h2>
      </header>

      <div className="xp-caps__grid">
        <ul className="xp-caps__list" onPointerLeave={() => setActive(-1)}>
          {capabilities.map((c, i) => (
            <li
              key={c.id}
              className="xp-caps__row"
              data-kind={c.id}
              data-on={current === i}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActive(i);
              }}
            >
              <button
                type="button"
                className="xp-caps__btn"
                aria-expanded={pinned === i}
                aria-controls={`xp-caps-detail-${c.id}`}
                onClick={() => onToggle(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(-1)}
                data-cursor="explore"
              >
                <span className="xp-label xp-caps__index">{c.index}</span>
                <span className="xp-caps__title">
                  <span className="xp-caps__title-inner">
                    <span className="xp-caps__title-a">{c.title}</span>
                    <span className="xp-caps__title-b" aria-hidden="true">
                      {c.title}
                    </span>
                  </span>
                </span>
              </button>
              <div className="xp-caps__detail" id={`xp-caps-detail-${c.id}`}>
                <p className="xp-caps__line">{c.line}</p>
                <ul className="xp-caps__items">
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <span className="xp-caps__rule" aria-hidden="true" />
            </li>
          ))}
        </ul>

        <div className="xp-caps__stage" aria-hidden="true">
          <div className="xp-caps__stage-inner">
            <ServiceVisual kind={kind} />
          </div>
        </div>
      </div>
    </section>
  );
}
