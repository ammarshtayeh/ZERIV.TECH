"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  Container,
  SectionShell,
  SectionHeader,
} from "@/components/layout/SectionShell";
import { OliveBranch } from "@/components/patterns/Patterns";

const values = [
  {
    title: "هوية واضحة",
    text: "كل مشروع يحصل على تصميم وهوية بصرية تناسب علامته التجارية ومجاله.",
    color: "text-zeriv-gold",
    border: "border-t-zeriv-gold/40",
  },
  {
    title: "كود نظيف",
    text: "مواقع وتطبيقات سريعة وقابلة للتوسع — برمجة بمعايير عالمية.",
    color: "text-zeriv-green",
    border: "border-t-zeriv-green/40",
  },
  {
    title: "تجربة قوية",
    text: "واجهات سلسة تجمع الجمال والوظيفة — سواء موقع، تطبيق، أو منصة.",
    color: "text-zeriv-red",
    border: "border-t-zeriv-red/40",
  },
];

export function AboutSection({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <SectionShell id="about" variant="elevated" divider className="py-16 sm:py-24">
      <HeritageBackdrop />
      <Container>
        <ScrollReveal>
          <SectionHeader
            number={fullPage ? undefined : "06"}
            label="عن ZERIV TECH"
            title={
              <>
                تقنية حديثة بـ<span className="text-gradient-heritage">روح فلسطينية</span>
              </>
            }
            description="وكالة فلسطينية نطوّر مواقع وتطبيقات وحلول رقمية لعملاء من مختلف القطاعات — هويتنا فلسطينية، ومشاريعنا بلا حدود."
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.08}>
              <div className={`content-card border-t-2 ${v.border} p-6 text-center`}>
                <h3 className={`text-base font-semibold ${v.color}`}>
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zeriv-offwhite/65">
                  {v.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {fullPage && (
          <ScrollReveal className="mt-8">
            <div className="inspiration-card mx-auto max-w-3xl p-6 text-center sm:p-8">
              <div className="mb-4 flex justify-center text-zeriv-olive/50">
                <OliveBranch className="h-6 w-20" />
              </div>
              <p className="font-heritage text-lg leading-[2] text-zeriv-offwhite/85">
                فريقنا يجمع مطورين ومصممين شغوفين — نبني مواقع وتطبيقات
                ومنصات رقمية، ونصمم هويات بصرية وحملات، لأي قطاع يحتاج
                حضورًا رقميًا قويًا.
              </p>
              <Link href="/contact" className="btn-primary mt-6 inline-flex">
                تواصل معنا
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </SectionShell>
  );
}
