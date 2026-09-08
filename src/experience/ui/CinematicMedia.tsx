"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * One media contract for every cinematic surface on the site.
 * Swap a placeholder for a video or image sequence by changing the data — not the scene.
 */
export type MediaSource =
  | { type: "image"; src: string; alt: string }
  | {
      type: "video";
      /** mp4 / webm (transparent webm supported) */
      src: string;
      webm?: string;
      poster?: string;
      alt?: string;
    }
  | {
      type: "sequence";
      /** ordered frame URLs (webp/avif recommended) */
      frames: string[];
      fps?: number;
      alt?: string;
    }
  | { type: "none"; label?: string; ratio?: string };

interface Props {
  source: MediaSource;
  className?: string;
  /** next/image sizes hint */
  sizes?: string;
  priority?: boolean;
}

export function CinematicMedia({ source, className, sizes = "80vw", priority }: Props) {
  const cls = `xp-media${className ? ` ${className}` : ""}`;

  if (source.type === "image") {
    return (
      <figure className={cls} data-type="image">
        <Image
          src={source.src}
          alt={source.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="xp-media__img"
          draggable={false}
        />
      </figure>
    );
  }

  if (source.type === "video") return <VideoMedia source={source} className={cls} />;
  if (source.type === "sequence") return <SequenceMedia source={source} className={cls} />;

  return (
    <figure className={cls} data-type="none" aria-label={source.label ?? "Media placeholder"}>
      <div className="xp-media__ph">
        <svg className="xp-media__ph-mark" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M50 6 L94 50 L50 94 L6 50 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M19 19 H81 V81 H19 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M50 30 L70 50 L50 70 L30 50 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </svg>
        <span className="xp-label xp-media__ph-label">
          {source.label ?? "CINEMATIC MEDIA"} · {source.ratio ?? "16 : 9"}
        </span>
      </div>
    </figure>
  );
}

/* ── video: only plays while on screen ── */
function VideoMedia({
  source,
  className,
}: {
  source: Extract<MediaSource, { type: "video" }>;
  className: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={className} data-type="video">
      <video
        ref={ref}
        className="xp-media__video"
        muted
        loop
        playsInline
        preload="metadata"
        poster={source.poster}
        aria-label={source.alt}
      >
        {source.webm && <source src={source.webm} type="video/webm" />}
        <source src={source.src} type="video/mp4" />
      </video>
    </figure>
  );
}

/* ── image sequence: canvas playback, paused off-screen ── */
function SequenceMedia({
  source,
  className,
}: {
  source: Extract<MediaSource, { type: "sequence" }>;
  className: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !source.frames.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = source.frames.map((src) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
      return img;
    });
    const fps = source.fps ?? 24;
    let raf = 0;
    let start = 0;
    let running = false;

    const draw = (now: number) => {
      if (!start) start = now;
      const frame = Math.floor(((now - start) / 1000) * fps) % images.length;
      const img = images[frame];
      if (img.complete && img.naturalWidth) {
        if (canvas.width !== img.naturalWidth) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        }
        ctx.drawImage(img, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(draw);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(canvas);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [source]);

  return (
    <figure className={className} data-type="sequence">
      <canvas ref={ref} className="xp-media__canvas" aria-label={source.alt} />
    </figure>
  );
}
