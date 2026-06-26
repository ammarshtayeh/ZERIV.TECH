"use client";

/**
 * Palestinian tatreez side borders — luxury side rail frames using generated tatreez images.
 */
import Image from "next/image";

export function TatreezSideRails() {
  return (
    <>
      {/* Left side rail */}
      <div
        className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-12 lg:block xl:w-16 border-r border-white/[0.06] bg-[#0B0B0B]"
        aria-hidden="true"
      >
        <div className="relative h-full w-full opacity-80">
          <Image
            src="/brand/tatreez_rail.png"
            alt="Left Tatreez Rail"
            fill
            className="object-cover object-left"
            priority
            sizes="(max-width: 1024px) 48px, 64px"
          />
        </div>
      </div>

      {/* Right side rail */}
      <div
        className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden w-12 lg:block xl:w-16 border-l border-white/[0.06] bg-[#0B0B0B]"
        aria-hidden="true"
      >
        <div className="relative h-full w-full opacity-80">
          <Image
            src="/brand/tatreez_rail.png"
            alt="Right Tatreez Rail"
            fill
            className="object-cover object-right scale-x-[-1]"
            priority
            sizes="(max-width: 1024px) 48px, 64px"
          />
        </div>
      </div>
    </>
  );
}
