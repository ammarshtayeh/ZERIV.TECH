"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import {
  Container,
  SectionShell,
} from "@/components/layout/SectionShell";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "web",
    number: "01",
    title: "تطوير المواقع",
    titleEn: "Web Development",
    description: "مواقع ومنصات رقمية فائقة الأداء — مبنية بأحدث التقنيات لتتحمل النمو وتقدم تجربة استثنائية.",
  },
  {
    id: "mobile",
    number: "02",
    title: "تطبيقات الموبايل",
    titleEn: "Mobile Apps",
    description: "تطبيقات ذكية لأجهزة iOS و Android — سريعة وسلسة وتعكس هوية علامتك التجارية.",
  },
  {
    id: "branding",
    number: "03",
    title: "الهوية البصرية",
    titleEn: "Brand Identity",
    description: "هويات بصرية متكاملة تترجم قصتك إلى شعار وألوان وتفاصيل لا تُنسى.",
  },
  {
    id: "uiux",
    number: "04",
    title: "تصميم UI/UX",
    titleEn: "UI/UX Design",
    description: "واجهات مستخدم أنيقة ورحلات مدروسة — توازن بين الجمال والوظيفة.",
  },
  {
    id: "graphic",
    number: "05",
    title: "التصميم الجرافيكي",
    titleEn: "Graphic Design",
    description: "تصاميم بصرية مخصصة تبرز علامتك وسط الضوضاء الرقمية.",
  },
];

export function ServicesSection({ showAll = false }: { showAll?: boolean }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const items = showAll ? SERVICES : SERVICES;

  return (
    <SectionShell id="services" variant="default" className="py-24 sm:py-36 relative">
      {/* Subtle green glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,97,0.04)_0%,transparent_70%)] pointer-events-none" />
      
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-20 sm:mb-28 text-right">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#ce1126] mb-4">خدماتنا</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-zeriv-fg">
              ماذا <span className="text-[#007a3d]">نبني</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Service rows */}
        <div className="space-y-0">
          {items.map((service, idx) => (
            <ScrollReveal key={service.id} delay={idx * 0.05}>
              <div
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={cn(
                  "group relative border-t border-zeriv-border py-8 sm:py-10 cursor-pointer transition-all duration-500",
                  hoveredIdx === idx && "bg-zeriv-surface/30"
                )}
              >
                <div className="flex items-center justify-between gap-6">
                  {/* Right side: Number + Arabic title */}
                  <div className="flex items-center gap-6 flex-row-reverse">
                    <span className="font-serif-eng text-base text-[#007a3d] w-8">
                      {service.number}
                    </span>
                    <h3 className={cn(
                      "font-display text-2xl sm:text-3xl lg:text-4xl font-bold transition-colors duration-500",
                      hoveredIdx === idx ? "text-[#ce1126]" : "text-zeriv-fg/80"
                    )}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Left side: English title + rotating plus indicator */}
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "hidden sm:block text-xs font-serif-eng italic tracking-wider transition-colors duration-500",
                      hoveredIdx === idx ? "text-[#ce1126]" : "text-zeriv-fg/30"
                    )}>
                      {service.titleEn}
                    </span>
                    <motion.div
                      animate={{ rotate: hoveredIdx === idx ? 90 : 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={cn(
                        "h-6 w-6 border flex items-center justify-center rounded-lg transition-all duration-500",
                        hoveredIdx === idx ? "border-[#ce1126] text-[#ce1126] bg-[#ce1126]/5" : "border-zeriv-border text-zeriv-fg/30"
                      )}
                    >
                      <span className="text-xs font-light font-mono">+</span>
                    </motion.div>
                  </div>
                </div>

                {/* Expanding description on hover */}
                <AnimatePresence>
                  {hoveredIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 max-w-xl text-sm leading-relaxed text-zeriv-fg-muted text-right mr-14">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Flag colors gradient line that appears on hover */}
                <motion.div
                  className="absolute bottom-0 right-0 h-[1px] bg-gradient-to-r from-[#ce1126] via-[#007a3d] to-[#ce1126]"
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredIdx === idx ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </ScrollReveal>
          ))}
          {/* Bottom border for last item */}
          <div className="border-t border-zeriv-border" />
        </div>
      </Container>
    </SectionShell>
  );
}
