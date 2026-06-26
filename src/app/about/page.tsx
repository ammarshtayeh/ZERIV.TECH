import type { Metadata } from "next";
import { PageTransition } from "@/components/effects/PageTransition";
import { PageHeader } from "@/components/layout/PageHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { ZarifSection } from "@/components/sections/ZarifSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "عنا",
  description: "تعرف على ZERIV TECH — وكالة رقمية فلسطينية متخصصة في تطوير المواقع والتطبيقات والتصميم.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHeader
        label="عن ZERIV TECH"
        title="تقنية حديثة بروح فلسطينية"
        description="وكالة فلسطينية نبني مواقع وتطبيقات وحلول رقمية — باسم مستوحى من التراث، وعمل يصل لكل المجالات."
      />
      <AboutSection fullPage />
      <ZarifSection />
      <ProcessSection />
      <CTASection />
    </PageTransition>
  );
}
