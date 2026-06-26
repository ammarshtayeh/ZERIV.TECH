"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Cpu, Activity, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  Container,
  SectionShell,
  SectionHeader,
} from "@/components/layout/SectionShell";
import { cn } from "@/lib/utils";

// Specs and parameters for the "motherboard snaps"
interface ServiceSpec {
  id: string;
  title: string;
  category: string;
  code: string;
  specs: string[];
  performance: string;
  accessibility: string;
  seo: string;
  description: string;
}

const SERVICE_SPECS: ServiceSpec[] = [
  {
    id: "web-dev",
    title: "تطوير المواقع والتطبيقات",
    category: "تطوير",
    code: "0xFA78",
    specs: ["React & Next.js 15", "TypeScript & Node.js", "Supabase & PostgreSQL", "Framer Motion & GSAP"],
    performance: "99%",
    accessibility: "100%",
    seo: "100%",
    description: "نبني منصات ومواقع فائقة السرعة والأداء. نكتب كوداً نظيفاً وقابلاً للتوسع لضمان صمود ونمو منتجك الرقمي في السوق العالمي.",
  },
  {
    id: "uiux",
    title: "تصميم واجهات UI/UX",
    category: "تجربة",
    code: "0xC3E1",
    specs: ["Figma Design Systems", "Interactive Prototyping", "User Journey Mapping", "Usability Testing"],
    performance: "98%",
    accessibility: "100%",
    seo: "95%",
    description: "نصمم رحلات مستخدم مريحة وواجهات عصرية فائقة الجمال توازن بدقة متناهية بين احتياجات العمل وتجربة الزائر.",
  },
  {
    id: "branding",
    title: "الهوية البصرية",
    category: "هوية",
    code: "0xDE90",
    specs: ["Brand Strategy & Positioning", "Grid Logo Systems", "Brand Style Guides", "Typography Systems"],
    performance: "100%",
    accessibility: "98%",
    seo: "96%",
    description: "نصنع هويات متكاملة متجذرة في المفاهيم العميقة. نترجم قصة عملك ورؤيتك إلى شعار وألوان وتفاصيل بصرية لا تُنسى.",
  },
  {
    id: "graphic",
    title: "التصميم الجرافيكي",
    category: "تصميم",
    code: "0xB4C2",
    specs: ["Vector Illustration", "Editorial Layouts", "Typography Art", "Social Media Guidelines"],
    performance: "95%",
    accessibility: "99%",
    seo: "97%",
    description: "نصمم منشورات ومطبوعات وحملات إبداعية مخصصة تبرز علامتك التجارية وسط الضوضاء الرقمية بشكل فريد وذكي.",
  },
  {
    id: "consulting",
    title: "حلول واستشارات رقمية",
    category: "استشارات",
    code: "0x889F",
    specs: ["Technical Feasibility Audits", "Performance Optimization", "Architecture Mapping", "AI Integration"],
    performance: "99%",
    accessibility: "99%",
    seo: "99%",
    description: "نقدم استشارات معمقة لمشروعك البرمجي، ونساعدك في وضع خطة البناء التقنية وتكامل الذكاء الاصطناعي لتأمين مستقبله.",
  },
];

