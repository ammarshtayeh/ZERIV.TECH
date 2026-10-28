import type { Metadata } from "next";
import { PageShell } from "@/experience/ui/PageShell";
import { AboutStudio } from "@/experience/studio/AboutStudio";
import { getServerLocale, pageMetadata } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getServerLocale(), {
    path: "/about",
    en: {
      title: "About",
      description:
        "ZERIV is a Palestinian studio building digital products with clarity, craft and cultural intelligence.",
    },
    ar: {
      title: "من نحن",
      description:
        "زيريف استوديو فلسطيني يبني منتجات رقمية بوضوح وحرفة وذكاء ثقافي.",
    },
  });
}

export default function AboutPage() {
  return (
    <PageShell>
      <AboutStudio />
    </PageShell>
  );
}
