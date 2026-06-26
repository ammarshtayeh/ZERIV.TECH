"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trash2, Palette, Play, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Motif matrices (0: empty, 1: red/thread, 2: black/stitch, 3: green)
// Center alignment helper matrices (7x7 or 5x5 centered in a 21x21 grid)
const PRESETS = {
  moon: {
    name: "قمر بيت لحم (Moon of Bethlehem)",
    englishName: "Moon of Bethlehem",
    desc: "من أشهر عروق التطريز الفلسطيني، ويرمز للنور والهداية والارتباط بجذور بيت لحم العريقة. تشير النجمة الثمانية الكنعانية إلى الكواكب والاتجاهات.",
    size: 7,
    matrix: [
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 2, 1, 0, 0],
      [0, 1, 2, 1, 2, 1, 0],
      [1, 2, 1, 0, 1, 2, 1],
      [0, 1, 2, 1, 2, 1, 0],
      [0, 0, 1, 2, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
    ],
  },
  cypress: {
    name: "شجرة السرو (Cypress Tree)",
    englishName: "Cypress Tree",
    desc: "رمز فلسطيني قديم يعبّر عن الصمود، البقاء والارتباط العميق بالأرض والوطن. تُطرز أشجار السرو على جوانب الأثواب لتمثّل خطوط الحماية الطبيعية.",
    size: 7,
    matrix: [
      [0, 0, 0, 3, 0, 0, 0],
      [0, 0, 3, 3, 3, 0, 0],
      [0, 3, 3, 3, 3, 3, 0],
      [3, 3, 3, 3, 3, 3, 3],
      [0, 3, 3, 3, 3, 3, 0],
      [0, 0, 3, 3, 3, 0, 0],
      [0, 0, 0, 3, 0, 0, 0],
    ],
  },
  diamond: {
    name: "سلسلة المعين (Diamond Chain)",
    englishName: "Diamond Chain",
    desc: "شكل هندسي كنعاني يرمز إلى درء الحسد والحماية والترابط الأسري والمجتمعي المستمر. تعكس الزوايا المتناظرة دقة الصانع والتوازن الحياتي.",
    size: 5,
    matrix: [
      [0, 0, 1, 0, 0],
      [0, 1, 2, 1, 0],
      [1, 2, 0, 2, 1],
      [0, 1, 2, 1, 0],
      [0, 0, 1, 0, 0],
    ],
  },
};

const GRID_SIZE = 21;
const COLORS = [
  { name: "أحمر كنعاني", hex: "#ce1126", id: 1 },
  { name: "أخضر زيتوني", hex: "#007a3d", id: 3 },
  { name: "أبيض ناصع", hex: "#ffffff", id: 4 },
  { name: "أسود داكن", hex: "#1a1a1a", id: 2 },
];

