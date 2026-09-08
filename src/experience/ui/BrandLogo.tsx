import Image from "next/image";
import { BRAND_LOGO_MARK, BRAND_NAME } from "@/lib/brand";

interface Props {
  className?: string;
  priority?: boolean;
  /** responsive sizes hint for next/image */
  sizes?: string;
  /** decorative copies (e.g. mirrored in the preloader) */
  decorative?: boolean;
}

/**
 * The approved ZERIV mark — the original asset, untouched in geometry, proportion and colour.
 * `logo-mark.png` is the same file with only its opaque black field keyed to transparent
 * (see scripts/derive-logo-mark.mjs) so the mark sits on any dark surface without a visible square.
 */
export function BrandLogo({ className, priority, sizes = "320px", decorative }: Props) {
  return (
    <Image
      src={BRAND_LOGO_MARK}
      alt={decorative ? "" : BRAND_NAME}
      width={1024}
      height={1024}
      sizes={sizes}
      priority={priority}
      draggable={false}
      className={`xp-logo${className ? ` ${className}` : ""}`}
    />
  );
}
