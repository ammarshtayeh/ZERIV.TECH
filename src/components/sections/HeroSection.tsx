"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Container, SectionShell } from "@/components/layout/SectionShell";

export function HeroSection() {
  return (
    <SectionShell variant="hero" className="relative min-h-screen pt-[4.25rem]">
      {/* Subtle gold radial glow at top */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
      </div>
      
      <Container className="relative flex min-h-[calc(100vh-4.25rem)] flex-col items-center justify-center text-center py-20">
        {/* Logo mark - small, centered above headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <Image 
            src="/brand/logo.png"
            alt="ZERIV TECH"
            width={80}
            height={80}
            className="mx-auto opacity-70"
          />
        </motion.div>

        {/* Main headline - massive, elegant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight">
            <span className="text-[#D4AF37]">نصمم.</span>
            <br />
            <span className="text-zeriv-fg">نبرمج.</span>
            <br />
            <span className="text-zeriv-fg/40">نرتقي.</span>
          </h1>
        </motion.div>

        {/* Supporting text - one line only */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-lg text-base font-light leading-relaxed text-zeriv-fg/50"
        >
          نبني تجارب رقمية استثنائية — بأناقة مستوحاة من تراثنا الفلسطيني.
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-8 py-4 text-sm font-semibold text-[#D4AF37] transition-all duration-500 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
          >
            ابدأ مشروعك
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-zeriv-fg/20">اكتشف المزيد</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="h-8 w-[1px] bg-gradient-to-b from-[#D4AF37]/40 to-transparent"
            />
          </div>
        </motion.div>
      </Container>
    </SectionShell>
  );
}
