import type { Metadata } from "next";
import { PageTransition } from "@/components/effects/PageTransition";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "خدماتنا",
  description: "خدمات ZERIV TECH — تطوير المواقع والتطبيقات، التصميم الجرافيكي، الهوية البصرية، UI/UX، وحلول رقمية.",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <PageHeader
        label="خدماتنا"
        title="حلول رقمية متكاملة"
        description="من المواقع والتطبيقات إلى الهوية البصرية — حلول رقمية شاملة لأي مشروع."
      />
      <ServicesSection showAll />
      <CTASection />
    </PageTransition>
  );
}
