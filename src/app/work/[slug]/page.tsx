import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/experience/data/projects";
import { getProjectLocalized } from "@/experience/data/localized";
import { CaseStudy } from "@/experience/studio/CaseStudy";
import { PageShell } from "@/experience/ui/PageShell";
import { getServerLocale } from "@/i18n/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const project = getProjectLocalized(locale, slug);
  if (!project) return { title: "Project" };

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: `${project.name} | ZERIV`,
      description: project.summary,
      url: `/work/${project.id}`,
      locale: locale === "ar" ? "ar_PS" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_PS",
      images: project.media.type === "image" ? [{ url: project.media.src, alt: project.name }] : undefined,
    },
    alternates: { canonical: `/work/${project.id}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();

  return (
    <PageShell>
      <CaseStudy slug={slug} />
    </PageShell>
  );
}
