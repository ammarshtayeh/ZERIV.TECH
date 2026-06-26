"use client";

import {
  Lightbulb,
  Crown,
  PenTool,
  Code2,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { processSteps } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  Container,
  SectionShell,
  SectionHeader,
} from "@/components/layout/SectionShell";
import { TatreezBorder } from "@/components/patterns/Patterns";

const stepIcons: Record<string, LucideIcon> = {
  idea: Lightbulb,
  strategy: Crown,
  design: PenTool,
  development: Code2,
  launch: Rocket,
};

const stepColors = [
  "border-zeriv-red/25 bg-zeriv-red/8 text-zeriv-red",
  "border-zeriv-gold/25 bg-zeriv-gold/8 text-zeriv-gold",
  "border-zeriv-green/25 bg-zeriv-green/8 text-zeriv-green",
  "border-zeriv-gold/20 bg-zeriv-gold/6 text-zeriv-gold",
  "border-zeriv-red/20 bg-zeriv-red/6 text-zeriv-red",
];

export function ProcessSection() {
  return (
    <SectionShell id="process" variant="accent" divider className="py-16 sm:py-24">
      <HeritageBackdrop variant="accent" />
      <Container>
        <ScrollReveal>
          <SectionHeader
            number="03"
            label="عمليتنا"
            title={
              <>
                من الفكرة إلى <span className="text-gradient-heritage">الإطلاق</span>
              </>
            }
            description="خمس خطوات واضحة — من الاستماع والتخطيط إلى الإطلاق والدعم المستمر."
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {processSteps.map((step, i) => {
            const Icon = stepIcons[step.icon] || Lightbulb;
            const color = stepColors[i % stepColors.length];
            return (
              <ScrollReveal key={step.number} delay={i * 0.07}>
                <div className="content-card-hover group relative flex h-full flex-col overflow-hidden p-5 text-center">
                  <TatreezBorder className="absolute inset-x-0 top-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 font-mono text-[10px] text-zeriv-gold/40">
                    {step.number}
                  </span>
                  <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${color}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold text-zeriv-offwhite">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zeriv-offwhite/60">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </SectionShell>
  );
}
