"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { portfolioProjects, type PortfolioProject } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  Container,
  SectionShell,
  SectionHeader,
} from "@/components/layout/SectionShell";
import { TatreezBorder } from "@/components/patterns/Patterns";

function MockupPreview({ type }: { type: PortfolioProject["type"] }) {
  if (type === "software" || type === "web") {
    return (
      <div className="aspect-[16/10] rounded-xl bg-zeriv-surface p-4">
        <div className="mb-3 flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-zeriv-red/80" />
          <div className="h-2 w-2 rounded-full bg-zeriv-gold/80" />
          <div className="h-2 w-2 rounded-full bg-zeriv-green/80" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-1 space-y-2">
            <div className="h-2 rounded bg-zeriv-gold/30" />
            <div className="h-2 w-3/4 rounded bg-white/10" />
            <div className="h-2 rounded bg-white/8" />
          </div>
          <div className="col-span-3 space-y-2">
            <div className="h-8 rounded-lg bg-zeriv-gold/10" />
            <div className="grid grid-cols-3 gap-1.5">
              <div className="h-10 rounded bg-white/[0.05]" />
              <div className="h-10 rounded bg-white/[0.05]" />
              <div className="h-10 rounded bg-white/[0.05]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "uiux") {
    return (
      <div className="flex justify-center p-4">
        <div className="w-24 rounded-2xl border border-white/10 bg-zeriv-surface p-2.5">
          <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/20" />
          <div className="space-y-2">
            <div className="h-8 rounded-lg bg-zeriv-gold/15" />
            <div className="h-1.5 rounded bg-white/10" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-5 rounded bg-zeriv-green/15" />
              <div className="h-5 rounded bg-zeriv-red/15" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 p-6">
      <div className="h-14 w-14 rounded-full border-2 border-zeriv-gold/40 bg-zeriv-gold/10" />
      <div className="h-16 w-24 rounded-lg border border-white/10 bg-gradient-to-br from-zeriv-red/15 to-zeriv-green/10" />
    </div>
  );
}

function ProjectPreview({
  project,
  featured = false,
}: {
  project: PortfolioProject;
  featured?: boolean;
}) {
  const preview = project.image ? (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/[0.08] bg-white ${
        featured ? "aspect-[16/10]" : "aspect-[16/11]"
      }`}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 33vw"}
      />
      {project.url && (
        <div className="absolute inset-0 flex items-center justify-center bg-zeriv-dark/0 transition-colors group-hover:bg-zeriv-dark/50">
          <span className="flex items-center gap-2 rounded-full bg-zeriv-gold/90 px-4 py-2 text-xs font-semibold text-zeriv-dark opacity-0 transition-opacity group-hover:opacity-100">
            زيارة الموقع
            <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </div>
      )}
    </div>
  ) : (
    <MockupPreview type={project.type} />
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        aria-label={`زيارة ${project.title}`}
      >
        {preview}
      </a>
    );
  }

  return <div className="group">{preview}</div>;
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: PortfolioProject;
  featured?: boolean;
}) {
  return (
    <article className="content-card-hover group relative h-full overflow-hidden">
      <TatreezBorder className="absolute inset-x-0 top-0 z-10 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className={`overflow-hidden bg-zeriv-elevated/50 p-3 ${featured ? "sm:p-4" : ""}`}>
        <ProjectPreview project={project} featured={featured} />
      </div>
      <div className={`p-5 ${featured ? "sm:p-6" : ""}`}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="tag-pill border-zeriv-gold/20 text-zeriv-gold">
            {project.category}
          </span>
          <div className="flex gap-1">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] text-zeriv-offwhite/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3
          className={`font-semibold text-zeriv-offwhite ${
            featured ? "text-xl" : "text-base"
          }`}
        >
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zeriv-gold"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zeriv-offwhite/65">
          {project.description}
        </p>
      </div>
    </article>
  );
}

export function PortfolioSection({ showAll = false }: { showAll?: boolean }) {
  const items = showAll ? portfolioProjects : portfolioProjects.slice(0, 4);

  return (
    <SectionShell id="portfolio" variant="default" divider className="py-20 sm:py-28">
      <HeritageBackdrop />
      <Container>
        <ScrollReveal>
          <SectionHeader
            number="02"
            label="أعمالنا"
            title={
              <>
                مشاريع <span className="text-gradient-flag">نفتخر بها</span>
              </>
            }
            description="مواقع، تطبيقات، متاجر، ومنصات — مشاريع حقيقية نفّذناها لعملاء في مجالات متنوعة."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.06}>
              <ProjectCard project={p} featured={i === 0} />
            </ScrollReveal>
          ))}
        </div>

        {!showAll && portfolioProjects.length > 4 && (
          <ScrollReveal className="mt-10 text-center">
            <Link href="/portfolio" className="btn-outline">
              عرض جميع الأعمال
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        )}
      </Container>
    </SectionShell>
  );
}
