"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Container, SectionShell } from "@/components/layout/SectionShell";

export function CTASection() {
  return (
    <SectionShell variant="default" className="py-32 sm:py-44 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_60%)] pointer-events-none" />
      
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-zeriv-fg">
              جاهز تبني شي <span className="text-[#D4AF37]">يستحق أن يُذكر</span>؟
            </h2>
            <p className="mt-6 text-base font-light text-white/35">
              دعنا نحوّل فكرتك إلى تجربة رقمية استثنائية.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold text-black transition-all duration-500 hover:bg-[#E5C148] hover:shadow-[0_0_50px_rgba(212,175,55,0.2)]"
              >
                تواصل معنا
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-4 text-sm font-semibold text-white/50 transition-all duration-500 hover:border-[#D4AF37]/30 hover:text-[#D4AF37]/70"
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
