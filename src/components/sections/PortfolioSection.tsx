"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { portfolioProjects, type PortfolioProject } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import {
  Container,
  SectionShell,
} from "@/components/layout/SectionShell";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: PortfolioProject }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [4, -4]);
  const rotateY = useTransform(x, [-200, 200], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const box = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - box.left - box.width / 2);
    y.set(e.clientY - box.top - box.height / 2);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0f0f0f] transition-all duration-500 hover:border-[#ce1126]/30 cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={cn(
              "object-cover object-top transition-all duration-700",
              hovered ? "scale-105 brightness-110" : "scale-100 brightness-75"
            )}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#ce1126]/10 to-[#007a3d]/5" />
        )}
        
        {/* Hover overlay with link */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-500",
          hovered ? "bg-black/50" : "bg-transparent"
        )}>
          {project.url && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={false}
              animate={{ 
                opacity: hovered ? 1 : 0,
                y: hovered ? 0 : 10
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 rounded-full bg-[#ce1126] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#9d0c1b] transition-colors"
            >
              معاينة المشروع
              <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 sm:p-6 text-right">
        <div className="flex items-center justify-between mb-3 flex-row-reverse">
          <span className="text-[10px] tracking-[0.15em] uppercase text-[#007a3d] font-semibold">
            {project.category}
          </span>
          <div className="flex gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[9px] text-white/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="font-display text-lg font-bold text-white group-hover:text-[#ce1126] transition-colors duration-500">
          {project.title}
        </h3>
        
        <p className="mt-2 text-xs leading-relaxed text-white/40 font-light">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export function PortfolioSection({ showAll = false }: { showAll?: boolean }) {
  const items = showAll ? portfolioProjects : portfolioProjects.slice(0, 4);

  return (
    <SectionShell id="portfolio" variant="default" className="py-24 sm:py-36 relative">
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,122,61,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-20 sm:mb-28 text-right">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#ce1126] mb-4">أعمالنا</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-white">
              مشاريع <span className="text-[#007a3d]">صنعناها</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} />
            </ScrollReveal>
          ))}
        </div>

        {!showAll && portfolioProjects.length > 4 && (
          <ScrollReveal className="mt-16 text-center">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3 text-sm font-semibold text-white/50 transition-all duration-500 hover:border-[#007a3d]/30 hover:text-[#007a3d] hover:bg-[#007a3d]/5"
            >
              تصفح كل الأعمال
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        )}
      </Container>
    </SectionShell>
  );
}
