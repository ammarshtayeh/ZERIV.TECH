"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect } from "react";
import { useDeviceTier } from "./hooks/useDeviceTier";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useLenis } from "./hooks/useLenis";
import { setPhase, usePhase, xp } from "./lib/experience-store";
import { Preloader } from "./scenes/Preloader";
import { HeroScene } from "./scenes/HeroScene";
import { IdentityScene } from "./scenes/IdentityScene";
import { EndCap } from "./scenes/EndCap";
import { Nav } from "./ui/Nav";
import { Cursor } from "./ui/Cursor";
import "./experience.css";

const ExperienceCanvas = dynamic(() => import("./webgl/ExperienceCanvas"), {
  ssr: false,
});

export function Experience() {
  const tier = useDeviceTier();
  const reduced = useReducedMotion();
  const phase = usePhase();

  useLenis(phase === "ready", reduced);

  /* pointer → normalised coordinates for the WebGL layer */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      xp.pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      xp.pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* always begin the journey from the top; lock scroll until the hand-off */
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

  const onHandoff = useCallback(() => setPhase("revealing"), []);
  const onComplete = useCallback(() => setPhase("ready"), []);

  return (
    <div className="xp" data-phase={phase} data-tier={tier}>
      <ExperienceCanvas tier={tier} reduced={reduced} />
      <div className="xp-grid" aria-hidden="true" />
      <div className="xp-vignette" aria-hidden="true" />

      <Nav />

      <main className="xp-main">
        <HeroScene reduced={reduced} />
        <IdentityScene reduced={reduced} />
        <EndCap />
      </main>

      {phase !== "ready" && (
        <Preloader
          tier={tier}
          reduced={reduced}
          onHandoff={onHandoff}
          onComplete={onComplete}
        />
      )}

      <Cursor />
    </div>
  );
}
