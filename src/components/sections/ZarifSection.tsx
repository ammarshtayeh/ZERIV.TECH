"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import {
  Container,
  SectionShell,
} from "@/components/layout/SectionShell";
import { ZarifPlayer } from "@/components/brand/ZarifPlayer";

export function ZarifSection() {
  return (
    <SectionShell id="zarif" variant="default" className="py-24 sm:py-36 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_right,rgba(139,21,56,0.04)_0%,transparent_70%)] pointer-events-none" />
      
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-16 sm:mb-24 text-right">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">أصل الاسم</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-zeriv-fg">
              ZERIV = <span className="text-[#D4AF37]">زريف الطول</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          {/* Story */}
          <ScrollReveal>
            <div className="text-right">
              <p className="font-heritage text-xl sm:text-2xl leading-[2] text-zeriv-fg/80">
                استُلهم اسم{" "}
                <strong className="text-[#D4AF37]">ZERIV</strong> من{" "}
                <strong className="text-[#D4AF37]">«زريف الطول»</strong>، أحد
                الألحان التي رافقت طفولتنا، ليصبح اليوم اسمًا نبني به مواقع،
                نصمم هويات، ونطور حلولًا رقمية.
              </p>

              <p className="mt-6 text-[15px] leading-[1.9] text-white/30">
                في الثقافة الفلسطينية، «زريف» يعني الأنيق والوقور — والطول
                رمز السمو والهيبة. هكذا نتعامل مع كل مشروع: بأناقة في
                التصميم، وعمق في البرمجة، وأثر يبقى.
              </p>

              {/* Quote */}
              <div className="mt-10 rounded-xl border border-[#D4AF37]/10 bg-[#D4AF37]/[0.03] p-6">
                <p className="font-heritage text-center text-base italic text-white/40">
                  «نبني مواقع وتطبيقات بأناقة زريف الطول — بجودة تليق
                  بطموحك، مهما كان مجال مشروعك.»
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Player */}
          <ScrollReveal delay={0.15}>
            <ZarifPlayer />
          </ScrollReveal>
        </div>
      </Container>
    </SectionShell>
  );
}
