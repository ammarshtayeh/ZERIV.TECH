import type { Metadata } from "next";
import { PageTransition } from "@/components/effects/PageTransition";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع ZERIV TECH لبدء مشروعك الرقمي — نموذج اتصال سريع وسهل.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHeader
        label="تواصل معنا"
        title="لنبدأ مشروعك معاً"
        description="املأ النموذج أدناه وسنتواصل معك في أقرب وقت."
      />

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <ScrollReveal className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-zeriv-offwhite">معلومات التواصل</h2>
                  <p className="mt-2 text-sm text-zeriv-offwhite/50">
                    نحن هنا لمساعدتك في تحويل فكرتك إلى واقع رقمي.
                  </p>
                </div>

                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ce1126]/10 text-[#ce1126]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zeriv-offwhite">البريد الإلكتروني</p>
                      <a href="mailto:ammar.shtayeh@gmail.com" className="text-sm text-zeriv-muted hover:text-zeriv-red transition-colors">
                        ammar.shtayeh@gmail.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#007a3d]/10 text-[#007a3d]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zeriv-offwhite">الهاتف</p>
                      <a href="tel:+972595537190" className="text-sm text-zeriv-muted hover:text-zeriv-red transition-colors" dir="ltr">
                        +972 59 553 7190
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ce1126]/10 text-[#ce1126]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zeriv-offwhite">الموقع</p>
                      <p className="text-sm text-zeriv-offwhite/50">فلسطين</p>
                    </div>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-3">
              <div className="content-card p-6 sm:p-8">
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
