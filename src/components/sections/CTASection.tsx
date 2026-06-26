"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import { Container, SectionShell } from "@/components/layout/SectionShell";
import { TatreezBorder, OliveBranch } from "@/components/patterns/Patterns";

export function CTASection() {
  return (
    <SectionShell variant="warm" divider className="py-16 sm:py-24">
      <HeritageBackdrop variant="accent" />
      <Container>
        <ScrollReveal>
          <div className="cta-glow content-card relative mx-auto max-w-3xl overflow-hidden p-8 text-center sm:p-12">
            <TatreezBorder className="absolute inset-x-0 top-0" />
            <div className="mb-4 flex justify-center text-zeriv-olive/40">
              <OliveBranch className="h-6 w-24" />
            </div>
            <span className="section-label">لنبدأ معاً</span>
            <h2 className="section-title mt-4">
              جاهز تبدأ <span className="text-gradient-flag">مشروعك</span>؟
            </h2>
            <p className="font-heritage section-desc mx-auto mt-3 max-w-md text-lg">
              تواصل معنا ودعنا نحوّل فكرتك إلى موقع أو تطبيق أو منصة رقمية
              جاهزة للانطلاق.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                تواصل معنا الآن
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/portfolio" className="btn-outline">
                شاهد أعمالنا
              </Link>
            </div>
            <TatreezBorder className="absolute inset-x-0 bottom-0" />
          </div>
        </ScrollReveal>
      </Container>
    </SectionShell>
  );
}
