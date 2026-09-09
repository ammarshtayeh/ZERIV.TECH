export type ServiceVisualKind = "web" | "mobile" | "uiux" | "branding" | "ai";

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
  /** Project ids from experience/data/projects */
  related: string[];
}

export const capabilities: Capability[] = [
  {
    id: "web",
    index: "01",
    title: "WEB DEVELOPMENT",
    line: "Fast, structural products built to scale — platforms, stores and applications.",
    items: ["Digital platforms", "E-commerce", "Web applications", "Interactive experiences"],
    tags: ["Platforms", "Performance", "Product"],
    audience: "Startups, institutions and brands that need a serious web product — not a template.",
    includes: [
      "Product platforms and marketing sites",
      "E-commerce and marketplaces",
      "Dashboards and internal tools",
      "Performance, SEO and accessibility foundations",
    ],
    related: ["sakannu", "malamih", "flora-style", "mindar"],
  },
  {
    id: "mobile",
    index: "02",
    title: "MOBILE APPLICATIONS",
    line: "Fluid native surfaces for iOS and Android from one product vision.",
    items: ["iOS + Android", "Product apps", "Offline-first", "App store launch"],
    tags: ["iOS", "Android", "Product"],
    audience: "Teams shipping product experiences that need to feel native on every device.",
    includes: [
      "Cross-platform product apps",
      "Onboarding and retention flows",
      "Offline-aware architecture",
      "App Store and Play Store readiness",
    ],
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
    related: ["flora-style", "malamih"],
  },
  {
    id: "ai",
    index: "05",
    title: "AI SOLUTIONS",
    line: "Intelligence wired into real products — useful, focused, production-ready.",
    items: ["Product AI", "Automation", "Knowledge systems", "Workflows"],
    tags: ["Product AI", "Automation", "Systems"],
    audience: "Products that need intelligence embedded — not bolted on as a gimmick.",
    includes: [
      "AI-powered product features",
      "Workflow automation",
      "Content and knowledge systems",
      "Safe deployment patterns",
    ],
    related: ["mindar"],
  },
];
