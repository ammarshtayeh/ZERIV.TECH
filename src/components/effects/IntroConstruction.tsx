"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroConstruction({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"stitch" | "logo" | "grid" | "complete">("stitch");

  useEffect(() => {
    // Stage 1: Single stitch appears, then grows (1.2s)
    const t1 = setTimeout(() => {
      setPhase("logo");
    }, 1500);

    // Stage 2: Logo constructs via PCB lines (2s)
    const t2 = setTimeout(() => {
      setPhase("grid");
    }, 3800);

    // Stage 3: Lines expand to form screen grid (1.2s)
    const t3 = setTimeout(() => {
      setPhase("complete");
      onComplete();
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050706] text-white select-none"
        >
          {/* Main Visual Arena */}
          <div className="relative flex h-[350px] w-[350px] items-center justify-center">
            
            {/* Phase 1: Tatreez Cross-Stitch Blooming */}
            {phase === "stitch" && (
              <div className="flex flex-col gap-1 items-center justify-center">
                {/* Growing cross-stitch lattice */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex gap-2"
                >
                  <Stitch color="#ce1126" delay={0} />
                  <Stitch color="#ce1126" delay={0.2} />
                  <Stitch color="#ce1126" delay={0.4} />
                </motion.div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex gap-2 mt-1"
                >
                  <Stitch color="#007a3d" delay={0.5} />
                  <Stitch color="#bfa26a" delay={0.7} />
                  <Stitch color="#007a3d" delay={0.5} />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="absolute bottom-[-40px] text-[10px] tracking-[0.2em] font-mono text-zeriv-red"
                >
                  [STITCHING_IDENTITY]
                </motion.p>
              </div>
            )}

            {/* Phase 2 & 3: Logo Outline Drawing & PCB Tracing */}
            {(phase === "logo" || phase === "grid") && (
              <svg className="h-full w-full" viewBox="0 0 400 400" fill="none">
                <defs>
                  {/* Glowing filter */}
                  <filter id="glow-intro" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4bc8a" />
                    <stop offset="100%" stopColor="#bfa26a" />
                  </linearGradient>
                </defs>

                {/* PCB trace lines drawing outward from central logo */}
                <motion.g
                  stroke="var(--color-zeriv-green)"
                  strokeWidth="1.2"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <path d="M 200 200 L 200 40M 200 200 L 200 360M 200 200 L 40 200M 200 200 L 360 200" />
                  <path d="M 200 200 L 90 90M 200 200 L 310 90M 200 200 L 90 310M 200 200 L 310 310" />
                </motion.g>

                {/* Secondary trace branches */}
                <motion.g
                  stroke="#ce1126"
                  strokeWidth="1"
                  opacity="0.25"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
                >
                  <path d="M 90 90 L 90 40 H 40M 310 90 L 310 40 H 360M 90 310 L 90 360 H 40M 310 310 L 310 360 H 360" />
                </motion.g>

                {/* ZERIV Arch Logo Construction */}
                <motion.path
                  d="M 150 280 L 150 160 L 200 120 L 250 160 L 250 280 L 220 280 L 220 200 L 180 200 L 180 280 Z"
                  stroke="url(#gold-grad)"
                  strokeWidth="2.5"
                  filter="url(#glow-intro)"
                  initial={{ pathLength: 0, fill: "rgba(191, 162, 106, 0)" }}
                  animate={{ 
                    pathLength: 1, 
                    fill: phase === "grid" ? "rgba(191, 162, 106, 0.08)" : "rgba(191, 162, 106, 0)"
                  }}
                  transition={{ 
                    pathLength: { duration: 2.2, ease: "easeInOut" },
                    fill: { duration: 1 } 
                  }}
                />

                {/* Little center Diamond core */}
                <motion.path
                  d="M 195 180 L 200 175 L 205 180 L 200 185 Z"
                  fill="#ce1126"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                />

                {/* Phase 3: Grid Expansion */}
                {phase === "grid" && (
                  <motion.g
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Shoot gridlines outward */}
                    <motion.line x1="0" y1="40" x2="400" y2="40" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                    <motion.line x1="0" y1="360" x2="400" y2="360" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                    <motion.line x1="40" y1="0" x2="40" y2="400" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                    <motion.line x1="360" y1="0" x2="360" y2="400" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                  </motion.g>
                )}
              </svg>
            )}

            {phase === "grid" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="absolute bottom-[-40px] text-[10px] tracking-[0.2em] font-mono text-[#bfa26a]"
              >
                [GRID_ESTABLISHED]
              </motion.p>
            )}
          </div>

          {/* Skip Button */}
          <button
            onClick={() => {
              setPhase("complete");
              onComplete();
            }}
            className="absolute bottom-8 right-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono text-white/50 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            تخطي العرض [SKIP_INTRO] →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stitch({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, type: "spring" }}
      className="h-5 w-5"
      viewBox="0 0 10 10"
    >
      <line x1="1" y1="1" x2="9" y2="9" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9" y1="1" x2="1" y2="9" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </motion.svg>
  );
}
