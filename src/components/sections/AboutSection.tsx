"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import {
  Container,
  SectionShell,
} from "@/components/layout/SectionShell";

export function AboutSection({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <SectionShell id="about" variant="default" className="py-24 sm:py-36 relative">
      {/* Subtle gold radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)]" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-20 sm:mb-28 text-right">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">فلسفتنا</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-zeriv-fg">
              الهوية الرقمية <span className="text-[#D4AF37]">كفن برمجيات</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/35 font-light">
              لا نقوم بمجرد بناء مواقع الكترونية. إننا نهندس هويات رقمية متميزة وفريدة من نوعها، تجمع بين عمق تراثنا الفلسطيني وأحدث تقنيات التصميم والتطوير البرمجي.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Column Luxury Spec Cards */}
        <div className="grid gap-8 md:grid-cols-3 mt-8 items-stretch">
          
          {/* Column 1: Arch Geometry */}
          <ScrollReveal delay={0.05}>
            <div className="relative h-full rounded-2xl border border-white/[0.06] bg-[#0f0f0f] p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#D4AF37]/20">
              <div>
                <div className="flex items-center justify-between flex-row-reverse border-b border-white/[0.06] pb-4 mb-6">
                  <span className="text-[10px] tracking-wider font-semibold text-[#D4AF37]/60">01 / التناسب</span>
                  <h3 className="font-display text-lg font-bold text-zeriv-fg">التناغم والتناسب</h3>
                </div>

                {/* Minimal Arch Diagram */}
                <div className="h-36 w-full bg-black/40 rounded-xl flex items-center justify-center border border-white/[0.04] relative overflow-hidden">
                  <svg className="h-28 w-28 opacity-60" viewBox="0 0 100 100" fill="none">
                    {/* Outer elegant arch */}
                    <motion.path 
                      d="M 25 85 V 45 A 25 25 0 0 1 75 45 V 85" 
                      stroke="#D4AF37" 
                      strokeWidth="1" 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.path 
                      d="M 15 85 V 45 A 35 35 0 0 1 85 45 V 85" 
                      stroke="rgba(212, 175, 55, 0.2)" 
                      strokeWidth="0.5" 
                      strokeDasharray="2 2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
                    />
                    {/* Golden proportional lines */}
                    <line x1="50" y1="45" x2="75" y2="45" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
                    <circle cx="50" cy="45" r="1.5" fill="#D4AF37" />
                    <circle cx="50" cy="85" r="1" fill="#D4AF37" opacity="0.3" />
                    {/* Vertical axis line */}
                    <line x1="50" y1="15" x2="50" y2="85" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                  </svg>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-white/35 text-right font-light" dir="rtl">
                  الهندسة البصرية لمشروعك ليست عشوائية. نستوحي من تفاصيل أقواس فلسطين المعمارية لنبني واجهات متوازنة هندسياً، مريحة للعين، وتترك انطباعاً فورياً بالفخامة والاحترافية.
                </p>
              </div>
              <div className="mt-8 border-t border-white/[0.04] pt-4 text-left">
                <span className="text-[9px] tracking-wider text-white/20 uppercase">Proportion & Harmony</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Column 2: Olive Growth system */}
          <ScrollReveal delay={0.1}>
            <div className="relative h-full rounded-2xl border border-white/[0.06] bg-[#0f0f0f] p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#D4AF37]/20">
              <div>
                <div className="flex items-center justify-between flex-row-reverse border-b border-white/[0.06] pb-4 mb-6">
                  <span className="text-[10px] tracking-wider font-semibold text-[#D4AF37]/60">02 / الصمود</span>
                  <h3 className="font-display text-lg font-bold text-zeriv-fg">النمو والصمود</h3>
                </div>

                {/* Minimal Branching Diagram */}
                <div className="h-36 w-full bg-black/40 rounded-xl flex items-center justify-center border border-white/[0.04] relative overflow-hidden">
                  <svg className="h-28 w-28 opacity-60" viewBox="0 0 100 100" fill="none">
                    {/* Growth curve */}
                    <motion.path 
                      d="M 15 80 Q 45 70 85 25" 
                      stroke="rgba(212, 175, 55, 0.15)" 
                      strokeWidth="1" 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    {/* Elegantly placed leaves */}
                    <motion.path 
                      d="M 38 72 C 32 64 42 58 48 68" 
                      fill="rgba(212, 175, 55, 0.08)" 
                      stroke="#D4AF37" 
                      strokeWidth="0.8" 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                    <motion.path 
                      d="M 58 58 C 52 48 62 42 68 52" 
                      fill="rgba(212, 175, 55, 0.08)" 
                      stroke="#D4AF37" 
                      strokeWidth="0.8" 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    />
                    {/* Branch terminal point */}
                    <circle cx="85" cy="25" r="2" fill="#D4AF37" />
                  </svg>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-white/35 text-right font-light" dir="rtl">
                  تماماً كشجر الزيتون في جذوره وتفرعه، نبني بنية برمجية متماسكة ومرنة. حلولنا البرمجية مصممة للنمو مع علامتك التجارية وتتحمل ضغط الزوار بمرونة وأداء فائق السرعة.
                </p>
              </div>
              <div className="mt-8 border-t border-white/[0.04] pt-4 text-left">
                <span className="text-[9px] tracking-wider text-white/20 uppercase">Growth & Performance</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Column 3: Tatreez Mathematics */}
          <ScrollReveal delay={0.15}>
            <div className="relative h-full rounded-2xl border border-white/[0.06] bg-[#0f0f0f] p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#D4AF37]/20">
              <div>
                <div className="flex items-center justify-between flex-row-reverse border-b border-white/[0.06] pb-4 mb-6">
                  <span className="text-[10px] tracking-wider font-semibold text-[#D4AF37]/60">03 / الصنعة</span>
                  <h3 className="font-display text-lg font-bold text-zeriv-fg">التفاصيل والصنعة</h3>
                </div>

                {/* Minimal Grid & Cross Stitch */}
                <div className="h-36 w-full bg-black/40 rounded-xl flex items-center justify-center border border-white/[0.04] relative overflow-hidden">
                  <svg className="h-28 w-28 opacity-60" viewBox="0 0 100 100" fill="none">
                    {/* Minimal Grid */}
                    <path d="M 0 30 H 100 M 0 50 H 100 M 0 70 H 100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    <path d="M 30 0 V 100 M 50 0 V 100 M 70 0 V 100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    {/* Center Stitch */}
                    <motion.path 
                      d="M 42 42 L 58 58 M 58 42 L 42 58" 
                      stroke="#D4AF37" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <motion.path 
                      d="M 22 22 L 38 38 M 38 22 L 22 38" 
                      stroke="rgba(212, 175, 55, 0.4)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                    <motion.path 
                      d="M 62 62 L 78 78 M 78 62 L 62 78" 
                      stroke="rgba(212, 175, 55, 0.4)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.9 }}
                    />
                  </svg>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-white/35 text-right font-light" dir="rtl">
                  نهتم بكل بكسل وكل سطر برمجيات كما نهتم بغرز التطريز الفلسطيني. تصميم وتطوير فريد بالكامل، لا نعتمد على القوالب الجاهزة بل نصنع هويتك الرقمية خصيصاً لك لتتميز.
                </p>
              </div>
              <div className="mt-8 border-t border-white/[0.04] pt-4 text-left">
                <span className="text-[9px] tracking-wider text-white/20 uppercase">Craft & Detail</span>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {fullPage && (
          <ScrollReveal className="mt-16 text-center">
            <div className="inline-flex flex-col items-center max-w-xl mx-auto rounded-2xl border border-white/[0.06] bg-[#0f0f0f]/30 p-8 sm:p-10 backdrop-blur-sm">
              <h4 className="font-display text-lg font-bold text-zeriv-fg mb-4">هندسة تفوق المألوف</h4>
              <p className="text-xs text-white/35 leading-relaxed mb-8 font-light">
                فريقنا المكون من مصممي واجهات ومنتجات ومهندسي برمجيات يمتلك هدفاً واحداً: تشييد وتصميم منصات رقمية فائقة الخصوصية تلائم تماماً طموحك، بمعايير تقنية رائدة وجودة متناهية.
              </p>
              <Link 
                href="/contact" 
                className="group inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-[#E5C148] hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
              >
                ابدأ مشروعك معنا
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </SectionShell>
  );
}
