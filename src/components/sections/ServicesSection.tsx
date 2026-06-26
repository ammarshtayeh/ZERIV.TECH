"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { services } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  Container,
  SectionShell,
  SectionHeader,
} from "@/components/layout/SectionShell";
import { cn } from "@/lib/utils";

const accents = ["editorial-card-red", "editorial-card-green", "editorial-card-black"];

function ServiceCard({
  title,
  description,
  category,
  index,
  featured = false,
}: {
  title: string;
  description: string;
  category: string;
  index: number;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "editorial-card group h-full transition-colors hover:bg-zeriv-elevated",
        accents[index % accents.length],
        featured && "sm:p-8"
      )}
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-zeriv-red/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="tag-pill">{category}</span>
      </div>
      <h3
        className={cn(
          "font-display font-semibold text-zeriv-fg",
          featured ? "text-xl sm:text-2xl" : "text-lg"
        )}
      >
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm font-light leading-[1.85] text-zeriv-muted">
        {description}
      </p>
      <div className="mt-6 flex items-center gap-1 text-xs font-medium text-zeriv-red opacity-0 transition-opacity group-hover:opacity-100">
        <span>اعرف المزيد</span>
        <ArrowLeft className="h-3 w-3" />
      </div>
    </article>
  );
}

export function ServicesSection({ showAll = false }: { showAll?: boolean }) {
  const [featured, ...rest] = services;

  return (
    <SectionShell id="services" variant="elevated" divider className="py-20 sm:py-28">
      <HeritageBackdrop />
      <Container>
        <ScrollReveal>
          <SectionHeader
            number="01"
            label="خدماتنا"
            title={
              <>
                حلول رقمية <span className="text-zeriv-red">متكاملة</span>
              </>
            }
            description="مواقع، تطبيقات، تصميم، هوية بصرية، واستشارات — خمسة مجالات نتقنها لعملائنا في مختلف القطاعات."
          />
        </ScrollReveal>

        {showAll ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.05}>
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
              <div className="grid gap-4">
                {rest.slice(0, 2).map((s, i) => (
                  <ScrollReveal key={s.id} delay={(i + 1) * 0.05}>
                    <ServiceCard {...s} index={i + 1} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {rest.slice(2).map((s, i) => (
                <ScrollReveal key={s.id} delay={(i + 3) * 0.05}>
                  <ServiceCard {...s} index={i + 3} />
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal className="mt-12">
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
