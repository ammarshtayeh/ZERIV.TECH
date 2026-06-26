"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import { Container, SectionShell } from "@/components/layout/SectionShell";
import { TatreezBorder } from "@/components/patterns/Patterns";

export function CTASection() {
  return (
    <SectionShell variant="warm" divider className="py-16 sm:py-24">
      <HeritageBackdrop />
      <Container>
        <ScrollReveal>
          <div className="content-card relative mx-auto max-w-3xl overflow-hidden border border-zeriv-border p-8 text-center sm:p-12">
            <TatreezBorder className="absolute inset-x-0 top-0" />
            <span className="section-label">لنبدأ معاً</span>
            <h2 className="section-title mt-4">
              جاهز تبدأ <span className="text-zeriv-green">مشروعك</span>؟
            </h2>
            <p className="font-heritage section-desc mx-auto mt-4 max-w-md">
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
