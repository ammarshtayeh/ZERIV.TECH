"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container, SectionShell } from "@/components/layout/SectionShell";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  DiamondSeparator,
  TatreezBorder,
  FlagStripe,
} from "@/components/patterns/Patterns";

const heroStats = [
  { value: "50+", label: "مشروع منجز", border: "border-t-zeriv-red", color: "text-zeriv-red" },
  { value: "5", label: "مجالات خدمة", border: "border-t-zeriv-green", color: "text-zeriv-green" },
  { value: "100%", label: "التزام بالجودة", border: "border-t-zeriv-black", color: "text-zeriv-fg" },
];

export function HeroSection() {
  return (
    <SectionShell variant="hero" className="relative min-h-screen pt-[4.25rem]">
      <HeritageBackdrop variant="hero" />
      <div className="circuit-grid absolute inset-0 opacity-60" />

      <div className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[640px] -translate-x-1/2 rounded-full bg-zeriv-red/[0.05] blur-[110px] dark:bg-zeriv-red/[0.08]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-zeriv-green/[0.06] blur-[90px] dark:bg-zeriv-green/[0.08]" />

      <Container className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center py-16">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zeriv-border bg-zeriv-surface px-4 py-2 text-[10px] font-bold tracking-[0.15em] sm:text-[11px]">
              <span className="text-zeriv-red">كُود</span>
              <DiamondSeparator className="text-zeriv-black dark:text-zeriv-white" />
              <span className="text-zeriv-black dark:text-zeriv-white">تصميم</span>
              <DiamondSeparator className="text-zeriv-green" />
              <span className="text-zeriv-green">هوية</span>
            </div>

            <p className="font-heritage mb-3 text-sm text-zeriv-red sm:text-base">
              وكالة رقمية فلسطينية — مواقع، تطبيقات، وحلول برمجية
            </p>

            <h1 className="font-display text-[1.9rem] font-extrabold leading-[1.3] sm:text-5xl lg:text-[3.15rem] lg:leading-[1.18]">
              <span className="text-zeriv-fg">نحوّل </span>
              <span className="text-zeriv-red">الأفكار</span>
              <span className="text-zeriv-fg"> إلى</span>
              <br />
              <span className="text-gradient-heritage">تجارب رقمية</span>
              <br />
              <span className="text-zeriv-muted">تستحق أن تُرى.</span>
            </h1>

            <div className="mt-5 max-w-md">
              <FlagStripe />
            </div>

            <p className="mt-6 max-w-lg text-[15px] leading-[1.95] text-zeriv-muted sm:text-base">
              في <strong className="text-zeriv-red">ZERIV</strong> نجمع بين
              التصميم والبرمجة والاستراتيجية لنبني مواقع وتطبيقات ومنصات
              رقمية — بمعايير عالية، بروح فلسطينية أصيلة.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                ابدأ مشروعك
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/portfolio" className="btn-outline">
                استكشف أعمالنا
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {heroStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`stat-card border-t-2 ${s.border}`}
                >
                  <div className={`font-display text-xl font-bold sm:text-2xl ${s.color}`}>
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] text-zeriv-muted sm:text-xs">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[min(100%,360px)]">
              <TatreezBorder thick className="rounded-t-xl" />
              <motion.div
                className="flex justify-center px-2 py-4 sm:px-4 sm:py-6"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Logo size="hero" variant="framed" className="pointer-events-none" priority />
              </motion.div>
              <TatreezBorder thick className="rounded-b-xl" />
            </div>
          </motion.div>
        </div>
      </Container>

      <TatreezBorder thick className="absolute inset-x-0 bottom-0" />
    </SectionShell>
  );
}
