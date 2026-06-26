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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,122,61,0.03)_0%,transparent_60%)] pointer-events-none" />
      
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-20 sm:mb-28 text-right">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#ce1126] mb-4">عمليتنا</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-white">
              من الفكرة إلى <span className="text-[#007a3d]">الإطلاق</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical flag-colored line */}
          <div className="absolute right-[19px] sm:right-[23px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#007a3d]/40 via-[#ce1126]/20 to-transparent" />
          
          <div className="space-y-12 sm:space-y-16">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="group flex items-start gap-6 sm:gap-10 flex-row-reverse cursor-pointer">
                  {/* Number circle */}
                  <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-[#007a3d]/30 bg-[#0B0B0B] transition-all duration-300 group-hover:border-[#ce1126] group-hover:bg-[#ce1126]">
                    <span className="font-display text-sm sm:text-base font-bold text-[#ce1126] transition-colors duration-300 group-hover:text-white">
                      {step.number}
                    </span>
                    <div className="absolute inset-0 rounded-full bg-[#ce1126]/5 transition-opacity duration-300 group-hover:opacity-0" />
                  </div>
                  
                  {/* Content */}
                  <div className="text-right pt-1 sm:pt-2 transition-transform duration-300 group-hover:-translate-x-1">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#007a3d]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/40 max-w-md font-light transition-colors duration-300 group-hover:text-white/70">
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
