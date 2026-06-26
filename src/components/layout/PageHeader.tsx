"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import { TatreezBorder } from "@/components/patterns/Patterns";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-zeriv-border bg-section-accent pt-32 pb-16 sm:pt-40 sm:pb-20">
      <HeritageBackdrop />

      <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8 lg:px-10">
        <ScrollReveal>
          <p className="section-label">{label}</p>
          <h1 className="section-title mx-auto mt-4 max-w-3xl">{title}</h1>
          <div className="section-rule section-rule-center mt-6" />
          {description && (
            <p className="section-desc mx-auto mt-5 max-w-2xl">{description}</p>
          )}
        </ScrollReveal>
      </div>
      <TatreezBorder className="absolute inset-x-0 bottom-0" />
    </div>
  );
}
