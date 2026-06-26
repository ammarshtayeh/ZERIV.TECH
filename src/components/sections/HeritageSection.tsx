"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import {
  Container,
  SectionShell,
} from "@/components/layout/SectionShell";
import { InteractiveTatreez } from "@/components/patterns/InteractiveTatreez";

export function HeritageSection() {
  return (
    <SectionShell variant="default" className="py-24 sm:py-36 relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_left,rgba(139,21,56,0.04)_0%,transparent_70%)] pointer-events-none" />
      
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-20 sm:mb-28 text-right">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">جذورنا</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-zeriv-fg">
              هويتنا <span className="text-[#D4AF37]">فلسطينية</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/35 font-light">
              التراث الفلسطيني يشكّل هوية ZERIV البصرية واسمنا — التطريز، العمارة، والزيتون — جميعها تنعكس في عملنا.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <InteractiveTatreez />
        </ScrollReveal>

        <ScrollReveal className="mt-16 text-center">
          <p className="font-heritage text-base text-white/20 italic">
            فلسطين في القلب — عمل بلا حدود
          </p>
        </ScrollReveal>
      </Container>
    </SectionShell>
  );
}
