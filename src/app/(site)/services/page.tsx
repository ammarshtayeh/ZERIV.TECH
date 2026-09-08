import type { Metadata } from "next";
import { PageShell } from "@/experience/ui/PageShell";
import { ServicesStudio } from "@/experience/studio/ServicesStudio";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, mobile applications, UI/UX, branding, AI solutions and creative technology from ZERIV.",
  openGraph: {
    title: "Capabilities | ZERIV",
    description: "What ZERIV builds — web, mobile, design, brand, AI and creative technology.",
    url: "/services",
  },
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesStudio />
    </PageShell>
  );
}
