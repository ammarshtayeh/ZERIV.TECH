"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function IntroConstruction({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"stitch" | "trace" | "reveal" | "complete">("stitch");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("trace"), 1200);
    const t2 = setTimeout(() => setPhase("reveal"), 2800);
    const t3 = setTimeout(() => {
      setPhase("complete");
      onComplete();
    }, 4400);

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ background: "#050706" }}
        >
          {/* Ambient flag-colored glows behind everything */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5 }}
            style={{
              position: "absolute",
              width: 700,
              height: 700,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(206,17,38,0.2) 0%, rgba(0,122,61,0.1) 40%, transparent 70%)",
              filter: "blur(90px)",
              pointerEvents: "none",
            }}
          />

          {/* Main visual area */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: 450, height: 450 }}
          >
            {/* ── Phase 1: Tatreez Diamond Bloom ── */}
            <AnimatePresence>
              {phase === "stitch" && (
                <motion.div
                  key="stitch"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg
                    width="240"
                    height="240"
                    viewBox="0 0 200 200"
                    fill="none"
                    style={{ overflow: "visible" }}
                  >
                    <defs>
                      <linearGradient id="flag-stitch-red" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ce1126" />
                        <stop offset="100%" stopColor="#9d0c1b" />
                      </linearGradient>
                      <linearGradient id="flag-stitch-green" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#007a3d" />
                        <stop offset="100%" stopColor="#00994d" />
                      </linearGradient>
                      <filter id="stitch-glow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Center diamond — deep red */}
                    <motion.path
                      d="M 100 60 L 140 100 L 100 140 L 60 100 Z"
                      stroke="url(#flag-stitch-red)"
                      strokeWidth="2.5"
                      fill="none"
                      filter="url(#stitch-glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />

                    {/* Inner diamond — green */}
                    <motion.path
                      d="M 100 75 L 125 100 L 100 125 L 75 100 Z"
                      stroke="url(#flag-stitch-green)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    />

                    {/* Tiny center diamond — white filled */}
                    <motion.path
                      d="M 100 90 L 110 100 L 100 110 L 90 100 Z"
                      fill="#ffffff"
                      stroke="#ffffff"
                      strokeWidth="0.5"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.9 }}
                      transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
                    />

                    {/* Cross-stitch X marks around diamond (Palestinian Flag Colors) */}
                    {[
                      { x: 100, y: 40, color: "#ce1126" },
                      { x: 160, y: 100, color: "#007a3d" },
                      { x: 100, y: 160, color: "#ce1126" },
                      { x: 40, y: 100, color: "#007a3d" },
                    ].map((pos, i) => (
                      <motion.g
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.9, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.3, type: "spring" }}
                      >
                        <line
                          x1={pos.x - 5}
                          y1={pos.y - 5}
                          x2={pos.x + 5}
                          y2={pos.y + 5}
                          stroke={pos.color}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1={pos.x + 5}
                          y1={pos.y - 5}
                          x2={pos.x - 5}
                          y2={pos.y + 5}
                          stroke={pos.color}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </motion.g>
                    ))}
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Phase 2: Flag Color Geometric Trace (8-pointed Bethlehem Star) ── */}
            <AnimatePresence>
              {phase === "trace" && (
                <motion.div
                  key="trace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
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
                      <linearGradient id="red-beam" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ce1126" />
                        <stop offset="100%" stopColor="#9d0c1b" />
                      </linearGradient>
                      <linearGradient id="green-beam" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#007a3d" />
                        <stop offset="100%" stopColor="#00994d" />
                      </linearGradient>
                      <filter id="beam-glow">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Central diamond scaling up */}
                    <motion.path
                      d="M 200 150 L 250 200 L 200 250 L 150 200 Z"
                      stroke="#ce1126"
                      strokeWidth="2"
                      fill="rgba(206, 17, 38, 0.05)"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{ transformOrigin: "200px 200px" }}
                    />
                    <motion.path
                      d="M 200 170 L 230 200 L 200 230 L 170 200 Z"
                      stroke="#007a3d"
                      strokeWidth="1.5"
                      fill="none"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                      style={{ transformOrigin: "200px 200px" }}
                    />

                    {/* 8-pointed Bethlehem Star Beams — alternating red & green */}
                    {[
                      { d: "M 200 150 L 200 20", stroke: "url(#red-beam)" },
                      { d: "M 235 165 L 320 80", stroke: "url(#green-beam)" },
                      { d: "M 250 200 L 380 200", stroke: "url(#red-beam)" },
                      { d: "M 235 235 L 320 320", stroke: "url(#green-beam)" },
                      { d: "M 200 250 L 200 380", stroke: "url(#red-beam)" },
                      { d: "M 165 235 L 80 320", stroke: "url(#green-beam)" },
                      { d: "M 150 200 L 20 200", stroke: "url(#red-beam)" },
                      { d: "M 165 165 L 80 80", stroke: "url(#green-beam)" },
                    ].map((beam, i) => (
                      <motion.path
                        key={`beam-${i}`}
                        d={beam.d}
                        stroke={beam.stroke}
                        strokeWidth="2"
                        filter="url(#beam-glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        transition={{ duration: 1.0, delay: 0.1 + i * 0.06, ease: "easeOut" }}
                      />
                    ))}


                    {/* Outer circle */}
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="180"
                      stroke="#ffffff"
                      strokeWidth="0.5"
                      strokeDasharray="6 12"
                      fill="none"
                      initial={{ opacity: 0, rotate: 0 }}
                      animate={{ opacity: 0.25, rotate: 90 }}
                      transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
                      style={{ transformOrigin: "200px 200px" }}
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Phase 3: Logo Reveal (Huge Size) ── */}
            <AnimatePresence>
              {phase === "reveal" && (
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.8 } }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  {/* Subtle red/green glow behind logo */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      width: 320,
                      height: 320,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(206,17,38,0.2) 0%, rgba(0,122,61,0.15) 50%, transparent 70%)",
                      filter: "blur(40px)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Logo image (MASSIVE size) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="drop-shadow-[0_0_35px_rgba(206,17,38,0.25)]"
                  >
                    <Image
                      src="/brand/logo.png"
                      alt="ZERIV"
                      width={300}
                      height={300}
                      priority
                      style={{ objectFit: "contain" }}
                    />
                  </motion.div>

                  {/* ZERIV TECH subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    style={{
                      marginTop: 24,
                      fontSize: 14,
                      letterSpacing: "0.4em",
                      textTransform: "uppercase",
                      color: "#ffffff",
                      fontWeight: 400,
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
              padding: "8px 24px",
              borderRadius: 999,
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "rgba(255, 255, 255, 0.03)",
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: 12,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(206, 17, 38, 0.6)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.background = "rgba(206, 17, 38, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
            }}
          >
            تخطي
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
