"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { HeroVisual } from "@/components/brand/HeroVisual";
import { Container, SectionShell } from "@/components/layout/SectionShell";

export function HeroSection() {
  return (
    <SectionShell variant="hero" className="relative min-h-screen pt-[4.25rem] flex items-center">
      {/* Subtle red and green radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,122,61,0.06)_0%,transparent_70%)]" />
        <div className="absolute top-0 right-1/3 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(206,17,38,0.06)_0%,transparent_70%)]" />
      </div>
      
      <Container className="relative z-10 py-16 w-full">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center text-right">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center items-end"
          >
            {/* Headline */}
            <h1 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[1.15] tracking-tight">
              <span className="text-[#007a3d]">هندسة برمجية</span>
              <br />
              <span className="text-[#ce1126]">بمعايير فائقة.</span>
            </h1>

            {/* Supporting text */}
            <p className="mt-6 max-w-xl text-base sm:text-lg font-light leading-relaxed text-zeriv-fg-muted">
              نبني منصات رقمية وحلولاً متكاملة — بأناقة مستوحاة من تفاصيل تراثنا الفلسطيني العريق.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#ce1126] px-8 py-4 text-sm font-semibold text-white transition-all duration-500 hover:bg-[#9d0c1b] hover:shadow-[0_0_40px_rgba(206,17,38,0.35)]"
              >
                ابدأ مشروعك
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Visual Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </Container>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.2em] uppercase text-zeriv-fg/30">اكتشف المزيد</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-8 w-[1px] bg-gradient-to-b from-[#ce1126] to-transparent"
          />
        </div>
      </motion.div>
    </SectionShell>
  );
}
