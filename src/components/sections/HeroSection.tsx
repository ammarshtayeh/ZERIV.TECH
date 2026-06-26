"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { HeroVisual } from "@/components/brand/HeroVisual";
import { Container, SectionShell } from "@/components/layout/SectionShell";
import { TatreezBorder } from "@/components/patterns/Patterns";

const heroStats = [
  { value: "50+", label: "مشروع منجز" },
  { value: "5", label: "مجالات خدمة" },
  { value: "100%", label: "التزام بالجودة" },
];

export function HeroSection() {
  return (
    <SectionShell variant="hero" className="relative min-h-[92vh] pt-[4.25rem]">
      <Container className="relative flex min-h-[calc(92vh-4.25rem)] flex-col justify-center py-14 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero-eyebrow mb-6">وكالة رقمية فلسطينية</p>

            <h1 className="hero-headline text-zeriv-fg">
              نحوّل <span className="text-zeriv-red">الأفكار</span>
              <br />
              إلى تجارب رقمية
              <br />
              <span className="text-zeriv-muted font-light">تستحق أن تُرى.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base font-light leading-[1.9] text-zeriv-muted sm:text-lg">
              مواقع، تطبيقات، وهويات بصرية — نبنيها بمعايير عالمية،
              بروح فلسطينية أصيلة في كل تفصيلة.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                ابدأ مشروعك
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/portfolio" className="btn-outline">
                أعمالنا
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap items-stretch divide-x divide-x-reverse divide-zeriv-border border-y border-zeriv-border">
              {heroStats.map((s) => (
                <div key={s.label} className="stat-card min-w-[7rem] flex-1 py-5">
                  <div className="font-display text-2xl font-semibold text-zeriv-fg sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-zeriv-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="relative flex justify-center lg:justify-end"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </Container>

      <TatreezBorder thick className="absolute inset-x-0 bottom-0" />
    </SectionShell>
  );
}

