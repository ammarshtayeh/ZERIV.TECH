"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import { SectionOrnament } from "@/components/layout/SectionShell";
import { TatreezBorder } from "@/components/patterns/Patterns";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-white/[0.06] bg-section-accent pt-32 pb-16 sm:pt-40 sm:pb-20">
      <HeritageBackdrop variant="accent" />
      <div className="circuit-grid absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-zeriv-red/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-zeriv-green/[0.07] blur-[80px]" />

      <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
        <ScrollReveal>
          <span className="section-label">{label}</span>
          <h1 className="section-title mt-4">{title}</h1>
          <SectionOrnament />
          {description && (
            <p className="section-desc mx-auto mt-4 max-w-2xl">{description}</p>
          )}
        </ScrollReveal>
      </div>
      <TatreezBorder className="absolute inset-x-0 bottom-0" />
    </div>
  );
}
