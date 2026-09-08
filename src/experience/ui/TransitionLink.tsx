"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { gsap } from "../animations/gsap";
import { motion } from "../animations/motion";

let overlay: HTMLDivElement | null = null;

/**
 * Black-frame route transition. Mount once; `TransitionLink` plays it before navigating.
 */
export function RouteTransition() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    overlay = ref.current;
    return () => {
      overlay = null;
    };
  }, []);
  return (
    <div ref={ref} className="xp-transition" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="xp-transition__mark">
        <path d="M50 8 L92 50 L50 92 L8 50 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M22 22 H78 V78 H22 Z" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (href.startsWith("/")) router.prefetch(href);
  }, [href, router]);

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const external = !href.startsWith("/") || rest.target === "_blank";
    if (external || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (!overlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    e.preventDefault();
    const mark = overlay.querySelector<SVGElement>(".xp-transition__mark");
    gsap
      .timeline({
        onComplete: () => {
          router.push(href);
          gsap.set(overlay, { clipPath: "inset(100% 0 0 0)", pointerEvents: "none" });
          gsap.set(mark, { opacity: 0 });
        },
      })
      .set(overlay, { pointerEvents: "auto" })
      .fromTo(
        overlay,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.42, ease: motion.ease.inOut }
      )
      .fromTo(
        mark,
        { opacity: 0, scale: 0.78, rotate: -20 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.32, ease: motion.ease.out },
        0.16
      );
  };

  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
