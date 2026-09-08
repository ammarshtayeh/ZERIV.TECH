export type ServiceVisualKind = "web" | "mobile" | "uiux" | "branding" | "ai" | "creative";

export interface Capability {
  id: ServiceVisualKind;
  index: string;
  title: string;
  line: string;
  items: string[];
  tags: string[];
  /** Commercial clarity for the Services page */
  audience: string;
  includes: string[];
  tech: string[];
  /** Project ids from experience/data/projects */
  related: string[];
}

export const capabilities: Capability[] = [
  {
    id: "web",
    index: "01",
    title: "WEB DEVELOPMENT",
    line: "Fast, structural, built to scale — Next.js, React, TypeScript.",
    items: ["Digital platforms", "E-commerce", "Web applications", "Interactive experiences"],
    tags: ["Next.js", "Headless", "Performance"],
    audience: "Startups, institutions and brands that need a serious web product — not a template.",
    includes: [
      "Product platforms and marketing sites",
      "E-commerce and marketplaces",
      "Dashboards and internal tools",
      "Performance, SEO and accessibility foundations",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "Headless CMS"],
    related: ["sakannu", "malamih", "flora-style", "mindar"],
  },
  {
    id: "mobile",
    index: "02",
    title: "MOBILE APPLICATIONS",
    line: "Fluid native surfaces for iOS and Android from one codebase.",
    items: ["iOS + Android", "Product apps", "Offline-first", "App store launch"],
    tags: ["React Native", "iOS", "Android"],
    audience: "Teams shipping product experiences that need to feel native on every device.",
    includes: [
      "Cross-platform product apps",
      "Onboarding and retention flows",
      "Offline-aware architecture",
      "App Store and Play Store readiness",
    ],
    tech: ["React Native", "TypeScript", "Native modules"],
    related: ["sakannu", "mindar"],
  },
  {
    id: "uiux",
    index: "03",
    title: "UI / UX",
    line: "Interfaces with rhythm — research, systems, motion, detail.",
    items: ["Research", "Design systems", "Prototyping", "Motion design"],
    tags: ["Systems", "Prototyping", "Motion"],
    audience: "Founders and product teams who want clarity, craft and usable systems.",
    includes: [
      "Research and information architecture",
      "Interface design and design systems",
      "Interactive prototypes",
      "Motion and micro-interaction design",
    ],
    tech: ["Figma", "Design systems", "Prototyping", "Motion"],
    related: ["malamih", "sakannu", "flora-style"],
  },
  {
    id: "branding",
    index: "04",
    title: "BRANDING",
    line: "Identities with a point of view, from mark to voice.",
    items: ["Brand identity", "Typography", "Voice", "Guidelines"],
    tags: ["Identity", "Typography", "Guidelines"],
    audience: "Organizations defining how they look, speak and behave across every surface.",
    includes: [
      "Brand strategy and positioning",
      "Visual identity systems",
      "Typography and art direction",
      "Guidelines for digital and print",
    ],
    tech: ["Identity systems", "Typography", "Art direction"],
    related: ["flora-style", "malamih"],
  },
  {
    id: "ai",
    index: "05",
    title: "AI SOLUTIONS",
    line: "Models, agents and pipelines wired into real products.",
    items: ["LLM integration", "Automation", "Data pipelines", "Product AI"],
    tags: ["LLM APIs", "Automation", "Data"],
    audience: "Products that need intelligence embedded — not bolted on as a gimmick.",
    includes: [
      "LLM-powered product features",
      "Workflow automation",
      "Content and knowledge systems",
      "Evaluation and safe deployment patterns",
    ],
    tech: ["LLM APIs", "Python / Node", "Vector search", "Automation"],
    related: ["mindar"],
  },
  {
    id: "creative",
    index: "06",
    title: "CREATIVE TECHNOLOGY",
    line: "WebGL, generative systems and experiences that shouldn't be possible in a browser.",
    items: ["WebGL", "Generative systems", "Installations", "Experimental UI"],
    tags: ["WebGL", "Shaders", "Installations"],
    audience: "Brands and institutions who need a signature digital moment — memorable, controlled, real.",
    includes: [
      "Interactive web experiences",
      "WebGL and generative visuals",
      "Campaign and launch surfaces",
      "Exhibition and installation concepts",
    ],
    tech: ["Three.js", "WebGL", "Shaders", "Canvas"],
    related: [],
  },
];
