import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionOrnament({ className }: { className?: string }) {
  return (
    <div className={cn("section-ornament", className)} aria-hidden="true">
      <span className="bg-zeriv-red/80" />
      <span className="bg-zeriv-black dark:bg-zeriv-white h-2 w-2" />
      <span className="bg-zeriv-green/80" />
    </div>
  );
}

type SectionVariant = "hero" | "default" | "elevated" | "accent" | "warm";

interface SectionShellProps {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: SectionVariant;
  divider?: boolean;
}

const variants: Record<SectionVariant, string> = {
  hero: "bg-section-hero",
  default: "bg-section-base",
  elevated: "bg-section-elevated",
  accent: "bg-section-accent",
  warm: "bg-section-warm",
};

export function SectionShell({
  id,
  children,
  className,
  variant = "default",
  divider = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden", variants[variant], className)}
    >
      {divider && (
        <div className="section-divider absolute inset-x-0 top-0 z-10" />
      )}
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "start";
  className?: string;
  number?: string;
  showOrnament?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className,
  number,
  showOrnament = true,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" ? "text-center" : "text-right",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        {number && (
          <span className="font-mono text-sm font-medium text-zeriv-red/70">
            {number}
          </span>
        )}
        <span className="section-label">{label}</span>
      </div>
      <h2 className="section-title mt-4">{title}</h2>
      {showOrnament && (
        <SectionOrnament className={align === "start" ? "mr-0 justify-start" : undefined} />
      )}
      {description && (
        <p
          className={cn(
            "section-desc mt-4 max-w-2xl leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
