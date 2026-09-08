"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";
import type { DeviceTier } from "../hooks/useDeviceTier";
import { useInView } from "../hooks/useInView";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { createTransformation, STAGES, type Transformation } from "../lib/transformation";
import { BrandLogo } from "../ui/BrandLogo";

interface Props {
  tier: DeviceTier;
  reduced: boolean;
}

const DENSITY: Record<DeviceTier, number> = { high: 1, mid: 0.7, low: 0.45 };

/**
 * Scene 05 — the signature: Palestinian embroidery → geometry → grid → circuits → code →
 * particles → the ZERIV mark. Pinned; the user's scroll drives the whole transformation.
 */
export function SignatureScene({ tier, reduced }: Props) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const system = useRef<Transformation | null>(null);
  const stageWord = useRef<HTMLSpanElement>(null);

  useSceneProgress(root, "signature");

  useInView(root, (v) => {
    if (v) system.current?.start();
    else system.current?.stop();
  });

  useEffect(() => {
    const el = root.current;
    const cv = canvas.current;
    if (!el || !cv) return;

    const sys = createTransformation(cv, { density: DENSITY[tier] });
    system.current = sys;
    const onResize = () => sys.resize();
    window.addEventListener("resize", onResize);
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      sys.setPointer(e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("pointermove", onMove, { passive: true });

    const ctx = gsap.context(() => {
      const rail = el.querySelectorAll<HTMLElement>(".xp-sig__stage");
      const logo = el.querySelector<HTMLElement>(".xp-sig__logo");
      const sweep = el.querySelector<HTMLElement>(".xp-sig__sweep");
      const word = stageWord.current;
      let current = -1;

      const setStage = (idx: number) => {
        if (idx === current) return;
        current = idx;
        rail.forEach((r, i) => {
          r.dataset.on = i === idx ? "true" : "false";
          r.dataset.done = i < idx ? "true" : "false";
        });
        if (word) {
          word.textContent = STAGES[idx];
          word.classList.remove("is-swap");
          void word.offsetWidth;
          word.classList.add("is-swap");
        }
      };

      if (reduced) {
        sys.setProgress(1);
        setStage(6);
        gsap.set(logo, { clipPath: "inset(0% 0 0% 0)", opacity: 1, scale: 1 });
        return;
      }

      const mobile = window.matchMedia("(max-width: 900px)").matches;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: mobile ? "+=110%" : "+=180%",
          pin: true,
          pinSpacing: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            sys.setProgress(st.progress);
            setStage(Math.min(6, Math.round(st.progress * 6)));
          },
        },
      });

      // logo reveal lives on the same scrubbed timeline (1 unit = full scroll)
      tl.fromTo(
        logo,
        { clipPath: "inset(50% 0 50% 0)", opacity: 0, scale: 0.94 },
        { clipPath: "inset(0% 0 0% 0)", opacity: 1, scale: 1, duration: 0.09, ease: "power2.inOut" },
        0.885
      ).fromTo(sweep, { xPercent: -130 }, { xPercent: 130, duration: 0.08, ease: "power1.inOut" }, 0.905);
    }, el);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
      el.removeEventListener("pointermove", onMove);
      sys.destroy();
      system.current = null;
    };
  }, [tier, reduced]);

  return (
    <section ref={root} id="signature" className="xp-scene xp-sig" aria-labelledby="xp-sig-heading">
      <div className="xp-sig__pin">
        <canvas ref={canvas} className="xp-sig__canvas" aria-hidden="true" />

        <header className="xp-sig__head">
          <h2 id="xp-sig-heading" className="xp-sig__title">
            From embroidery to digital systems
          </h2>
        </header>

        <ol className="xp-sig__rail" aria-hidden="true">
          {STAGES.map((s, i) => (
            <li key={s} className="xp-sig__stage" data-on={i === 0} data-done="false">
              <span className="xp-sig__stage-index">0{i + 1}</span>
              <span className="xp-sig__stage-name">{s}</span>
            </li>
          ))}
        </ol>

        <div className="xp-sig__logo" aria-hidden="true">
          <BrandLogo decorative sizes="(max-width: 900px) 52vw, 22vw" />
          <div className="xp-sig__sweep" />
        </div>

        <p className="xp-sig__word" aria-hidden="true">
          <span ref={stageWord}>EMBROIDERY</span>
        </p>

        <p className="xp-sig__caption">
          The geometry of tatreez is a grid, a rhythm, a system — the same language a circuit
          speaks. ZERIV is built where the two meet.
        </p>
      </div>
    </section>
  );
}
