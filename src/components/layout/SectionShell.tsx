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
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}>
      {children}
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
}

export function SectionHeader({
  label,
  title,
  description,
  align = "start",
  className,
  number,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-14 sm:mb-20",
        centered ? "text-center" : "text-right",
        className
      )}
    >
      <div
        className={cn(
          "flex items-end gap-5",
          centered ? "justify-center" : "justify-start"
        )}
      >
        {number && (
          <span className="section-number select-none" aria-hidden="true">
            {number}
          </span>
        )}
        <div className={cn(centered && "text-center")}>
          <p className="section-label">{label}</p>
          <h2 className="section-title mt-3">{title}</h2>
        </div>
      </div>
      <div
        className={cn(
          "section-rule mt-6",
          centered && "section-rule-center"
        )}
      />
      {description && (
        <p
          className={cn(
            "section-desc mt-5",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
