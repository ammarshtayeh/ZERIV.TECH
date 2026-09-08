"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { TatreezLattice } from "./TatreezLattice";
import type { DeviceTier } from "../hooks/useDeviceTier";

interface Props {
  tier: DeviceTier;
  reduced: boolean;
}

/**
 * The single WebGL surface for the whole experience.
 * Fixed behind the DOM; scenes talk to it through the `xp` store, never through props.
 */
export default function ExperienceCanvas({ tier, reduced }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sync = () => setVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return (
    <div className="xp-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, tier === "high" ? 1.5 : 1.25]}
        camera={{ fov: 38, position: [0, 0, 8], near: 0.1, far: 40 }}
        gl={{
          antialias: tier !== "low",
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        frameloop={visible ? "always" : "never"}
      >
        <TatreezLattice tier={tier} reduced={reduced} />
      </Canvas>
    </div>
  );
}
