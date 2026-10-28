import type { Metadata } from "next";
import { PageShell } from "@/experience/ui/PageShell";
import { ServicesStudio } from "@/experience/studio/ServicesStudio";
import { getServerLocale, pageMetadata } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getServerLocale(), {
    path: "/services",
    en: {
      title: "Services",
      description:
        "Web development, mobile applications, UI/UX, branding and AI solutions from ZERIV.",
    },
    ar: {
      title: "الخدمات",
      description:
        "تطوير ويب وتطبيقات موبايل وواجهات وتجربة مستخدم وهوية بصرية وحلول ذكاء اصطناعي من زيريف.",
    },
  });
}

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesStudio />
    </PageShell>
  );
}
