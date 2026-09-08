import type { Metadata } from "next";
import { PageShell } from "@/experience/ui/PageShell";
import { AboutStudio } from "@/experience/studio/AboutStudio";

export const metadata: Metadata = {
  title: "About",
  description:
    "ZERIV is a Palestinian creative technology studio building digital products with clarity, craft and cultural intelligence.",
  openGraph: {
    title: "About ZERIV",
    description: "Technology × Design × Culture — a Palestinian creative technology studio.",
    url: "/about",
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutStudio />
    </PageShell>
  );
}
