"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useDeviceTier } from "./hooks/useDeviceTier";
import { useNarrow } from "./hooks/useNarrow";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useLenis } from "./hooks/useLenis";
import { setPhase, scrollToTarget, usePhase, xp } from "./lib/experience-store";
import { ScrollTrigger } from "./animations/gsap";
import { Preloader } from "./scenes/Preloader";
import { HeroScene } from "./scenes/HeroScene";
import { IdentityScene } from "./scenes/IdentityScene";
import { CapabilitiesScene } from "./scenes/CapabilitiesScene";
import { WorkScene } from "./scenes/WorkScene";
import { SignatureScene } from "./scenes/SignatureScene";
import { ProcessScene } from "./scenes/ProcessScene";
import { FinalScene } from "./scenes/FinalScene";
import { Footer } from "./ui/Footer";
import { Nav } from "./ui/Nav";
import { Cursor } from "./ui/Cursor";
import { RouteTransition } from "./ui/TransitionLink";
import "./experience.css";
import "./experience-studio.css";

const ExperienceCanvas = dynamic(() => import("./webgl/ExperienceCanvas"), {
  ssr: false,
});

/**
 * Official ZERIV journey.
 * Hero → Position → Selected Work → Capabilities → Signature → Method → Contact
 */
export function Experience() {
  const tier = useDeviceTier();
  const reduced = useReducedMotion();
  const narrow = useNarrow();
  const phase = usePhase();
  const { t, locale } = useLocale();

  useLenis(phase === "ready", reduced);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      xp.pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      xp.pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("xp-html");
    return () => document.documentElement.classList.remove("xp-html");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("xp-locked", phase !== "ready");
    return () => document.documentElement.classList.remove("xp-locked");
  }, [phase]);

  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);

  /* Re-measure pins after the preloader unlocks scroll — prevents stacked section jumps. */
  useEffect(() => {
    if (phase !== "ready") return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    const id2 = window.setTimeout(() => ScrollTrigger.refresh(), 420);
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(id2);
    };
  }, [phase]);

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => window.clearTimeout(id);
  }, [locale]);

  const onHandoff = useCallback(() => setPhase("revealing"), []);
  const onComplete = useCallback(() => setPhase("ready"), []);

  return (
    <div className="xp" data-phase={phase} data-tier={tier} data-locale={locale}>
      <ExperienceCanvas tier={tier} reduced={reduced} />
      <div className="xp-grid" aria-hidden="true" />
      <div className="xp-vignette" aria-hidden="true" />

      <a
        className="xp-skip"
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          xp.reveal = 1;
          setPhase("ready");
          window.setTimeout(() => scrollToTarget("#work"), 120);
        }}
      >
        {t("skip")}
      </a>

      <Nav mode="home" />

      <main className="xp-main">
        <HeroScene reduced={reduced} />
        <IdentityScene reduced={reduced} />
        <WorkScene reduced={reduced} />
        <CapabilitiesScene reduced={reduced} narrow={narrow} />
        <SignatureScene tier={tier} reduced={reduced} />
        <ProcessScene reduced={reduced} narrow={narrow} />
        <FinalScene reduced={reduced} />
      </main>

      <Footer mode="home" />

      {phase !== "ready" && (
        <Preloader tier={tier} reduced={reduced} onHandoff={onHandoff} onComplete={onComplete} />
      )}

      <RouteTransition />
      <Cursor />
    </div>
  );
}
