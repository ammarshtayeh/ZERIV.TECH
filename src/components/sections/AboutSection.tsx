"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  Container,
  SectionShell,
  SectionHeader,
} from "@/components/layout/SectionShell";

// Spec cards detailing the engineering formulas of Palestinian inspiration
export function AboutSection({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <SectionShell id="about" variant="elevated" divider className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 opacity-[0.12] blueprint-grid pointer-events-none" />
      <HeritageBackdrop />
      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            number={fullPage ? undefined : "03"}
            label="مواصفات الاستوديو"
            title={
              <>
                الهندسة الكامنة <span className="text-zeriv-red">في الهوية</span>
              </>
            }
            description="نترجم الهوية الفلسطينية إلى رياضيات وتصميم برمجيات. لا نضع زينة عشوائية؛ بل نهندس البنى التحتية."
          />
        </ScrollReveal>

        {/* 3-Column Engineering Spec Sheet */}
        <div className="grid gap-6 md:grid-cols-3 mt-8 items-stretch">
          
          {/* Column 1: Arch Geometry */}
          <ScrollReveal delay={0.05}>
            <div className="relative h-full rounded-xl border border-zeriv-border bg-[#0f1411]/50 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between flex-row-reverse border-b border-zeriv-border pb-3 mb-4">
                  <span className="text-[10px] font-mono text-zeriv-red">SYS: [ARCH_GEOM_01]</span>
                  <h3 className="font-display text-base font-bold text-zeriv-offwhite">رياضيات الأقواس الحجرية</h3>
                </div>

                {/* SVG Arch Construction Diagram */}
                <div className="h-32 w-full bg-black/40 rounded-lg flex items-center justify-center border border-zeriv-border/50 relative overflow-hidden">
                  <svg className="h-28 w-28 opacity-80" viewBox="0 0 100 100" fill="none">
                    {/* Arch lines */}
                    <path d="M 20 90 V 50 A 30 30 0 0 1 80 50 V 90" stroke="#bfa26a" strokeWidth="1.5" />
                    <path d="M 10 90 V 50 A 40 40 0 0 1 90 50 V 90" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
                    {/* Measurement arrows */}
                    <line x1="50" y1="50" x2="80" y2="50" stroke="#ce1126" strokeWidth="0.8" />
                    <circle cx="50" cy="50" r="1.5" fill="#ce1126" />
                    {/* Text specs in SVG */}
                    <text x="58" y="45" fill="#ce1126" fontSize="6" fontFamily="monospace">R=30px</text>
                    <text x="35" y="70" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="monospace">θ = 180°</text>
                    {/* Center axis */}
                    <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="4 4" />
                  </svg>
                </div>

                {/* Spec List */}
                <ul className="mt-4 space-y-2 text-right text-xs" dir="rtl">
                  <li className="flex items-center gap-2 text-zeriv-muted">
                    <span className="text-[#bfa26a] font-mono">[01]</span>
                    <span>تحديد زاوية انحناء القوس التقليدي (180 درجة كاملة).</span>
                  </li>
                  <li className="flex items-center gap-2 text-zeriv-muted">
                    <span className="text-[#bfa26a] font-mono">[02]</span>
                    <span>تحقيق نسبة التماثل الثنائي لتأمين توازن توزيع العناصر الرقمية.</span>
                  </li>
                  <li className="flex items-center gap-2 text-zeriv-muted">
                    <span className="text-[#bfa26a] font-mono">[03]</span>
                    <span>اعتماد أقواس النوافذ في هيكلة الإطارات والشعار.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-zeriv-border/50 pt-3 text-left">
                <span className="text-[9px] font-mono text-zeriv-muted">T_LOCK: 180 DEG // SYMMETRIC</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Column 2: Olive Growth system */}
          <ScrollReveal delay={0.1}>
            <div className="relative h-full rounded-xl border border-zeriv-border bg-[#0f1411]/50 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between flex-row-reverse border-b border-zeriv-border pb-3 mb-4">
                  <span className="text-[10px] font-mono text-zeriv-green-light">SYS: [GROWTH_SYS_02]</span>
                  <h3 className="font-display text-base font-bold text-zeriv-offwhite">نظام النمو والتدفق</h3>
                </div>

                {/* SVG Olive Fractal Diagram */}
                <div className="h-32 w-full bg-black/40 rounded-lg flex items-center justify-center border border-zeriv-border/50 relative overflow-hidden">
                  <svg className="h-28 w-28 opacity-80" viewBox="0 0 100 100" fill="none">
                    {/* Branch line */}
                    <path d="M 10 80 Q 40 70 90 20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    {/* Leaves constructed parameterically */}
                    <path d="M 30 73 C 25 65 35 60 40 70" fill="rgba(0, 122, 61, 0.4)" stroke="#007a3d" strokeWidth="0.8" />
                    <path d="M 50 60 C 45 50 55 45 60 55" fill="rgba(0, 122, 61, 0.4)" stroke="#007a3d" strokeWidth="0.8" />
                    <path d="M 70 42 C 65 32 75 27 80 37" fill="rgba(0, 122, 61, 0.4)" stroke="#007a3d" strokeWidth="0.8" />
                    {/* Vector coordinates */}
                    <line x1="30" y1="73" x2="35" y2="60" stroke="#ce1126" strokeWidth="0.5" />
                    <circle cx="35" cy="60" r="1" fill="#ce1126" />
                    <text x="38" y="60" fill="#ce1126" fontSize="5" fontFamily="monospace">dy/dx</text>
                  </svg>
                </div>

                {/* Spec List */}
                <ul className="mt-4 space-y-2 text-right text-xs" dir="rtl">
                  <li className="flex items-center gap-2 text-zeriv-muted">
                    <span className="text-zeriv-green-light font-mono">[01]</span>
                    <span>مستوحى من صمود شجر الزيتون وقدرته الهيكلية على التكيف.</span>
                  </li>
                  <li className="flex items-center gap-2 text-zeriv-muted">
                    <span className="text-zeriv-green-light font-mono">[02]</span>
                    <span>برمجة تدفق البيانات بشكل تفريعي (Tree / Branch) منظم.</span>
                  </li>
                  <li className="flex items-center gap-2 text-zeriv-muted">
                    <span className="text-zeriv-green-light font-mono">[03]</span>
                    <span>توفير أداء مرن وسريع وقابل للتطوير تحت أحمال المرور العالية.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-zeriv-border/50 pt-3 text-left">
                <span className="text-[9px] font-mono text-zeriv-muted">FRACTAL_BRANCHING: true // HIGH_AVAIL</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Column 3: Tatreez Mathematics */}
          <ScrollReveal delay={0.15}>
            <div className="relative h-full rounded-xl border border-zeriv-border bg-[#0f1411]/50 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between flex-row-reverse border-b border-zeriv-border pb-3 mb-4">
                  <span className="text-[10px] font-mono text-[#bfa26a]">SYS: [TATREEZ_GRID_03]</span>
                  <h3 className="font-display text-base font-bold text-zeriv-offwhite">رياضيات شبكة التطريز</h3>
                </div>

                {/* SVG Tatreez grid geometry */}
                <div className="h-32 w-full bg-black/40 rounded-lg flex items-center justify-center border border-zeriv-border/50 relative overflow-hidden">
                  <svg className="h-28 w-28 opacity-80" viewBox="0 0 100 100" fill="none">
                    {/* Grid lines */}
                    <path d="M 0 20 H 100 M 0 40 H 100 M 0 60 H 100 M 0 80 H 100" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                    <path d="M 20 0 V 100 M 40 0 V 100 M 60 0 V 100 M 80 0 V 100" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                    {/* Stitches */}
                    <path d="M 42 42 L 58 58 M 58 42 L 42 58" stroke="#ce1126" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 22 22 L 38 38 M 38 22 L 22 38" stroke="#007a3d" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 62 62 L 78 78 M 78 62 L 62 78" stroke="#bfa26a" strokeWidth="2" strokeLinecap="round" />
                    {/* Measurement info */}
                    <rect x="40" y="40" width="20" height="20" stroke="#bfa26a" strokeWidth="0.8" strokeDasharray="2 2" />
                    <text x="43" y="36" fill="#bfa26a" fontSize="6" fontFamily="monospace">8px</text>
                  </svg>
                </div>

                {/* Spec List */}
                <ul className="mt-4 space-y-2 text-right text-xs" dir="rtl">
                  <li className="flex items-center gap-2 text-zeriv-muted">
                    <span className="text-[#bfa26a] font-mono">[01]</span>
                    <span>الغرزة المتقاطعة (X-Stitch) هي العنصر الشبكي الأساسي للنظام.</span>
                  </li>
                  <li className="flex items-center gap-2 text-zeriv-muted">
                    <span className="text-[#bfa26a] font-mono">[02]</span>
                    <span>الالتزام التام بنظام المسافات الكوني (8px Spacing Grid) في التصميم.</span>
                  </li>
                  <li className="flex items-center gap-2 text-zeriv-muted">
                    <span className="text-[#bfa26a] font-mono">[03]</span>
                    <span>تخطي القوالب المستهلكة نحو تشكيلات رياضية كنعانية دقيقة.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-zeriv-border/50 pt-3 text-left">
                <span className="text-[9px] font-mono text-zeriv-muted">UNIT_SIZE: 8PX // GRID_ALIGN: true</span>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {fullPage && (
          <ScrollReveal className="mt-12 text-center">
            <div className="inline-flex flex-col items-center max-w-xl mx-auto rounded-xl border border-zeriv-border bg-[#0f1411]/30 p-6 sm:p-8 backdrop-blur-sm">
              <h4 className="font-display text-lg font-bold text-zeriv-offwhite mb-3">هندسة تفوق المألوف</h4>
              <p className="text-xs text-zeriv-muted leading-relaxed mb-6 font-light">
                فريقنا المكون من مصممي واجهات ومنتجات ومهندسي برمجيات يمتلك هدفاً واحداً: تشييد وتصميم منصات رقمية فائقة الخصوصية تلائم تماماً طموحك، بمعايير تقنية رائدة.
              </p>
              <Link href="/contact" className="btn-primary">
                ابدأ تشييد مشروعك معنا
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </SectionShell>
  );
}
