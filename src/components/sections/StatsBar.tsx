"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";

const stats = [
  { value: "50+", label: "مشروع منجز", accent: "text-zeriv-gold" },
  { value: "30+", label: "عميل راضٍ", accent: "text-zeriv-green" },
  { value: "5+", label: "مجالات خدمة", accent: "text-zeriv-red" },
  { value: "100%", label: "التزام بالجودة", accent: "text-zeriv-gold-light" },
];

export function StatsBar() {
  return (
    <div className="relative border-y border-white/[0.08] bg-zeriv-surface/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-x-reverse divide-white/[0.06] lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col items-center justify-center py-8 text-center sm:py-10">
                <span className={`font-display text-3xl font-bold sm:text-4xl ${stat.accent}`}>
                  {stat.value}
                </span>
                <span className="mt-1.5 text-xs text-zeriv-offwhite/65 sm:text-sm">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
