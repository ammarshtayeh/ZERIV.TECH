"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg flex items-center justify-center">
      {/* Ambient glows in flag colors */}
      <div className="absolute inset-0 rounded-full bg-[#ce1126]/5 blur-[80px]" />
      <div className="absolute inset-8 rounded-full bg-[#007a3d]/5 blur-[60px]" />

      {/* SVG Canvas with Tatreez Pattern Background */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern id="tatreezBg" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            {/* Draw a repeating Palestinian cross-stitch diamond motif */}
            <g opacity="0.15">
              {/* Center cross stitch */}
              <line x1="12" y1="12" x2="20" y2="20" stroke="#ce1126" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="20" y1="12" x2="12" y2="20" stroke="#ce1126" strokeWidth="1.8" strokeLinecap="round" />
              
              {/* Outer diamond cross stitches */}
              {/* Top node */}
              <line x1="12" y1="2" x2="20" y2="10" stroke="#8b1538" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="20" y1="2" x2="12" y2="10" stroke="#8b1538" strokeWidth="1.2" strokeLinecap="round" />

              {/* Left node */}
              <line x1="2" y1="12" x2="10" y2="20" stroke="#8b1538" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="10" y1="12" x2="2" y2="20" stroke="#8b1538" strokeWidth="1.2" strokeLinecap="round" />

              {/* Right node */}
              <line x1="22" y1="12" x2="30" y2="20" stroke="#8b1538" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="30" y1="12" x2="22" y2="20" stroke="#8b1538" strokeWidth="1.2" strokeLinecap="round" />

              {/* Bottom node */}
              <line x1="12" y1="22" x2="20" y2="30" stroke="#8b1538" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="20" y1="22" x2="12" y2="30" stroke="#8b1538" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          </pattern>
        </defs>
        
        {/* Repeating background pattern fill */}
        <rect width="400" height="400" fill="url(#tatreezBg)" className="rounded-3xl" />
        
        {/* Subtle card outline */}
        <rect x="2" y="2" width="396" height="396" rx="24" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
      </svg>

      {/* Massive Center Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[240px] h-[240px] drop-shadow-[0_0_35px_rgba(206,17,38,0.2)]"
      >
        <Image
          src="/brand/logo.png"
          alt="ZERIV TECH Logo"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
