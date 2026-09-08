import { portfolioProjects } from "@/lib/mock-data";
import type { MediaSource } from "../ui/CinematicMedia";

export interface ExperienceProject {
  id: string;
  index: string;
  name: string;
  arabicTitle: string;
  disciplines: string[];
  year: string;
  summary: string;
  industry: string;
  overview: string;
  challenge: string;
  approach: string;
  stack: string[];
  url?: string;
  media: MediaSource;
  accent: "red" | "green" | "bone";
  featured: boolean;
}

const meta: Record<
  string,
  {
    name: string;
    disciplines: string[];
    year: string;
    summary: string;
    industry: string;
    overview: string;
    challenge: string;
    approach: string;
    stack: string[];
    accent: ExperienceProject["accent"];
    featured: boolean;
  }
> = {
  sakannu: {
    name: "Sakannu",
    disciplines: ["Web", "Platform", "Product"],
    year: "2025",
    summary: "Verified student housing for An-Najah University — Nablus, in one tap.",
    industry: "Housing / Education",
    overview:
      "A Palestinian platform helping students find verified housing near An-Najah University in Nablus — built for trust, speed and clarity.",
    challenge:
      "Students needed a reliable way to find safe housing without scattered listings, unclear ownership or weak verification.",
    approach:
      "We designed a focused product experience around verification, search and trust — then engineered a fast web platform ready for real use.",
    stack: ["Next.js", "TypeScript", "Product design"],
    accent: "green",
    featured: true,
  },
  mindar: {
    name: "Mindar",
    disciplines: ["Web", "AI", "EdTech"],
    year: "2025",
    summary: "Upload your files, get tailored exam questions in seconds.",
    industry: "Education / AI",
    overview:
      "An intelligent study platform that turns uploaded materials into tailored exam questions — helping learners prepare with less friction.",
    challenge:
      "Students spend too long turning course material into useful practice. Manual question writing does not scale.",
    approach:
      "We shaped a calm product flow around upload → generation → review, and connected AI capabilities into a usable learning interface.",
    stack: ["Next.js", "AI APIs", "TypeScript"],
    accent: "red",
    featured: true,
  },
  malamih: {
    name: "Malamih",
    disciplines: ["Web", "Marketplace", "Health"],
    year: "2025",
    summary: "Palestine's directory for clinics, doctors and aesthetic care.",
    industry: "Health / Marketplace",
    overview:
      "A comprehensive Palestinian directory for clinics, doctors and aesthetic services — making discovery and booking clearer.",
    challenge:
      "Healthcare and aesthetic services were fragmented across informal channels, making discovery and trust difficult.",
    approach:
      "We structured the marketplace around searchable providers, clear categories and a product language that feels local and contemporary.",
    stack: ["Next.js", "Marketplace UX", "TypeScript"],
    accent: "bone",
    featured: true,
  },
  "flora-style": {
    name: "Flora Style",
    disciplines: ["E-commerce", "Web", "Brand"],
    year: "2025",
    summary: "A luxury store for curated bags, watches and accessories.",
    industry: "Retail / Luxury",
    overview:
      "A luxury ecommerce experience for curated bags, watches and accessories — with a refined visual system and clean shopping flow.",
    challenge:
      "Luxury products need presentation that matches their quality. A generic storefront would weaken the brand.",
    approach:
      "We built a restrained ecommerce surface with strong media hierarchy, clear product storytelling and a polished purchase path.",
    stack: ["Next.js", "E-commerce", "Brand design"],
    accent: "red",
    featured: true,
  },
};

export const projects: ExperienceProject[] = portfolioProjects.map((p, i) => {
  const m = meta[p.id] ?? {
    name: p.title,
    disciplines: [p.category],
    year: "2025",
    summary: p.description,
    industry: p.category,
    overview: p.description,
    challenge: p.description,
    approach: p.description,
    stack: p.tags,
    accent: "bone" as const,
    featured: true,
  };
  return {
    id: p.id,
    index: String(i + 1).padStart(2, "0"),
    name: m.name,
    arabicTitle: p.title,
    disciplines: m.disciplines,
    year: m.year,
    summary: m.summary,
    industry: m.industry,
    overview: m.overview,
    challenge: m.challenge,
    approach: m.approach,
    stack: m.stack,
    url: p.url,
    accent: m.accent,
    featured: m.featured,
    media: p.image
      ? { type: "image", src: p.image, alt: `${m.name} — ${p.title}` }
      : { type: "none", label: m.name },
  };
});

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export function getAdjacentProjects(id: string) {
  const i = projects.findIndex((p) => p.id === id);
  if (i < 0) return { prev: undefined, next: undefined };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
