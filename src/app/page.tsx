import type { Metadata } from "next";
import { Experience } from "@/experience/Experience";
import { contact } from "@/experience/data/contact";
import { getServerLocale } from "@/i18n/seo";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title:
      locale === "ar"
        ? "زيريف — تكنولوجيا × تصميم × ثقافة"
        : "ZERIV — Technology × Design × Culture",
    alternates: { canonical: "/" },
  };
}

function organization(locale: "en" | "ar") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: contact.company,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
    email: contact.email,
    telephone: contact.phone,
    address: { "@type": "PostalAddress", addressCountry: "PS" },
    sameAs: contact.socials.map((s) => s.href),
    description:
      locale === "ar"
        ? "استوديو فلسطيني للمنتجات الرقمية والعلامات — مواقع، تطبيقات موبايل، واجهات وتجربة، هوية بصرية وحلول ذكاء اصطناعي."
        : "Palestinian studio for digital products and brands — websites, mobile applications, UI/UX, branding and AI solutions.",
    inLanguage: locale === "ar" ? "ar" : "en",
  };
}

export default async function HomePage() {
  const locale = await getServerLocale();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization(locale)) }}
      />
      <Experience />
    </>
  );
}
