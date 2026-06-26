import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero" | "nav";
  showWordmark?: boolean;
  variant?: "default" | "circle";
}

const sizes = {
  sm: { w: 100, h: 140 },
  md: { w: 130, h: 180 },
  lg: { w: 180, h: 250 },
  hero: { w: 280, h: 380 },
  nav: { w: 44, h: 44 },
};

export function Logo({
  className,
  size = "md",
  showWordmark = true,
  variant = "default",
}: LogoProps) {
  const dim = sizes[size];
  const isCircle = variant === "circle" || size === "nav";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0",
        isCircle ? "items-center justify-center" : "flex-col items-start gap-1",
        className
      )}
      aria-label="ZERIV TECH - الرئيسية"
    >
      {isCircle ? (
        <span className="logo-panel relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-zeriv-red/25 p-0.5 shadow-md transition-all group-hover:border-zeriv-red/45">
          <Image
            src="/brand/logo.png"
            alt="ZERIV TECH"
            width={44}
            height={44}
            className="logo-image-enhance h-full w-full rounded-full object-cover object-top transition-transform group-hover:scale-105"
            priority
          />
        </span>
      ) : (
        <Image
          src="/brand/logo.png"
          alt="ZERIV TECH"
          width={dim.w}
          height={dim.h}
          className="logo-image-enhance h-auto w-auto rounded-lg object-contain transition-opacity group-hover:opacity-90"
          style={{ maxHeight: dim.h, maxWidth: dim.w }}
          priority={size === "hero" || size === "sm"}
        />
      )}
      {!showWordmark && null}
    </Link>
  );
}
