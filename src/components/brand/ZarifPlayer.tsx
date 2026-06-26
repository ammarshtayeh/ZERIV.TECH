"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Volume2, Music } from "lucide-react";
import { cn } from "@/lib/utils";

// Frequencies for D Bayati Maqam (approx quarter tones for authentic flavor!)
const FREQS: Record<string, number> = {
  "D4": 293.66,
  "Ed4": 320.00, // E half-flat (Sika) - quarter tone between Eb and E
  "F4": 349.23,
  "G4": 392.00,
  "A4": 440.00,
  "Bb4": 466.16,
  "C5": 523.25,
  "D5": 587.33,
  "REST": 0,
};

const MELODY = [
  { note: "A4", dur: 0.5 }, { note: "G4", dur: 0.25 }, { note: "A4", dur: 0.25 },
  { note: "G4", dur: 0.5 }, { note: "F4", dur: 0.25 }, { note: "G4", dur: 0.25 },
  { note: "F4", dur: 0.5 }, { note: "Ed4", dur: 0.25 }, { note: "F4", dur: 0.25 },
  { note: "Ed4", dur: 0.25 }, { note: "D4", dur: 0.25 }, { note: "Ed4", dur: 0.25 }, { note: "F4", dur: 0.25 },
  { note: "G4", dur: 0.5 }, { note: "A4", dur: 0.5 },
  
  { note: "A4", dur: 0.5 }, { note: "G4", dur: 0.25 }, { note: "A4", dur: 0.25 },
  { note: "C5", dur: 0.5 }, { note: "Bb4", dur: 0.25 }, { note: "A4", dur: 0.25 },
  { note: "G4", dur: 0.5 }, { note: "F4", dur: 0.25 }, { note: "G4", dur: 0.25 },
  { note: "F4", dur: 0.5 }, { note: "Ed4", dur: 0.25 }, { note: "D4", dur: 0.25 },
  { note: "D4", dur: 1.0 }, { note: "REST", dur: 0.5 }
];

