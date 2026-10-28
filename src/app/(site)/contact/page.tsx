import type { Metadata } from "next";
import { PageShell } from "@/experience/ui/PageShell";
import { ContactStudio } from "@/experience/studio/ContactStudio";
import { getServerLocale, pageMetadata } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getServerLocale(), {
    path: "/contact",
    en: {
      title: "Contact",
      description: "Start a project with ZERIV — tell us what you're building.",
    },
    ar: {
      title: "تواصل",
      description: "ابدأ مشروعك مع زيريف — أخبرنا بما تبنيه.",
    },
  });
}

export default function ContactPage() {
  return (
    <PageShell>
      <ContactStudio />
    </PageShell>
  );
}
