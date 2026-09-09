"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { gsap } from "../animations/gsap";
import type { DeviceTier } from "../hooks/useDeviceTier";
import { useInView } from "../hooks/useInView";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { STAGE_LABELS } from "../data/localized";
import { createTransformation, STAGES, type Transformation } from "../lib/transformation";
import { BrandLogo } from "../ui/BrandLogo";

interface Props {
  tier: DeviceTier;
  reduced: boolean;
}

const DENSITY: Record<DeviceTier, number> = { high: 1, mid: 0.65, low: 0.4 };

/**
 * Signature moment — embroidery → system → ZERIV.
 * Desktop: short pin. Mobile: no pin (avoids empty scroll traps).
 */
export function SignatureScene({ tier, reduced }: Props) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const system = useRef<Transformation | null>(null);
  const label = useRef<HTMLSpanElement>(null);
  const indexEl = useRef<HTMLSpanElement>(null);
  const { t, locale } = useLocale();
  const stageNames = STAGE_LABELS[locale];

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

    const ctx = gsap.context(() => {
      const steps = el.querySelectorAll<HTMLElement>(".xp-sig__step");
      const logo = el.querySelector<HTMLElement>(".xp-sig__logo");
      const sweep = el.querySelector<HTMLElement>(".xp-sig__sweep");
      let current = -1;

      const setStage = (idx: number) => {
        if (idx === current) return;
        current = idx;
        steps.forEach((s, i) => {
          s.dataset.on = i === idx ? "true" : "false";
          s.dataset.done = i < idx ? "true" : "false";
        });
        if (label.current) label.current.textContent = stageNames[idx];
        if (indexEl.current) indexEl.current.textContent = String(idx + 1).padStart(2, "0");
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
          start: mobile ? "top 75%" : "top top",
          end: mobile ? "bottom 25%" : "+=150%",
          pin: !mobile,
          pinSpacing: true,
          scrub: mobile ? 0.5 : 0.65,
          anticipatePin: mobile ? 0 : 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            sys.setProgress(st.progress);
            setStage(Math.min(6, Math.round(st.progress * 6)));
          },
        },
      });

      if (logo && sweep) {
        tl.fromTo(
          logo,
          { clipPath: "inset(50% 0 50% 0)", opacity: 0, scale: 0.96 },
          { clipPath: "inset(0% 0 0% 0)", opacity: 1, scale: 1, duration: 0.1, ease: "power2.inOut" },
          0.88
        ).fromTo(sweep, { xPercent: -120 }, { xPercent: 120, duration: 0.08, ease: "power1.inOut" }, 0.9);
      }
    }, el);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
      sys.destroy();
      system.current = null;
    };
  }, [tier, reduced, locale, stageNames]);

  return (
    <section ref={root} id="signature" className="xp-scene xp-sig" aria-labelledby="xp-sig-heading">
      <div className="xp-sig__frame">
        <canvas ref={canvas} className="xp-sig__canvas" aria-hidden="true" />

        <header className="xp-sig__head">
          <p className="xp-label">{t("sig.label")}</p>
          <h2 id="xp-sig-heading" className="xp-sig__title">
            {t("sig.title")}
          </h2>
        </header>

        <div className="xp-sig__status" aria-live="polite">
          <span ref={indexEl} className="xp-sig__status-index">
            01
          </span>
          <span className="xp-sig__status-sep" aria-hidden="true">
            /
          </span>
          <span className="xp-sig__status-total" aria-hidden="true">
            07
          </span>
          <span ref={label} className="xp-sig__status-name">
            {stageNames[0]}
          </span>
        </div>

        <ol className="xp-sig__steps" aria-label="Transformation stages">
          {STAGES.map((s, i) => (
            <li key={s} className="xp-sig__step" data-on={i === 0 ? "true" : "false"} data-done="false">
              <span className="xp-sig__step-i">{String(i + 1).padStart(2, "0")}</span>
              <span className="xp-sig__step-n">{stageNames[i]}</span>
            </li>
          ))}
        </ol>

        <div className="xp-sig__logo" aria-hidden="true">
          <BrandLogo decorative sizes="(max-width: 900px) 48vw, 20vw" />
          <div className="xp-sig__sweep" />
        </div>

        <p className="xp-sig__caption">{t("sig.caption")}</p>
      </div>
    </section>
  );
}
