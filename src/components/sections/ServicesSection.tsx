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
      {/* Subtle gold glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />
      
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-20 sm:mb-28 text-right">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">خدماتنا</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-zeriv-fg">
              ماذا <span className="text-[#D4AF37]">نبني</span>
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
                  "group relative border-t border-white/[0.06] py-8 sm:py-10 cursor-pointer transition-all duration-500",
                  hoveredIdx === idx && "bg-white/[0.02]"
                )}
              >
                <div className="flex items-center justify-between gap-6">
                  {/* Right side: Number + Arabic title */}
                  <div className="flex items-center gap-6 flex-row-reverse">
                    <span className="font-display text-sm text-[#D4AF37]/40 tabular-nums w-8">
                      {service.number}
                    </span>
                    <h3 className={cn(
                      "font-display text-2xl sm:text-3xl lg:text-4xl font-bold transition-colors duration-500",
                      hoveredIdx === idx ? "text-[#D4AF37]" : "text-zeriv-fg"
                    )}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Left side: English title */}
                  <span className="hidden sm:block text-sm text-zeriv-fg/20 tracking-wider">
                    {service.titleEn}
                  </span>
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
                      <p className="pt-4 max-w-xl text-sm leading-relaxed text-zeriv-fg/40 text-right mr-14">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Gold line that appears on hover */}
                <motion.div
                  className="absolute bottom-0 right-0 h-[1px] bg-[#D4AF37]/40"
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredIdx === idx ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </ScrollReveal>
          ))}
          {/* Bottom border for last item */}
          <div className="border-t border-white/[0.06]" />
        </div>
      </Container>
    </SectionShell>
  );
}
