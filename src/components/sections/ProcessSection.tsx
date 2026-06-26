"use client";

import { useState } from "react";
import { processSteps } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import {
  Container,
  SectionShell,
} from "@/components/layout/SectionShell";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <SectionShell id="process" variant="default" className="py-24 sm:py-36 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,122,61,0.03)_0%,transparent_60%)] pointer-events-none" />
      
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-20 sm:mb-28 text-right">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#ce1126] mb-4">عمليتنا</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-zeriv-fg">
              من الفكرة إلى <span className="text-[#007a3d]">الإطلاق</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Glowing vertical flag-colored timeline path */}
          <div className="absolute right-[19px] sm:right-[23px] top-0 bottom-0 w-[2px] transition-all duration-500 bg-gradient-to-b from-[#007a3d]/50 via-[#ce1126]/30 to-transparent" />
          
          <div className="space-y-12 sm:space-y-16">
            {processSteps.map((step, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <ScrollReveal key={step.number} delay={i * 0.1}>
                  <div 
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="group flex items-start gap-6 sm:gap-10 flex-row-reverse cursor-pointer"
                  >
                    {/* Number circle with glowing flag hover effect */}
                    <div className={cn(
                      "relative flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                      isHovered
                        ? "border-[#ce1126] bg-[#ce1126] text-white shadow-[0_0_20px_rgba(206,17,38,0.4)]"
                        : "border-[#007a3d]/30 bg-zeriv-bg text-[#ce1126]"
                    )}>
                      <span className={cn(
                        "font-display text-sm sm:text-base font-bold transition-colors duration-300",
                        isHovered ? "text-white" : "text-[#ce1126]"
                      )}>
                        {step.number}
                      </span>
                      <div className="absolute inset-0 rounded-full bg-[#ce1126]/5 transition-opacity duration-300 group-hover:opacity-0" />
                    </div>
                    
                    {/* Content text */}
                    <div className="text-right pt-1 sm:pt-2 transition-transform duration-300 group-hover:-translate-x-1.5">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-zeriv-fg transition-colors duration-300 group-hover:text-[#007a3d]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zeriv-fg-muted max-w-md font-light transition-colors duration-300 group-hover:text-zeriv-fg/90">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
