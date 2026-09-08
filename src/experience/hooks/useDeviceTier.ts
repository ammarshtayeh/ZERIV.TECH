"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "mid" | "low";

/**
 * Coarse capability tier used to scale particle/instance counts and DPR.
 * Starts at "mid" (SSR-safe) and resolves on the client.
 */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("mid");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const width = window.innerWidth;
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    if (!fine || width < 768) {
      setTier("low");
    } else if (width < 1200 || cores <= 4 || (memory !== undefined && memory <= 4)) {
      setTier("mid");
    } else {
      setTier("high");
    }
  }, []);

  return tier;
}

export function useIsFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}
