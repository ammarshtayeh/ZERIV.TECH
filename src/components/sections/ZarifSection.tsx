"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import {
  Container,
  SectionShell,
} from "@/components/layout/SectionShell";

export function ZarifSection() {
  return (
    <SectionShell id="zarif" variant="default" className="py-24 sm:py-36 relative">
      {/* Ambient green/red glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_right,rgba(0,122,61,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-16 sm:mb-24 text-right">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#ce1126] mb-4">أصل الاسم</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-white">
              ZERIV = <span className="text-[#007a3d]">زريف الطول</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {/* Story */}
          <ScrollReveal>
            <div className="text-right">
              <p className="font-heritage text-xl sm:text-2xl leading-[2] text-white/80">
                استُلهم اسم{" "}
                <strong className="text-[#007a3d]">ZERIV</strong> من{" "}
                <strong className="text-[#ce1126]">«زريف الطول»</strong>، أحد
                الألحان التي رافقت طفولتنا ونشأتنا، ليصبح اليوم اسمًا نبني به مواقع،
                ونصمم هويات، ونطور حلولًا رقمية رائدة.
              </p>

              <p className="mt-6 text-[15px] leading-[1.9] text-white/40">
                في الثقافة الفلسطينية الشفهية والتراثية، «زريف» يعني الأنيق والوقور — والطول
                رمز السمو والهيبة والارتفاع. هكذا نتعامل مع كل مشروع رقمي نقوم بتشييده: بأناقة بالغة في
                التصميم، وعمق وكفاءة عالية في البرمجة، وأثر بصرى رائع يبقى طويلاً.
              </p>

              {/* Quote */}
              <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
                <p className="font-heritage text-center text-base italic text-white/50">
                  «نبني مواقع وتطبيقات بأناقة زريف الطول — بجودة تليق
                  بطموحك ورؤيتك، وبمعايير عالمية رائدة.»
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionShell>
  );
}
