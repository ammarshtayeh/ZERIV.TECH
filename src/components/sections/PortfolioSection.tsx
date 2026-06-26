"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Compass } from "lucide-react";
import { portfolioProjects, type PortfolioProject } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { HeritageBackdrop } from "@/components/effects/HeritageBackdrop";
import {
  Container,
  SectionShell,
  SectionHeader,
} from "@/components/layout/SectionShell";
import { cn } from "@/lib/utils";

function ProjectWireframe() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-60 pointer-events-none" viewBox="0 0 320 200" fill="none">
      {/* CAD Border lines */}
      <rect x="10" y="10" width="300" height="180" stroke="rgba(206, 17, 38, 0.25)" strokeWidth="0.8" strokeDasharray="3 3" />
      
      {/* Coordinate ticks */}
      <line x1="20" y1="5" x2="20" y2="15" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
      <line x1="300" y1="5" x2="300" y2="15" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
      <line x1="5" y1="20" x2="15" y2="20" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
      <line x1="5" y1="180" x2="15" y2="180" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />

      {/* Crosshairs */}
      <line x1="160" y1="0" x2="160" y2="200" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.6" />
      <line x1="0" y1="100" x2="320" y2="100" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.6" />
      
      {/* Wireframe blocks representing web UI */}
      <rect x="24" y="24" width="70" height="12" rx="2" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
      <circle cx="280" cy="30" r="6" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
      <line x1="240" y1="30" x2="260" y2="30" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
      
      {/* Hero layout mock */}
      <rect x="24" y="55" width="160" height="28" rx="3" stroke="rgba(206, 17, 38, 0.15)" strokeWidth="1" />
      <line x1="24" y1="95" x2="140" y2="95" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5" />
      <line x1="24" y1="105" x2="120" y2="105" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5" />
      
      {/* Mock visuals */}
      <rect x="200" y="55" width="96" height="80" rx="4" stroke="rgba(0, 122, 61, 0.2)" strokeWidth="1" />
      <line x1="200" y1="55" x2="296" y2="135" stroke="rgba(0, 122, 61, 0.1)" strokeWidth="0.6" />
      <line x1="296" y1="55" x2="200" y2="135" stroke="rgba(0, 122, 61, 0.1)" strokeWidth="0.6" />
      
      {/* Bottom control blocks */}
      <rect x="24" y="150" width="50" height="20" rx="3" stroke="rgba(191, 162, 106, 0.2)" strokeWidth="1" />
      <rect x="84" y="150" width="50" height="20" rx="3" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
      
      {/* Angle dimension arc mock */}
      <path d="M 24 150 A 60 60 0 0 1 84 150" stroke="rgba(191, 162, 106, 0.12)" strokeWidth="0.8" strokeDasharray="2 2" />
    </svg>
  );
}

function ConstructionCanvas({
  project,
  featured = false,
}: {
  project: PortfolioProject;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse variables for subtle 3D tilt depth
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const box = cardRef.current.getBoundingClientRect();
    const width = box.width;
    const height = box.height;
    const mouseX = e.clientX - box.left - width / 2;
    const mouseY = e.clientY - box.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const imageNode = project.image ? (
    <Image
      src={project.image}
      alt={project.title}
      fill
      className={cn(
        "object-cover object-top transition-all duration-700",
        hovered ? "opacity-100 scale-102 filter brightness-[1.05]" : "opacity-0 scale-100"
      )}
      sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 33vw"}
    />
  ) : (
    <div className="absolute inset-0 bg-gradient-to-br from-zeriv-red/10 to-zeriv-green/5" />
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full rounded-2xl border border-zeriv-border bg-[#0f1411]/50 p-4 transition-colors duration-300 hover:border-zeriv-red/40 select-none overflow-hidden"
    >
      {/* Blueprint background grid inside viewport */}
      <div className="absolute inset-0 opacity-[0.06] blueprint-grid" />

      {/* CAD technical coordinate tags */}
      <div className="flex justify-between items-center text-[9px] font-mono text-zeriv-muted mb-2">
        <span className="flex items-center gap-1">
          <Compass className="h-3 w-3 text-zeriv-red" />
          COORD: [X:{featured ? "109.84" : "402.19"}, Y:{featured ? "74.12" : "118.90"}]
        </span>
        <span>SCALE: 1:1 // GRID_SYS: 8PX</span>
      </div>

      {/* Screen/Image Container */}
      <div className={cn(
        "relative w-full overflow-hidden rounded-xl border border-white/[0.06] bg-black/90",
        featured ? "aspect-[16/10]" : "aspect-[16/11]"
      )}>
        {/* Layer 1: Underlay wireframe */}
        <ProjectWireframe />

        {/* Dynamic coordinate lines following hover state */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-10"
            >
              {/* Outer measuring lines */}
              <div className="absolute inset-x-2 top-2 border-b border-zeriv-red/30 flex justify-between text-[8px] font-mono text-zeriv-red px-2">
                <span>D_WIDTH: 100%</span>
                <span>H_LOCK</span>
              </div>
              <div className="absolute inset-y-2 right-2 border-l border-zeriv-red/30 flex flex-col justify-between text-[8px] font-mono text-zeriv-red py-2">
                <span className="rotate-90 origin-right translate-x-1">D_HEIGHT: 100%</span>
                <span></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 2: Final High-Res UI (fades in on hover) */}
        {imageNode}

        {/* Direct Link button */}
        {project.url && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 hover:bg-black/50">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 rounded-full bg-[#bfa26a] px-4 py-2 text-xs font-bold text-black transition-all duration-300 transform",
                hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
              )}
            >
              معاينة المنتج
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Text Info */}
      <div className="mt-4 text-right">
        <div className="flex items-center justify-between mb-2 flex-row-reverse">
          <span className="tag-pill border-zeriv-red/20 text-zeriv-red bg-zeriv-red/5 font-mono text-[9px]">
            {project.category}
          </span>
          <div className="flex gap-1 flex-row-reverse">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-zeriv-border bg-black/40 px-2 py-0.5 text-[9px] text-zeriv-muted font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="font-display text-base sm:text-lg font-bold text-zeriv-offwhite">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#bfa26a]"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        
        <p className="mt-2 text-xs leading-relaxed text-zeriv-muted font-light">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export function PortfolioSection({ showAll = false }: { showAll?: boolean }) {
  const items = showAll ? portfolioProjects : portfolioProjects.slice(0, 4);

  return (
    <SectionShell id="portfolio" variant="default" divider className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 opacity-[0.15] blueprint-grid pointer-events-none" />
      <HeritageBackdrop />
      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            number="02"
            label="الأشغال البرمجية"
            title={
              <>
                معرض المنتجات <span className="text-zeriv-green">والهندسة الرقمية</span>
              </>
            }
            description="مشاريع برمجية قمنا بإنشائها وهندستها وتصميمها لشركات ومؤسسات حقيقية بمعايير تقنية رائدة."
          />
        </ScrollReveal>

        {/* Layout Grid of Construction Canvas */}
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.08}>
              <ConstructionCanvas project={p} featured={i === 0} />
            </ScrollReveal>
          ))}
        </div>

        {!showAll && portfolioProjects.length > 4 && (
          <ScrollReveal className="mt-12 text-center">
            <Link href="/portfolio" className="btn-outline">
              تصفح كامل الأرشيف الهندسي
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        )}
      </Container>
    </SectionShell>
  );
}
