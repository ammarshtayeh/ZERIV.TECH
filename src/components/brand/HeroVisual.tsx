"use client";

import { motion } from "framer-motion";
import { TatreezPattern } from "@/components/patterns/Patterns";

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-zeriv-gold/10 blur-[80px]" />
      <div className="absolute inset-8 rounded-full bg-zeriv-green/5 blur-[60px]" />

      <motion.svg
        viewBox="0 0 400 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-full w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-label="شعار ZERIV TECH المجرد"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4bc8a" />
            <stop offset="50%" stopColor="#bfa26a" />
            <stop offset="100%" stopColor="#9a7f4f" />
          </linearGradient>
          <pattern id="tatreezRed" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#c1272d" />
            <path d="M8 0L16 8L8 16L0 8Z" fill="#a01f24" opacity="0.5" />
            <rect x="6" y="6" width="4" height="4" fill="#f3efe7" opacity="0.3" />
          </pattern>
          <pattern id="tatreezGreen" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#0f8b5f" />
            <path d="M8 0L16 8L8 16L0 8Z" fill="#0a6b49" opacity="0.5" />
            <rect x="6" y="6" width="4" height="4" fill="#f3efe7" opacity="0.3" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circuit lines - left */}
        <motion.g
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <path d="M80 380V280M80 280H120M120 280V220M120 220H160" />
          <path d="M60 340V300M100 260V240" strokeWidth="1" opacity="0.6" />
          <circle cx="80" cy="380" r="3" fill="#bfa26a" />
          <circle cx="120" cy="280" r="2.5" fill="#bfa26a" />
          <circle cx="160" cy="220" r="2" fill="#bfa26a" />
          <rect x="118" y="218" width="4" height="4" fill="#bfa26a" opacity="0.8" />
        </motion.g>

        {/* Red tatreez block */}
        <motion.rect
          x="60"
          y="300"
          width="40"
          height="80"
          fill="url(#tatreezRed)"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Green tatreez block */}
        <motion.rect
          x="300"
          y="300"
          width="40"
          height="80"
          fill="url(#tatreezGreen)"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Main gold shape */}
        <motion.path
          d="M140 380 L140 120 L200 80 L260 120 L260 380 L220 380 L220 200 L180 200 L180 380 Z"
          fill="url(#goldGrad)"
          filter="url(#glow)"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Diamond cutout */}
        <path
          d="M190 360L200 350L210 360L200 370Z"
          fill="#050706"
          opacity="0.8"
        />
        <rect x="196" y="352" width="8" height="8" fill="#050706" opacity="0.6" transform="rotate(45 200 356)" />

        {/* Circuit lines - right */}
        <motion.g
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2, delay: 0.8 }}
        >
          <path d="M320 380V300M320 300H280M280 300V240" />
          <circle cx="320" cy="380" r="3" fill="#bfa26a" />
          <circle cx="280" cy="300" r="2" fill="#bfa26a" />
        </motion.g>

        {/* Code symbols */}
        <motion.text
          x="155"
          y="170"
          fill="#bfa26a"
          fontSize="14"
          fontFamily="monospace"
          opacity="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        >
          {"</>"}
        </motion.text>
        <motion.text
          x="230"
          y="170"
          fill="#0f8b5f"
          fontSize="12"
          fontFamily="monospace"
          opacity="0.4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.7 }}
        >
          {"{ }"}
        </motion.text>

        {/* Animated pulse on nodes */}
        <motion.circle
          cx="160"
          cy="220"
          r="6"
          fill="none"
          stroke="#bfa26a"
          strokeWidth="0.5"
          animate={{ r: [6, 12, 6], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.svg>

      {/* Decorative tatreez overlay */}
      <div className="pointer-events-none absolute -left-4 top-1/4 h-24 w-24 text-zeriv-red opacity-20">
        <TatreezPattern className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute -right-4 bottom-1/4 h-24 w-24 text-zeriv-green opacity-20">
        <TatreezPattern className="h-full w-full" />
      </div>
    </div>
  );
}
