import { portfolioProjects } from "@/lib/mock-data";
import type { MediaSource } from "../ui/CinematicMedia";

export interface ExperienceProject {
  id: string;
  index: string;
  /** Display name for the cinematic scene */
  name: string;
  /** Original Arabic title (preserved from the existing data) */
  arabicTitle: string;
  disciplines: string[];
  year: string;
  summary: string;
  url?: string;
  media: MediaSource;
  /** Accent used for the scene's signal colour */
  accent: "red" | "green" | "bone";
}

const meta: Record<
  string,
  { name: string; disciplines: string[]; year: string; summary: string; accent: ExperienceProject["accent"] }
> = {
  sakannu: {
    name: "Sakannu",
    disciplines: ["Web", "Platform", "Product"],
    year: "2025",
    summary: "Verified student housing for An-Najah University — Nablus, in one tap.",
    accent: "green",
  },
  mindar: {
    name: "Mindar",
    disciplines: ["Web", "AI", "EdTech"],
    year: "2025",
    summary: "Upload your files, get tailored exam questions in seconds.",
    accent: "red",
  },
  malamih: {
    name: "Malamih",
    disciplines: ["Web", "Marketplace", "Health"],
    year: "2025",
    summary: "Palestine's directory for clinics, doctors and aesthetic care.",
    accent: "bone",
  },
  "flora-style": {
    name: "Flora Style",
    disciplines: ["E-commerce", "Web", "Brand"],
    year: "2025",
    summary: "A luxury store for curated bags, watches and accessories.",
    accent: "red",
  },
};

/**
 * Real projects from the existing codebase, re-expressed for the cinematic scene.
 * Replace `media` entries with video/sequence sources as premium assets arrive.
 */
export const projects: ExperienceProject[] = portfolioProjects.map((p, i) => {
  const m = meta[p.id] ?? {
    name: p.title,
    disciplines: [p.category],
    year: "2025",
    summary: p.description,
    accent: "bone" as const,
  };
  return {
    id: p.id,
    index: String(i + 1).padStart(2, "0"),
    name: m.name,
    arabicTitle: p.title,
    disciplines: m.disciplines,
    year: m.year,
    summary: m.summary,
    url: p.url,
    accent: m.accent,
    media: p.image
      ? { type: "image", src: p.image, alt: `${m.name} — ${p.title}` }
      : { type: "none", label: m.name },
  };
});
