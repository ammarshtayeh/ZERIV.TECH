"use client";

import { useEffect, type ReactNode } from "react";
import { setPhase } from "../lib/experience-store";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { RouteTransition } from "./TransitionLink";
import "../experience.css";
import "../experience-studio.css";

interface Props {
  children: ReactNode;
  /** When true, skip cinematic preloader and unlock nav immediately */
  ready?: boolean;
}

/**
 * Shared shell for official studio pages (Work, Services, About, Contact, case studies).
 * Same brand system as the homepage — no legacy card chrome.
 */
export function PageShell({ children, ready = true }: Props) {
  useEffect(() => {
    document.documentElement.classList.add("xp-html");
    if (ready) setPhase("ready");
    return () => document.documentElement.classList.remove("xp-html");
  }, [ready]);

  return (
    <div className="xp xp-page" data-phase="ready">
      <div className="xp-grid" aria-hidden="true" />
      <div className="xp-vignette" aria-hidden="true" />
      <a className="xp-skip" href="#content">
        Skip to content
      </a>
      <Nav mode="site" />
      <main id="content" className="xp-main xp-page__main">
        {children}
      </main>
      <Footer mode="site" />
      <RouteTransition />
      <Cursor />
    </div>
  );
}
