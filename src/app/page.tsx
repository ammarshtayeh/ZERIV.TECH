"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/effects/PageTransition";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ZarifSection } from "@/components/sections/ZarifSection";
import { CTASection } from "@/components/sections/CTASection";
import { IntroConstruction } from "@/components/effects/IntroConstruction";
import { TatreezBorder } from "@/components/patterns/Patterns";

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
          
          <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-16">
            <TatreezBorder className="opacity-20" />
          </div>
          
          <ServicesSection />
          
          <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-16">
            <TatreezBorder className="opacity-20" />
          </div>
          
          <PortfolioSection />
          
          <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-16">
            <TatreezBorder className="opacity-20" />
          </div>
          
          <ProcessSection />
          
          <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-16">
            <TatreezBorder className="opacity-20" />
          </div>
          
          <ZarifSection />
          
          <CTASection />
        </PageTransition>
      </motion.div>
    </>
  );
}
