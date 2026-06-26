"use client";

import { Landmark, TreePine, Palette } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  Container,
  SectionShell,
  SectionHeader,
} from "@/components/layout/SectionShell";
import { TatreezBorder, OliveBranch } from "@/components/patterns/Patterns";
import { InteractiveTatreez } from "@/components/patterns/InteractiveTatreez";

const heritage = [
  {
    title: "التطريز",
    desc: "نقوش التطريز تلهم ألواننا وأنماطنا — هوية ZERIV البصرية، لا قالبًا لكل مشروع.",
    accent: "border-r-zeriv-red",
    icon: Palette,
    color: "text-zeriv-red",
    bg: "bg-zeriv-red/10",
  },
  {
    title: "الزيتون",
    desc: "رمز الأرض والصمود — جزء من جذورنا كوكالة فلسطينية، لا حدودًا لما نبنيه لعملائنا.",
    accent: "border-r-zeriv-green",
    icon: TreePine,
    color: "text-zeriv-green-light",
    bg: "bg-zeriv-green/10",
  },
  {
    title: "العمارة",
    desc: "أقواس الحجر والنوافذ الفلسطينية تنعكس في شعارنا وتصميم هويتنا الرقمية.",
    accent: "border-r-zeriv-fg/25",
    icon: Landmark,
    color: "text-zeriv-fg",
    bg: "bg-zeriv-surface",
  },
];

export function HeritageSection() {
  return (
    <SectionShell variant="warm" divider className="py-14 sm:py-20">
      <HeritageBackdrop />
      <Container>
        <ScrollReveal>
          <SectionHeader
            number="05"
            label="جذورنا"
            title={
              <>
                هويتنا <span className="text-zeriv-red">فلسطينية</span>
              </>
            }
            description="التراث الفلسطيني يشكّل هوية ZERIV البصرية واسمنا — أما عملنا فيشمل مواقع وتطبيقات ومنصات لأي قطاع أو فكرة."
          />
        </ScrollReveal>

        <div className="mt-2 grid gap-4 sm:grid-cols-3">
          {heritage.map((item, i) => {
            const Icon = item.icon;
            return (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <div
                className={`content-card-hover border-r-[3px] ${item.accent} p-6 text-right`}
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-display mt-3 text-lg font-bold text-zeriv-offwhite">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zeriv-stone/75">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          );})}
        </div>

        <ScrollReveal>
          <InteractiveTatreez />
        </ScrollReveal>

        <ScrollReveal className="mt-10 flex justify-center">
          <div className="flex items-center gap-4 text-zeriv-olive/50">
            <OliveBranch className="h-6 w-20" />
            <span className="font-heritage text-sm text-zeriv-stone/50">
              فلسطين في القلب — عمل بلا حدود
            </span>
            <OliveBranch className="h-6 w-20 scale-x-[-1]" />
          </div>
        </ScrollReveal>
      </Container>
      <TatreezBorder thick className="absolute inset-x-0 bottom-0" />
    </SectionShell>
  );
}
