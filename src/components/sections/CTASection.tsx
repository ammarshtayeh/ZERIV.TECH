"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Container, SectionShell } from "@/components/layout/SectionShell";

export function CTASection() {
  return (
    <SectionShell variant="default" className="py-32 sm:py-44 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,122,61,0.04)_0%,transparent_60%)] pointer-events-none" />
      
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-zeriv-fg">
              جاهز تبني شي <span className="text-[#ce1126]">يستحق أن يُذكر</span>؟
            </h2>
            <p className="mt-6 text-base font-light text-zeriv-fg-muted">
              دعنا نحوّل فكرتك إلى تجربة رقمية استثنائية.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#ce1126] px-8 py-4 text-sm font-bold text-white transition-all duration-500 hover:bg-[#9d0c1b] hover:shadow-[0_0_50px_rgba(206,17,38,0.35)]"
              >
                تواصل معنا
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-zeriv-border px-7 py-4 text-sm font-semibold text-zeriv-fg-muted transition-all duration-500 hover:border-[#007a3d]/30 hover:text-[#007a3d]"
              >
                شاهد أعمالنا
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </SectionShell>
  );
}
