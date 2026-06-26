"use client";

import { processSteps } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  Container,
  SectionShell,
  SectionHeader,
} from "@/components/layout/SectionShell";

const stepAccents = [
  "border-zeriv-red",
  "border-zeriv-green",
  "border-zeriv-fg/30",
  "border-zeriv-green",
  "border-zeriv-red",
];

export function ProcessSection() {
  return (
    <SectionShell id="process" variant="accent" divider className="py-20 sm:py-28">
      <HeritageBackdrop />
      <Container>
        <ScrollReveal>
          <SectionHeader
            number="03"
            label="عمليتنا"
            title={
              <>
                من الفكرة إلى <span className="text-zeriv-green">الإطلاق</span>
              </>
            }
            description="خمس خطوات واضحة — من الاستماع والتخطيط إلى الإطلاق والدعم المستمر."
          />
        </ScrollReveal>

        <div className="relative">
          <div className="absolute inset-x-0 top-8 hidden h-px bg-zeriv-border lg:block" aria-hidden="true" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.06}>
                <div className="relative pt-2 lg:pt-0">
                  <div
                    className={`mb-5 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-zeriv-bg font-mono text-xs font-semibold text-zeriv-fg ${stepAccents[i % stepAccents.length]}`}
                  >
                    {step.number}
                  </div>
                  <h3 className="font-display text-base font-semibold text-zeriv-fg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-[1.8] text-zeriv-muted">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
