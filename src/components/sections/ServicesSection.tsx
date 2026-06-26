"use client";

import Link from "next/link";
import {
  Brain,
  Code2,
  Layout,
  Palette,
  Sparkles,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  Container,
  SectionShell,
  SectionHeader,
} from "@/components/layout/SectionShell";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  sparkles: Sparkles,
  layout: Layout,
  brain: Brain,
};

const accents = [
  { grad: "from-zeriv-green/15 to-transparent", border: "border-zeriv-green/20", icon: "text-zeriv-green" },
  { grad: "from-zeriv-gold/15 to-transparent", border: "border-zeriv-gold/20", icon: "text-zeriv-gold" },
  { grad: "from-zeriv-red/15 to-transparent", border: "border-zeriv-red/20", icon: "text-zeriv-red" },
  { grad: "from-zeriv-green/10 to-transparent", border: "border-zeriv-green/15", icon: "text-zeriv-green" },
  { grad: "from-zeriv-gold/10 to-transparent", border: "border-zeriv-gold/15", icon: "text-zeriv-gold" },
];

function ServiceCard({
  title,
  description,
  icon,
  category,
  index,
  featured = false,
}: {
  title: string;
  description: string;
  icon: string;
  category: string;
  index: number;
  featured?: boolean;
}) {
  const Icon = iconMap[icon] || Code2;
  const accent = accents[index % accents.length];

  return (
    <div
      className={`content-card-hover group relative flex h-full flex-col overflow-hidden bg-gradient-to-br p-6 ${accent.grad} border ${accent.border} ${
        featured ? "sm:p-8" : ""
      }`}
    >
      <div className="tatreez-corner pointer-events-none absolute -left-2 -top-2 h-16 w-16 opacity-40" />
      <div className="mb-4 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] ${accent.icon}`}>
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <span className="tag-pill">{category}</span>
      </div>
      <h3
        className={`mb-2 font-semibold text-zeriv-offwhite ${
          featured ? "text-lg sm:text-xl" : "text-base"
        }`}
      >
        {title}
      </h3>
      <p className="flex-1 text-sm leading-relaxed text-zeriv-offwhite/65">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-zeriv-gold opacity-0 transition-opacity group-hover:opacity-100">
        <span>اعرف المزيد</span>
        <ArrowLeft className="h-3 w-3" />
      </div>
    </div>
  );
}

export function ServicesSection({ showAll = false }: { showAll?: boolean }) {
  const [featured, ...rest] = services;

  return (
    <SectionShell id="services" variant="elevated" divider className="py-16 sm:py-24">
      <HeritageBackdrop />
      <Container>
        <ScrollReveal>
          <SectionHeader
            number="01"
            label="خدماتنا"
            title={
              <>
                حلول رقمية <span className="text-gradient-heritage">متكاملة</span>
              </>
            }
            description="مواقع، تطبيقات، تصميم، هوية بصرية، واستشارات — خمسة مجالات نتقنها لعملائنا في مختلف القطاعات."
          />
        </ScrollReveal>

        {showAll ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.06}>
                <ServiceCard {...s} index={i} featured={i === 0} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-4 lg:grid-cols-2">
              <ScrollReveal>
                <ServiceCard {...featured} index={0} featured />
              </ScrollReveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {rest.slice(0, 2).map((s, i) => (
                  <ScrollReveal key={s.id} delay={(i + 1) * 0.06}>
                    <ServiceCard {...s} index={i + 1} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {rest.slice(2).map((s, i) => (
                <ScrollReveal key={s.id} delay={(i + 3) * 0.06}>
                  <ServiceCard {...s} index={i + 3} />
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal className="mt-10 text-center">
              <Link href="/services" className="btn-outline">
                عرض جميع الخدمات
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </ScrollReveal>
          </>
        )}
      </Container>
    </SectionShell>
  );
}
