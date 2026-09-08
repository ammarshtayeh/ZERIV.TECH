import type { Metadata } from "next";
import { PageShell } from "@/experience/ui/PageShell";
import { WorkIndex } from "@/experience/studio/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected digital products, platforms and experiences built by ZERIV — a Palestinian creative technology studio.",
  openGraph: {
    title: "Selected Work | ZERIV",
    description: "Digital products, platforms and experiences built by ZERIV.",
    url: "/work",
  },
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PageShell>
      <WorkIndex />
    </PageShell>
  );
}
