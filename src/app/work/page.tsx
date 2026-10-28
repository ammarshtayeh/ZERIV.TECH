import type { Metadata } from "next";
import { PageShell } from "@/experience/ui/PageShell";
import { WorkIndex } from "@/experience/studio/WorkIndex";
import { getServerLocale, pageMetadata } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getServerLocale(), {
    path: "/work",
    en: {
      title: "Work",
      description:
        "Selected digital products, platforms and experiences built by ZERIV — a Palestinian studio for digital products and brands.",
    },
    ar: {
      title: "الأعمال",
      description:
        "منتجات ومنصات وتجارب رقمية مختارة بنتها زيريف — استوديو فلسطيني للمنتجات الرقمية والعلامات.",
    },
  });
}

export default function WorkPage() {
  return (
    <PageShell>
      <WorkIndex />
    </PageShell>
  );
}
