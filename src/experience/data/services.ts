export type ServiceVisualKind = "web" | "mobile" | "uiux" | "branding" | "ai" | "creative";

export interface Capability {
  id: ServiceVisualKind;
  index: string;
  title: string;
  line: string;
  items: string[];
  tags: string[];
}

export const capabilities: Capability[] = [
  {
    id: "web",
    index: "01",
    title: "WEB DEVELOPMENT",
    line: "Fast, structural, built to scale — Next.js, React, TypeScript.",
    items: ["Digital platforms", "E-commerce", "Web applications", "Interactive experiences"],
    tags: ["Next.js", "Headless", "Performance"],
  },
  {
    id: "mobile",
    index: "02",
    title: "MOBILE APPLICATIONS",
    line: "Fluid native surfaces for iOS and Android from one codebase.",
    items: ["iOS + Android", "Product apps", "Offline-first", "App store launch"],
    tags: ["React Native", "iOS", "Android"],
  },
  {
    id: "uiux",
    index: "03",
    title: "UI / UX",
    line: "Interfaces with rhythm — research, systems, motion, detail.",
    items: ["Research", "Design systems", "Prototyping", "Motion design"],
    tags: ["Systems", "Prototyping", "Motion"],
  },
  {
    id: "branding",
    index: "04",
    title: "BRANDING",
    line: "Identities with a point of view, from mark to voice.",
    items: ["Brand identity", "Typography", "Voice", "Guidelines"],
    tags: ["Identity", "Typography", "Guidelines"],
  },
  {
    id: "ai",
    index: "05",
    title: "AI SOLUTIONS",
    line: "Models, agents and pipelines wired into real products.",
    items: ["LLM integration", "Automation", "Data pipelines", "Product AI"],
    tags: ["LLM APIs", "Automation", "Data"],
  },
  {
    id: "creative",
    index: "06",
    title: "CREATIVE TECHNOLOGY",
    line: "WebGL, generative systems and experiences that shouldn't be possible in a browser.",
    items: ["WebGL", "Generative systems", "Installations", "Experimental UI"],
    tags: ["WebGL", "Shaders", "Installations"],
  },
];
