import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO, BRAND_NAME } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero" | "nav";
  variant?: "default" | "nav" | "framed";
  priority?: boolean;
}

const sizes = {
  nav: { w: 120, h: 44, className: "h-9 w-auto max-w-[108px]" },
  sm: { w: 140, h: 200, className: "h-auto w-full max-w-[130px]" },
  md: { w: 180, h: 260, className: "h-auto w-full max-w-[170px]" },
  lg: { w: 220, h: 320, className: "h-auto w-full max-w-[210px]" },
  hero: { w: 340, h: 500, className: "h-auto w-full max-w-[300px] sm:max-w-[320px]" },
};

export function Logo({
  className,
  size = "md",
  variant = "default",
  priority = false,
}: LogoProps) {
  const dim = sizes[size === "nav" || variant === "nav" ? "nav" : size];
  const isNav = size === "nav" || variant === "nav";
  const isFramed = variant === "framed" || size === "hero";

  const image = (
    <Image
      src={BRAND_LOGO}
      alt={BRAND_NAME}
      width={dim.w}
      height={dim.h}
      className={cn("object-contain", dim.className)}
      priority={priority || size === "hero" || isNav}
    />
  );

  return (
    <Link
      href="/"
      className={cn("group inline-flex shrink-0", className)}
      aria-label={`${BRAND_NAME} - الرئيسية`}
    >
      {isNav ? (
        <span className="flex h-11 items-center justify-center rounded-xl border border-zeriv-red/30 bg-black px-2 shadow-md transition-all group-hover:border-zeriv-red/50">
          {image}
        </span>
      ) : isFramed ? (
        <span className="logo-panel-dark inline-block overflow-hidden rounded-xl px-4 py-5 sm:px-5 sm:py-6">
          {image}
        </span>
      ) : (
        <span className="logo-panel-dark inline-block overflow-hidden rounded-xl p-3">
          {image}
        </span>
      )}
    </Link>
  );
}
