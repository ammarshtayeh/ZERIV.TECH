import type { Metadata } from "next";
import { PageTransition } from "@/components/effects/PageTransition";
import { PageHeader } from "@/components/layout/PageHeader";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "أعمالنا",
  description: "معرض أعمال ZERIV TECH — مشاريع برمجية وتصميمية في تطوير المواقع، التطبيقات، الهوية البصرية، وUI/UX.",
};

export default function PortfolioPage() {
  return (
    <PageTransition>
      <PageHeader
        label="أعمالنا"
        title="مشاريع نفتخر بها"
        description="مواقع، تطبيقات، متاجر، ومنصات — مشاريع برمجية وتصميمية نفّذناها لعملائنا."
      />
      <PortfolioSection showAll />
      <CTASection />
    </PageTransition>
  );
}