export function ServicesSection({ showAll = false }: { showAll?: boolean }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = SERVICE_SPECS[activeIdx];

  return (
    <SectionShell id="services" variant="elevated" divider className="py-20 sm:py-28 relative overflow-hidden">
      {/* Blueprint Grid background */}
      <div className="absolute inset-0 opacity-[0.22] blueprint-grid pointer-events-none" />
      <HeritageBackdrop />
      <Container className="relative z-10">
        
        <ScrollReveal>
          <SectionHeader
            number="01"
            label="حلولنا الرقمية"
            title={
              <>
                هندسة برمجية <span className="text-zeriv-red">بمعايير فائقة</span>
              </>
            }
            description="نحن لا نصنع قوالب ومواقع عامة. نحن نهندس أنظمة رقمية متكاملة لعلامات تجارية تطمح للقمة."
          />
        </ScrollReveal>

        {/* Engineering Workspace Motherboard Panel */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-stretch">
          
          {/* Left Column: snap modules */}
          <div className="flex flex-col gap-3 justify-center">
            {SERVICE_SPECS.map((s, idx) => {
              const isActive = activeIdx === idx;
              return (
                <ScrollReveal key={s.id} delay={idx * 0.05}>
                  <div
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className={cn(
                      "relative flex items-center justify-between p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer select-none group overflow-hidden",
                      isActive
                        ? "border-zeriv-red bg-zeriv-red/[0.04] shadow-lg shadow-zeriv-red/5"
                        : "border-zeriv-border bg-zeriv-surface/40 hover:border-white/20 hover:bg-zeriv-surface/80"
                    )}
                  >
                    {/* Decorative corner ticks for active module */}
                    {isActive && (
                      <>
                        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zeriv-red" />
                        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zeriv-red" />
                        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zeriv-red" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zeriv-red" />
                      </>
                    )}

                    <div className="flex items-center gap-4 flex-row-reverse text-right">
                      {/* Active Indicator Led */}
                      <span className={cn(
                        "h-2 w-2 rounded-full transition-all duration-300",
                        isActive ? "bg-zeriv-red scale-125 animate-pulse" : "bg-white/10"
                      )} />
                      
                      <div>
                        <span className="text-[10px] font-mono text-zeriv-muted">
                          {s.category} {"//"} {s.code}
                        </span>
                        <h3 className={cn(
                          "font-display text-sm sm:text-base font-bold transition-colors mt-0.5",
                          isActive ? "text-zeriv-red" : "text-zeriv-offwhite group-hover:text-white"
                        )}>
                          {s.title}
                        </h3>
                      </div>
                    </div>

                    <span className={cn(
                      "font-mono text-xs transition-colors",
                      isActive ? "text-zeriv-red" : "text-zeriv-muted"
                    )}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right Column: Motherboard Central Processing Core */}
          <ScrollReveal delay={0.1}>
            <div className="relative h-full rounded-2xl border border-zeriv-border bg-[#0f1411]/80 p-6 sm:p-8 backdrop-blur-md overflow-hidden flex flex-col justify-between">
              
              {/* Corner crosshairs */}
              <span className="absolute top-3 left-3 text-xs font-mono text-zeriv-muted/30">+</span>
              <span className="absolute top-3 right-3 text-xs font-mono text-zeriv-muted/30">+</span>
              <span className="absolute bottom-3 left-3 text-xs font-mono text-zeriv-muted/30">+</span>
              <span className="absolute bottom-3 right-3 text-xs font-mono text-zeriv-muted/30">+</span>

              <div className="absolute top-6 left-6 opacity-[0.03] pointer-events-none">
                <Cpu className="h-44 w-44" strokeWidth={1} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-right flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-zeriv-border pb-4 flex-row-reverse">
                      <div className="flex items-center gap-2 flex-row-reverse">
                        <Cpu className="h-5 w-5 text-[#bfa26a]" />
                        <span className="text-sm font-bold text-[#bfa26a] tracking-wider font-mono">
                           {activeService.code} {"// MODULE_CORE"}
                        </span>
                      </div>
                      <span className="rounded bg-zeriv-green/10 border border-zeriv-green/20 px-2.5 py-0.5 text-[10px] font-mono text-zeriv-green-light flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-zeriv-green-light animate-ping" />
                        OPERATIONAL
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-5">
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-zeriv-offwhite">
                        {activeService.title}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-zeriv-muted font-light">
                        {activeService.description}
                      </p>
                    </div>

                    {/* Hard-Snaps: Technology/Parameters sub-grid */}
                    <div className="mt-6">
                      <h5 className="text-[10px] font-mono text-[#bfa26a] tracking-wider mb-3">
                        [COMPONENT_STRUCTURE]
                      </h5>
                      <div className="grid gap-2 grid-cols-2">
                        {activeService.specs.map((spec) => (
                          <div
                            key={spec}
                            className="flex items-center gap-2 border border-zeriv-border/50 bg-black/30 p-2.5 rounded-lg flex-row-reverse text-right text-xs"
                          >
                            <Zap className="h-3.5 w-3.5 text-zeriv-red shrink-0" />
                            <span className="text-zeriv-offwhite/85 font-mono truncate">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Diagnostic stats section */}
                  <div className="mt-8 border-t border-zeriv-border pt-4">
                    <h5 className="text-[10px] font-mono text-zeriv-muted tracking-wider mb-3 flex items-center justify-start gap-1 flex-row-reverse">
                      <Activity className="h-3 w-3" />
                      [DIAGNOSTICS_REPORT]
                    </h5>
                    
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-1 flex-row-reverse">
                          <span className="text-zeriv-muted">السرعة</span>
                          <span className="text-zeriv-offwhite">{activeService.performance}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: activeService.performance }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-zeriv-green-light"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-1 flex-row-reverse">
                          <span className="text-zeriv-muted">الوصول</span>
                          <span className="text-zeriv-offwhite">{activeService.accessibility}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: activeService.accessibility }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-[#bfa26a]"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-1 flex-row-reverse">
                          <span className="text-zeriv-muted">السيو SEO</span>
                          <span className="text-zeriv-offwhite">{activeService.seo}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: activeService.seo }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-zeriv-red"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollReveal>

        </div>

        {/* Global call to action */}
        {!showAll && (
          <ScrollReveal className="mt-12 text-center">
            <Link href="/services" className="btn-outline">
              عرض جميع الخدمات والتفاصيل الهندسية
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        )}
      </Container>
    </SectionShell>
  );
}