export function ZarifPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [currentNote, setCurrentNote] = useState<string>("");
  const [visHeights, setVisHeights] = useState<number[]>(Array(12).fill(0));

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const sequencerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);

  // Initialize Web Audio graph
  const initAudio = () => {
    if (audioCtxRef.current) return;

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNodeRef.current = gainNode;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyserRef.current = analyser;

    // Echo effect (Delay)
    const delayNode = ctx.createDelay(1.0);
    delayNode.delayTime.value = 0.35;
    const feedbackNode = ctx.createGain();
    feedbackNode.gain.value = 0.3; // feedback level

    // Connect delay circuit
    gainNode.connect(delayNode);
    delayNode.connect(feedbackNode);
    feedbackNode.connect(delayNode); // feedback loop
    
    // Connect to destination
    gainNode.connect(analyser);
    delayNode.connect(analyser);
    analyser.connect(ctx.destination);
  };

  // Play a single note synthesis
  const playPitch = (freq: number, durationSec: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx || freq === 0) return;

    // Create woodwind (Ney-like) sound synthesis
    const osc = ctx.createOscillator();
    osc.type = "triangle"; // soft, reed-like
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Filter to cut off harsh high harmonics
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(1.0, ctx.currentTime);

    // LFO for breathy vibrato
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 5.5; // vibrato speed (Hz)
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 4; // pitch variance in Hz

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    // Envelope for note onset/decay
    const envelope = ctx.createGain();
    envelope.gain.setValueAtTime(0, ctx.currentTime);
    envelope.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.05); // slight attack
    envelope.gain.setValueAtTime(0.35, ctx.currentTime + durationSec - 0.06);
    envelope.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec); // decay

    // Connections
    osc.connect(filter);
    filter.connect(envelope);
    envelope.connect(gainNodeRef.current!);

    // Start & Stop
    lfo.start(ctx.currentTime);
    osc.start(ctx.currentTime);

    lfo.stop(ctx.currentTime + durationSec);
    osc.stop(ctx.currentTime + durationSec);
  };

  // Step through the melody sequence
  const startSequencer = () => {
    let stepIndex = 0;

    const playNextStep = () => {
      if (!isPlayingRef.current) return;

      const step = MELODY[stepIndex];
      setCurrentNote(step.note);

      if (step.note !== "REST") {
        playPitch(FREQS[step.note], step.dur);
      }

      stepIndex = (stepIndex + 1) % MELODY.length;
      sequencerTimeoutRef.current = setTimeout(playNextStep, step.dur * 1000);
    };

    playNextStep();
  };

  // Animate the visualizer
  const updateVisualizer = useCallback(() => {
    if (!isPlayingRef.current) {
      setVisHeights(Array(12).fill(0).map(() => Math.max(0, Math.random() * 0.1)));
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
      return;
    }

    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Map frequency data to our 12 visualizer bars
      const newHeights = Array(12).fill(0).map((_, i) => {
        const index = Math.floor((i / 12) * dataArray.length);
        const val = dataArray[index] / 255; // 0 to 1
        return Math.max(1, Math.floor(val * 8)); // scale to 0-8 stitches
      });
      setVisHeights(newHeights);
    }

    animationFrameRef.current = requestAnimationFrame(updateVisualizer);
  }, []);

  const handlePlayToggle = async () => {
    if (isPlaying) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      setCurrentNote("");
      if (sequencerTimeoutRef.current) clearTimeout(sequencerTimeoutRef.current);
      if (audioCtxRef.current) {
        await audioCtxRef.current.suspend();
      }
    } else {
      initAudio();
      isPlayingRef.current = true;
      setIsPlaying(true);
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }
      startSequencer();
    }
  };

  useEffect(() => {
    // Start idle visualizer animation loop
    updateVisualizer();

    return () => {
      isPlayingRef.current = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (sequencerTimeoutRef.current) clearTimeout(sequencerTimeoutRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [updateVisualizer]);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  return (
    <div className="mt-8 rounded-xl border border-zeriv-red/25 bg-zeriv-red/5 p-5 text-right relative overflow-hidden select-none">
      
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] tatreez-bg-pattern pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Visualizer: Tatreez cross-stitch waves */}
        <div className="flex items-end gap-1.5 h-16 order-2 md:order-1" dir="ltr">
          {visHeights.map((h, i) => (
            <div key={i} className="flex flex-col gap-0.5 w-3.5 items-center justify-end h-full">
              {Array(8).fill(null).map((_, idx) => {
                const stitchIndex = 7 - idx;
                const isLit = isPlaying ? stitchIndex < h : Math.sin(Date.now() / 200 + i) * 3 + 4 > stitchIndex;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "w-2.5 h-1.5 rounded-[1px] transition-all duration-150 flex items-center justify-center",
                      isLit
                        ? "bg-zeriv-red shadow-sm shadow-zeriv-red/50 scale-105"
                        : "bg-white/[0.04]"
                    )}
                  >
                    {isLit && (
                      <span className="text-[7px] text-white leading-none font-bold select-none">×</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center md:items-end gap-3 order-1 md:order-2 w-full md:w-auto">
          <div className="flex items-center gap-3">
            {currentNote && (
              <span className="animate-pulse rounded bg-zeriv-red/10 border border-zeriv-red/20 px-2 py-0.5 font-mono text-[10px] text-zeriv-red">
                {currentNote === "Ed4" ? "E½♭" : currentNote}
              </span>
            )}
            <span className="text-xs text-zeriv-offwhite/70 font-heritage flex items-center gap-1.5 flex-row-reverse">
              <Music className="h-3.5 w-3.5 text-zeriv-red" />
              عزف لحن زريف الطول
            </span>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-center">
            {/* Volume Control */}
            <div className="flex items-center gap-2" dir="ltr">
              <Volume2 className="h-4 w-4 text-zeriv-muted" />
              <input
                type="range"
                min="0"
                max="0.8"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 sm:w-20 accent-zeriv-red bg-white/10 rounded-lg appearance-none h-1 cursor-pointer"
              />
            </div>

            {/* Play Button */}
            <button
              onClick={handlePlayToggle}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full text-white transition-all shadow-md cursor-pointer",
                isPlaying
                  ? "bg-zeriv-red shadow-zeriv-red/30 hover:bg-zeriv-red-deep scale-95"
                  : "bg-zeriv-green shadow-zeriv-green/30 hover:bg-zeriv-green-light scale-100"
              )}
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
