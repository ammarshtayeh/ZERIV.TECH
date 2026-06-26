"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Container, SectionShell } from "@/components/layout/SectionShell";

export function HeroSection() {
  return (
    <SectionShell variant="hero" className="relative min-h-screen pt-[4.25rem]">
      {/* Subtle red and green radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,122,61,0.06)_0%,transparent_70%)]" />
        <div className="absolute top-0 right-1/3 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(206,17,38,0.06)_0%,transparent_70%)]" />
      </div>
      
      <Container className="relative flex min-h-[calc(100vh-4.25rem)] flex-col items-center justify-center text-center py-16">
        {/* Logo mark - large, centered above headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <Image 
            src="/brand/logo.png"
            alt="ZERIV TECH"
            width={240}
            height={240}
            className="mx-auto drop-shadow-[0_0_30px_rgba(206,17,38,0.15)]"
            priority
          />
        </motion.div>

        {/* Main headline - massive, elegant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.1] tracking-tight">
            <span className="text-[#007a3d]">نصمم.</span>
            <br />
            <span className="text-[#ce1126]">نبرمج.</span>
            <br />
            <span className="text-white">نرتقي.</span>
          </h1>
        </motion.div>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-lg text-base font-light leading-relaxed text-white/60"
        >
          نبني تجارب رقمية استثنائية — بأناقة مستوحاة من تراثنا الفلسطيني العريق.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-[#ce1126] px-8 py-4 text-sm font-semibold text-white transition-all duration-500 hover:bg-[#9d0c1b] hover:shadow-[0_0_40px_rgba(206,17,38,0.35)]"
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
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">اكتشف المزيد</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="h-8 w-[1px] bg-gradient-to-b from-[#ce1126] to-transparent"
            />
          </div>
        </motion.div>
      </Container>
    </SectionShell>
  );
}
