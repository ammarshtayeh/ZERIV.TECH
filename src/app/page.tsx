import { PageTransition } from "@/components/effects/PageTransition";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ZarifSection } from "@/components/sections/ZarifSection";
import { HeritageSection } from "@/components/sections/HeritageSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <ZarifSection />
      <HeritageSection />
      <CTASection />
    </PageTransition>
  );
}
