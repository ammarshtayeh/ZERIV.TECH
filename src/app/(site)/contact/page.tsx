import type { Metadata } from "next";
import { PageShell } from "@/experience/ui/PageShell";
import { ContactStudio } from "@/experience/studio/ContactStudio";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with ZERIV — tell us what you're building.",
  openGraph: {
    title: "Contact | ZERIV",
    description: "Let's build what's next.",
    url: "/contact",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactStudio />
    </PageShell>
  );
}
