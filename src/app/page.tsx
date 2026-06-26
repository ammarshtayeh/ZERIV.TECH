"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/effects/PageTransition";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ZarifSection } from "@/components/sections/ZarifSection";
import { HeritageSection } from "@/components/sections/HeritageSection";
import { CTASection } from "@/components/sections/CTASection";
import { IntroConstruction } from "@/components/effects/IntroConstruction";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  return (
    <>
      <IntroConstruction onComplete={() => setShowIntro(false)} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <PageTransition>
          <HeroSection />
          <ServicesSection />
          <PortfolioSection />
          <ProcessSection />
          <ZarifSection />
          <HeritageSection />
          <CTASection />
        </PageTransition>
      </motion.div>
    </>
  );
}
