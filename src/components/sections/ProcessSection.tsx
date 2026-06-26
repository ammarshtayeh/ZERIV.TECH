"use client";

import { processSteps } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import {
  Container,
  SectionShell,
} from "@/components/layout/SectionShell";

export function ProcessSection() {
  return (
    <SectionShell id="process" variant="default" className="py-24 sm:py-36 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none" />
      
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-20 sm:mb-28 text-right">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">عمليتنا</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-zeriv-fg">
              من الفكرة إلى <span className="text-[#D4AF37]">الإطلاق</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical gold line */}
          <div className="absolute right-[19px] sm:right-[23px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#D4AF37]/30 via-[#D4AF37]/10 to-transparent" />
          
          <div className="space-y-12 sm:space-y-16">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="flex items-start gap-6 sm:gap-10 flex-row-reverse">
                  {/* Number circle */}
                  <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#0B0B0B]">
                    <span className="font-display text-sm sm:text-base font-bold text-[#D4AF37]/60">
                      {step.number}
                    </span>
                    <div className="absolute inset-0 rounded-full bg-[#D4AF37]/5" />
                  </div>
                  
                  {/* Content */}
                  <div className="text-right pt-1 sm:pt-2">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-zeriv-fg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/35 max-w-md font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
