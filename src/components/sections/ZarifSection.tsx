"use client";

import Image from "next/image";
import { Music2, Landmark, Code2, Palette } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  Container,
  SectionShell,
  SectionHeader,
} from "@/components/layout/SectionShell";
import { TatreezBorder, OliveBranch } from "@/components/patterns/Patterns";

const pillars = [
  {
    title: "التطريز الفلسطيني — التاتريز",
    text: "نقوش هندسية تلهم هوية ZERIV البصرية — شعارنا وألواننا وطابع موقعنا.",
    icon: Palette,
    color: "text-zeriv-red",
    border: "border-zeriv-red/25",
    bg: "bg-zeriv-red/8",
  },
  {
    title: "العمارة والأقواس",
    text: "أقواس النوافذ والأبواب الفلسطينية تلهم أشكال شعارنا وهويتنا كوكالة.",
    icon: Landmark,
    color: "text-zeriv-red",
    border: "border-zeriv-red/25",
    bg: "bg-zeriv-red/8",
  },
  {
    title: "الأغاني الشعبية",
    text: "«زريف الطول» — لحن الطفولة ومصدر اسمنا وروح الأناقة الفلسطينية.",
    icon: Music2,
    color: "text-zeriv-red-light",
    border: "border-zeriv-red/25",
    bg: "bg-zeriv-red/8",
  },
  {
    title: "التقنية الحديثة",
    text: "مواقع، تطبيقات، منصات، ومتاجر — نبني حلولًا رقمية لأي مجال وقطاع.",
    icon: Code2,
    color: "text-zeriv-green",
    border: "border-zeriv-green/25",
    bg: "bg-zeriv-green/8",
  },
];

export function ZarifSection() {
  return (
    <SectionShell id="zarif" variant="accent" divider className="py-16 sm:py-24">
      <HeritageBackdrop />
      <Container>
        <ScrollReveal>
          <SectionHeader
            number="04"
            label="أصل الاسم"
            title={
              <>
                ZERIV = <span className="text-gradient-heritage">زريف الطول</span>
              </>
            }
            description="اسم فلسطيني من أغاني الطفولة — وعملنا يشمل مواقع وتطبيقات وحلول رقمية لكل المجالات."
          />
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <ScrollReveal className="lg:col-span-3">
            <div className="inspiration-card h-full">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zeriv-gold/30 bg-zeriv-gold/10 text-zeriv-red">
                  <Music2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-zeriv-red">قصة الاسم</span>
                  <p className="text-xs text-zeriv-offwhite/50">هوية فلسطينية × تقنية عالمية</p>
                </div>
              </div>

              <p className="font-heritage text-xl leading-[2] text-zeriv-offwhite sm:text-2xl">
                استُلهم اسم{" "}
                <strong className="text-zeriv-red">ZERIV</strong> من{" "}
                <strong className="text-zeriv-red">«زريف الطول»</strong>، أحد
                الألحان التي رافقت طفولتنا، ليصبح اليوم اسمًا نبني به مواقع،
                نصمم هويات، ونطور حلولًا رقمية.
              </p>

              <p className="mt-5 text-[15px] leading-[1.9] text-zeriv-offwhite/72">
                في الثقافة الفلسطينية، «زريف» يعني الأنيق والوقور — والطول
                رمز السمو والهيبة. هكذا نتعامل مع كل مشروع: بأناقة في
                التصميم، وعمق في البرمجة، وأثر يبقى.
              </p>

              <div className="mt-6 rounded-xl border border-zeriv-green/20 bg-zeriv-green/5 p-5">
                <div className="mb-2 flex justify-center text-zeriv-olive/50">
                  <OliveBranch className="h-6 w-20" />
                </div>
                <p className="font-heritage text-center text-base italic text-zeriv-offwhite/80">
                  «نبني مواقع وتطبيقات بأناقة زريف الطول — بجودة تليق
                  بطموحك، مهما كان مجال مشروعك.»
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <div className="content-card relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
              <TatreezBorder className="absolute inset-x-0 top-0" />
              <div className="logo-panel mx-auto mt-2 max-w-[200px] rounded-xl p-4">
              <Image
                src="/brand/logo.png"
                alt="شعار ZERIV TECH"
                width={240}
                height={340}
                className="logo-image-enhance mx-auto h-auto w-full object-contain"
              />
              </div>
              <div className="mt-6 space-y-3">
                {pillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.title}
                      className={`flex items-start gap-3 rounded-xl border p-4 ${p.border} ${p.bg}`}
                    >
                      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${p.color}`} />
                      <div>
                        <h3 className={`text-xs font-bold ${p.color}`}>{p.title}</h3>
                        <p className="mt-1 text-[11px] leading-relaxed text-zeriv-offwhite/55">
                          {p.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionShell>
  );
}
