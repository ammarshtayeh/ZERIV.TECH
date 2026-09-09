import type { Metadata } from "next";
import { Experience } from "@/experience/Experience";
import { contact } from "@/experience/data/contact";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ZERIV — Technology × Design × Culture",
  alternates: { canonical: "/" },
};

const organization = {
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
    "Palestinian studio for digital products and brands — websites, mobile applications, UI/UX, branding and AI solutions.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <Experience />
    </>
  );
}