export function InteractiveTatreez() {
  const [grid, setGrid] = useState<number[][]>(() =>
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
  );
  const [selectedColor, setSelectedColor] = useState(1); // color ID (1: red, 3: green, 4: white, 2: black)
  const [isDrawing, setIsDrawing] = useState(false);
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS | null>(null);
  const [isWeaving, setIsWeaving] = useState(false);
  const weaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear grid helper
  const clearGrid = () => {
    if (weaveTimeoutRef.current) clearTimeout(weaveTimeoutRef.current);
    setIsWeaving(false);
    setActivePreset(null);
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0)));
  };

  // Get color hex by ID
  const getColorHex = (id: number) => {
    switch (id) {
      case 1: return "#ce1126"; // red
      case 2: return "#1a1a1a"; // black
      case 3: return "#007a3d"; // green
      case 4: return "#ffffff"; // white
      default: return "transparent";
    }
  };

  // Handle cell click/drag
  const handleCellInteraction = (r: number, c: number) => {
    if (isWeaving) return;
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = newGrid[r][c] === selectedColor ? 0 : selectedColor;
    setGrid(newGrid);
  };

  const handleMouseEnterCell = (r: number, c: number) => {
    if (isDrawing && !isWeaving) {
      const newGrid = grid.map((row) => [...row]);
      newGrid[r][c] = selectedColor;
      setGrid(newGrid);
    }
  };

  // Weave preset animation
  const weavePreset = (key: keyof typeof PRESETS) => {
    if (weaveTimeoutRef.current) clearTimeout(weaveTimeoutRef.current);
    setIsWeaving(true);
    setActivePreset(key);

    const preset = PRESETS[key];
    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
    setGrid(newGrid);

    // Calculate centering offset
    const offset = Math.floor((GRID_SIZE - preset.size) / 2);
    const stitchesToMake: { r: number; c: number; val: number }[] = [];

    for (let r = 0; r < preset.size; r++) {
      for (let c = 0; c < preset.size; c++) {
        const val = preset.matrix[r][c];
        if (val > 0) {
          stitchesToMake.push({ r: r + offset, c: c + offset, val });
        }
      }
    }

    // Sort stitches so they draw from center outwards
    stitchesToMake.sort((a, b) => {
      const center = GRID_SIZE / 2;
      const distA = Math.hypot(a.r - center, a.c - center);
      const distB = Math.hypot(b.r - center, b.c - center);
      return distA - distB;
    });

    let currentStep = 0;
    const drawNextStitch = () => {
      if (currentStep >= stitchesToMake.length) {
        setIsWeaving(false);
        return;
      }

      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        const stitch = stitchesToMake[currentStep];
        next[stitch.r][stitch.c] = stitch.val;
        return next;
      });

      currentStep++;
      weaveTimeoutRef.current = setTimeout(drawNextStitch, 80);
    };

    drawNextStitch();
  };

  useEffect(() => {
    return () => {
      if (weaveTimeoutRef.current) clearTimeout(weaveTimeoutRef.current);
    };
  }, []);

  return (
    <div className="mt-12 rounded-2xl border border-zeriv-border bg-zeriv-card/40 p-4 sm:p-8 backdrop-blur-md">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        
        {/* Left Column: Interactive Canvas */}
        <div className="flex flex-col items-center">
          <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-4">
            {/* Color Palette selectors */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zeriv-muted flex items-center gap-1">
                <Palette className="h-3.5 w-3.5" />
                خيط التطريز:
              </span>
              <div className="flex gap-1.5">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={cn(
                      "h-6 w-6 rounded-full border border-white/20 transition-all hover:scale-110 cursor-pointer",
                      selectedColor === c.id ? "ring-2 ring-zeriv-red ring-offset-2 ring-offset-black" : "opacity-80"
                    )}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Clear Board */}
            <button
              onClick={clearGrid}
              className="flex items-center gap-1.5 rounded-lg border border-zeriv-border bg-zeriv-surface px-3 py-1.5 text-xs font-medium text-zeriv-muted hover:border-zeriv-red/40 hover:text-zeriv-red transition-all cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              مسح اللوحة
            </button>
          </div>

          {/* Grid Canvas Wrapper */}
          <div 
            className="relative aspect-square w-full max-w-[420px] rounded-xl border border-zeriv-border/80 bg-[#f4f1ea] dark:bg-[#0f1411] p-2.5 shadow-2xl overflow-hidden select-none"
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
          >
            {/* Fabric Grid lines */}
            <div className="absolute inset-0 grid grid-cols-21 pointer-events-none opacity-[0.03] dark:opacity-[0.07]">
              {Array(GRID_SIZE * GRID_SIZE).fill(null).map((_, i) => (
                <div key={i} className="border border-white" />
              ))}
            </div>

            {/* Interactive Grid cells */}
            <div className="grid grid-cols-21 gap-[1px] h-full w-full">
              {grid.map((row, r) =>
                row.map((cell, c) => (
                  <div
                    key={`${r}-${c}`}
                    className={cn(
                      "relative flex items-center justify-center aspect-square rounded-[1px] cursor-crosshair transition-colors duration-100",
                      cell === 0 ? "hover:bg-white/[0.04]" : ""
                    )}
                    onMouseDown={() => handleCellInteraction(r, c)}
                    onMouseEnter={() => handleMouseEnterCell(r, c)}
                  >
                    {cell > 0 && (
                      <svg className="absolute h-[85%] w-[85%] animate-fade-in" viewBox="0 0 10 10">
                        <line
                          x1="1.5"
                          y1="1.5"
                          x2="8.5"
                          y2="8.5"
                          stroke={getColorHex(cell)}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <line
                          x1="8.5"
                          y1="1.5"
                          x2="1.5"
                          y2="8.5"
                          stroke={getColorHex(cell)}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                ))
              )}
            </div>
            
            {isWeaving && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                <span className="flex items-center gap-2 rounded-full bg-zeriv-red px-4 py-2 text-xs font-bold text-white shadow-lg animate-pulse">
                  <Sparkles className="h-3.5 w-3.5 animate-spin" />
                  جاري نسج النقش التراثي...
                </span>
              </div>
            )}
          </div>
          <p className="mt-3 text-[11px] text-zeriv-muted text-center">
            * اضغط مع السحب لتطريز الغرز بشكل حر. انقر على الغرزة لإلغائها.
          </p>
        </div>

        {/* Right Column: Cultural Presets & Storytelling */}
        <div className="flex flex-col justify-between text-right">
          <div>
            <h3 className="font-display text-lg font-bold text-zeriv-offwhite flex items-center justify-start gap-2 flex-row-reverse">
              <Sparkles className="h-5 w-5 text-zeriv-red" />
              عروق ونقوش التطريز
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-zeriv-muted">
              اختر أحد الأنماط الفلسطينية العريقة لمشاهدة محاكاة نسجه وغرزه على لوحة القماش الرقمية، واقرأ عن رمزيته ودوره في الثقافة الوطنية.
            </p>

            {/* Presets Cards */}
            <div className="mt-4 space-y-3">
              {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((key) => {
                const preset = PRESETS[key];
                const isActive = activePreset === key;
                return (
                  <button
                    key={key}
                    onClick={() => weavePreset(key)}
                    disabled={isWeaving}
                    className={cn(
                      "w-full text-right p-4 rounded-xl border transition-all duration-300 cursor-pointer",
                      isActive
                        ? "border-zeriv-red bg-zeriv-red/5 shadow-md shadow-zeriv-red/10"
                        : "border-zeriv-border bg-zeriv-surface/40 hover:border-white/20 hover:bg-zeriv-surface"
                    )}
                  >
                    <div className="flex items-center justify-between flex-row-reverse">
                      <h4 className={cn("text-sm font-semibold", isActive ? "text-zeriv-red" : "text-zeriv-offwhite")}>
                        {preset.name}
                      </h4>
                      <span className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full text-xs transition-colors",
                        isActive ? "bg-zeriv-red text-white" : "bg-zeriv-border text-zeriv-muted"
                      )}>
                        <Play className="h-3 w-3 fill-current" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Preset Description Card */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {activePreset ? (
                <motion.div
                  key={activePreset}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-xl border border-zeriv-red/20 bg-zeriv-red/5 p-4"
                >
                  <div className="flex items-start gap-2.5 flex-row-reverse text-right">
                    <Info className="h-5 w-5 text-zeriv-red shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-zeriv-red">المعنى الثقافي للعرِق</h5>
                      <p className="font-heritage mt-2 text-sm leading-[1.8] text-zeriv-offwhite/90">
                        {PRESETS[activePreset].desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-xl border border-zeriv-border bg-zeriv-surface/20 p-4 border-dashed text-center py-8">
                  <p className="text-xs text-zeriv-muted">
                    اختر نقشاً من الأعلى لنسجه، أو ابدأ بالتطريز اليدوي والابتكار على اللوحة!
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
