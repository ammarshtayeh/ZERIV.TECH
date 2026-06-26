"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function IntroConstruction({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"stitch" | "trace" | "reveal" | "complete">("stitch");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("trace"), 1500);
    const t2 = setTimeout(() => setPhase("reveal"), 3500);
    const t3 = setTimeout(() => {
      setPhase("complete");
      onComplete();
    }, 5000);

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
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ background: "#050706" }}
        >
          {/* Ambient glow behind everything */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 2 }}
            style={{
              position: "absolute",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />

          {/* Main visual area */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: 400, height: 400 }}
          >
            {/* ── Phase 1: Tatreez Diamond Bloom ── */}
            <AnimatePresence>
              {phase === "stitch" && (
                <motion.div
                  key="stitch"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    fill="none"
                    style={{ overflow: "visible" }}
                  >
                    <defs>
                      <linearGradient id="gold-stitch" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#F5D98A" />
                      </linearGradient>
                      <filter id="stitch-glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Center diamond — deep red */}
                    <motion.path
                      d="M 100 70 L 130 100 L 100 130 L 70 100 Z"
                      stroke="#8b1538"
                      strokeWidth="2"
                      fill="none"
                      filter="url(#stitch-glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />

                    {/* Inner diamond — gold */}
                    <motion.path
                      d="M 100 80 L 120 100 L 100 120 L 80 100 Z"
                      stroke="url(#gold-stitch)"
                      strokeWidth="1.5"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    />

                    {/* Tiny center diamond — deep red filled */}
                    <motion.path
                      d="M 100 92 L 108 100 L 100 108 L 92 100 Z"
                      fill="#8b1538"
                      stroke="#8b1538"
                      strokeWidth="0.5"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                    />

                    {/* Cross-stitch X marks around diamond */}
                    {[
                      { x: 100, y: 55 },
                      { x: 145, y: 100 },
                      { x: 100, y: 145 },
                      { x: 55, y: 100 },
                    ].map((pos, i) => (
                      <motion.g
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.8, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.12, duration: 0.4, type: "spring" }}
                      >
                        <line
                          x1={pos.x - 4}
                          y1={pos.y - 4}
                          x2={pos.x + 4}
                          y2={pos.y + 4}
                          stroke="#D4AF37"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <line
                          x1={pos.x + 4}
                          y1={pos.y - 4}
                          x2={pos.x - 4}
                          y2={pos.y + 4}
                          stroke="#D4AF37"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </motion.g>
                    ))}

                    {/* Corner stitch accents — deep red */}
                    {[
                      { x: 70, y: 70 },
                      { x: 130, y: 70 },
                      { x: 130, y: 130 },
                      { x: 70, y: 130 },
                    ].map((pos, i) => (
                      <motion.g
                        key={`corner-${i}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{ delay: 0.7 + i * 0.1, duration: 0.3, type: "spring" }}
                      >
                        <line
                          x1={pos.x - 3}
                          y1={pos.y - 3}
                          x2={pos.x + 3}
                          y2={pos.y + 3}
                          stroke="#8b1538"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <line
                          x1={pos.x + 3}
                          y1={pos.y - 3}
                          x2={pos.x - 3}
                          y2={pos.y + 3}
                          stroke="#8b1538"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </motion.g>
                    ))}

                    {/* Pulsing glow on the center */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="18"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      initial={{ opacity: 0, r: 10 }}
                      animate={{ opacity: [0, 0.4, 0], r: [10, 25, 30] }}
                      transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Phase 2: Golden Geometric Trace ── */}
            <AnimatePresence>
              {phase === "trace" && (
                <motion.div
                  key="trace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.6 } }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg
                    width="400"
                    height="400"
                    viewBox="0 0 400 400"
                    fill="none"
                    style={{ overflow: "visible" }}
                  >
                    <defs>
                      <linearGradient id="gold-beam" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="50%" stopColor="#F5D98A" />
                        <stop offset="100%" stopColor="#D4AF37" />
                      </linearGradient>
                      <linearGradient id="gold-beam-v" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="50%" stopColor="#F5D98A" />
                        <stop offset="100%" stopColor="#D4AF37" />
                      </linearGradient>
                      <filter id="beam-glow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Central diamond morphing/scaling up */}
                    <motion.path
                      d="M 200 160 L 240 200 L 200 240 L 160 200 Z"
                      stroke="#8b1538"
                      strokeWidth="1.5"
                      fill="rgba(139, 21, 56, 0.08)"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{ transformOrigin: "200px 200px" }}
                    />
                    <motion.path
                      d="M 200 175 L 225 200 L 200 225 L 175 200 Z"
                      stroke="#D4AF37"
                      strokeWidth="1"
                      fill="none"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.7 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                      style={{ transformOrigin: "200px 200px" }}
                    />

                    {/* Cardinal beams — gold gradient */}
                    {[
                      "M 200 160 L 200 20",
                      "M 200 240 L 200 380",
                      "M 160 200 L 20 200",
                      "M 240 200 L 380 200",
                    ].map((d, i) => (
                      <motion.path
                        key={`beam-${i}`}
                        d={d}
                        stroke="url(#gold-beam)"
                        strokeWidth="1.2"
                        filter="url(#beam-glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.7 }}
                        transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                      />
                    ))}

                    {/* Diagonal beams */}
                    {[
                      "M 170 170 L 60 60",
                      "M 230 170 L 340 60",
                      "M 170 230 L 60 340",
                      "M 230 230 L 340 340",
                    ].map((d, i) => (
                      <motion.path
                        key={`diag-${i}`}
                        d={d}
                        stroke="url(#gold-beam)"
                        strokeWidth="0.8"
                        filter="url(#beam-glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                      />
                    ))}

                    {/* Secondary branching lines */}
                    {[
                      "M 200 80 L 160 40",
                      "M 200 80 L 240 40",
                      "M 200 320 L 160 360",
                      "M 200 320 L 240 360",
                      "M 80 200 L 40 160",
                      "M 80 200 L 40 240",
                      "M 320 200 L 360 160",
                      "M 320 200 L 360 240",
                    ].map((d, i) => (
                      <motion.path
                        key={`branch-${i}`}
                        d={d}
                        stroke="#D4AF37"
                        strokeWidth="0.6"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.9 + i * 0.05, ease: "easeOut" }}
                      />
                    ))}

                    {/* Terminal dots at beam ends */}
                    {[
                      [200, 20], [200, 380], [20, 200], [380, 200],
                      [60, 60], [340, 60], [60, 340], [340, 340],
                    ].map(([cx, cy], i) => (
                      <motion.circle
                        key={`dot-${i}`}
                        cx={cx}
                        cy={cy}
                        r="2"
                        fill="#D4AF37"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.06, duration: 0.3, type: "spring" }}
                      />
                    ))}

                    {/* Outer rotating ring */}
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="170"
                      stroke="#D4AF37"
                      strokeWidth="0.4"
                      strokeDasharray="4 8"
                      fill="none"
                      initial={{ opacity: 0, rotate: 0 }}
                      animate={{ opacity: 0.2, rotate: 45 }}
                      transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
                      style={{ transformOrigin: "200px 200px" }}
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Phase 3: Logo Reveal ── */}
            <AnimatePresence>
              {phase === "reveal" && (
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.8 } }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  {/* Golden glow behind logo */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      width: 220,
                      height: 220,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #D4AF37 0%, rgba(212,175,55,0.1) 50%, transparent 70%)",
                      filter: "blur(30px)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Logo image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src="/brand/logo.png"
                      alt="ZERIV"
                      width={160}
                      height={160}
                      priority
                      style={{ objectFit: "contain" }}
                    />
                  </motion.div>

                  {/* ZERIV TECH subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.4, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    style={{
                      marginTop: 20,
                      fontSize: 11,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#D4AF37",
                      fontWeight: 300,
                    }}
                  >
                    ZERIV TECH
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip Button */}
          <button
            onClick={() => {
              setPhase("complete");
              onComplete();
            }}
            style={{
              position: "absolute",
              bottom: 32,
              right: 32,
              padding: "6px 20px",
              borderRadius: 999,
              border: "1px solid rgba(212, 175, 55, 0.3)",
              background: "rgba(212, 175, 55, 0.05)",
              color: "rgba(212, 175, 55, 0.6)",
              fontSize: 12,
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.6)";
              e.currentTarget.style.color = "rgba(212, 175, 55, 0.9)";
              e.currentTarget.style.background = "rgba(212, 175, 55, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.3)";
              e.currentTarget.style.color = "rgba(212, 175, 55, 0.6)";
              e.currentTarget.style.background = "rgba(212, 175, 55, 0.05)";
            }}
          >
            تخطي
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
