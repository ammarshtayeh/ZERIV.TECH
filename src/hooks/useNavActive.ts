"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type NavItemId =
  | "home"
  | "services"
  | "portfolio"
  | "zarif"
  | "about"
  | "contact";

const HOME_SECTIONS = ["services", "portfolio", "process", "zarif", "heritage"];

function resolveFromPath(pathname: string): NavItemId | null {
  if (pathname === "/contact") return "contact";
  if (pathname === "/about") return "about";
  if (pathname === "/portfolio") return "portfolio";
  if (pathname === "/services") return "services";
  return null;
}

function resolveHomeNav(hash: string, scrollSection: string | null): NavItemId {
  if (hash === "services" || scrollSection === "services") return "services";
  if (
    hash === "zarif" ||
    scrollSection === "zarif" ||
    scrollSection === "heritage"
  ) {
    return "zarif";
  }
  return "home";
}

export function useNavActive(): NavItemId {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [scrollSection, setScrollSection] = useState<string | null>(null);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace("#", ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (resolveFromPath(pathname)) return;

    if (pathname !== "/") return;

    const update = () => {
      if (window.scrollY < 120) {
        setScrollSection(null);
        return;
      }

      const marker = 150;
      let current: string | null = null;

      for (const id of HOME_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }

      setScrollSection(current);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const fromPath = resolveFromPath(pathname);
  if (fromPath) return fromPath;

  if (pathname === "/") {
    return resolveHomeNav(hash, scrollSection);
  }

  return "home";
}
