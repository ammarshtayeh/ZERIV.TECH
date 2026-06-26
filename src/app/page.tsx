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
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <PageTransition>
          <HeroSection />
          {/* Gold divider line */}
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
          </div>
          <ServicesSection />
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent" />
          </div>
          <PortfolioSection />
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          </div>
          <ProcessSection />
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent" />
          </div>
          <ZarifSection />
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          </div>
          <HeritageSection />
          <CTASection />
        </PageTransition>
      </motion.div>
    </>
  );
}
