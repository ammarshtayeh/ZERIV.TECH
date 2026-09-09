"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildLattice } from "../lib/octagram";
import { xp } from "../lib/experience-store";
import { latticeFragment, latticeVertex } from "./shaders";
import type { DeviceTier } from "../hooks/useDeviceTier";

const GRID: Record<DeviceTier, number> = { high: 45, mid: 33, low: 23 };

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Props {
  tier: DeviceTier;
  reduced: boolean;
}

/** Everything the choreography can ask of the object. Lerped every frame. */
interface Pose {
  x: number;
  y: number;
  z: number;
  s: number;
  wire: number;
  scatter: number;
  flow: number;
  opacity: number;
  /** extra yaw added on top of the idle spin */
  yaw: number;
  /** pitch */
  pitch: number;
  /** idle spin multiplier */
  spin: number;
}

/* per-capability personalities (Scene 03 hover) */
const SERVICE_POSE: Array<Partial<Pose>> = [
  { wire: 1, scatter: 0, flow: 0, spin: 0.6 }, // web — structural wire grid
  { wire: 0.55, scatter: 0.05, flow: 1, spin: 0.4 }, // mobile — fluid surface
  { wire: 0.75, scatter: 0.28, flow: 0.15, spin: 1 }, // ui/ux — interface geometry
  { wire: 0, scatter: 0, flow: 0, spin: 0.35 }, // branding — the solid stitched mark
  { wire: 1, scatter: 0.8, flow: 0.35, spin: 1.2 }, // ai — neural field
];

export function TatreezLattice({ tier, reduced }: Props) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const { camera, size } = useThree();

  const lattice = useMemo(() => buildLattice(GRID[tier]), [tier]);

  const geometry = useMemo(() => {
    const cube = lattice.spacing * 0.42;
    const base = new THREE.BoxGeometry(cube, cube, cube);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = base.index;
    geo.attributes.position = base.attributes.position;
    geo.attributes.normal = base.attributes.normal;
    geo.instanceCount = lattice.count;
    geo.setAttribute("aOffset", new THREE.InstancedBufferAttribute(lattice.offsets, 3));
    geo.setAttribute("aRand", new THREE.InstancedBufferAttribute(lattice.rands, 3));
    geo.setAttribute("aColorId", new THREE.InstancedBufferAttribute(lattice.colorIds, 1));
    geo.setAttribute("aDist", new THREE.InstancedBufferAttribute(lattice.dists, 1));
    return geo;
  }, [lattice]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: latticeVertex,
        fragmentShader: latticeFragment,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uWire: { value: 0 },
          uScatter: { value: 0 },
          uFlow: { value: 0 },
          uOpacity: { value: 1 },
          uReveal: { value: 0 },
          uLightDir: { value: new THREE.Vector3(0.4, 1, 2) },
        },
      }),
    []
  );

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(lattice.lines, 3));
    return geo;
  }, [lattice]);

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(0.91, 0.886, 0.824),
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    []
  );

  /* dispose GPU resources when the tier changes or the canvas unmounts */
  useEffect(() => {
    return () => {
      geometry.dispose();
      lineGeometry.dispose();
    };
  }, [geometry, lineGeometry]);
  useEffect(() => {
    return () => {
      material.dispose();
      lineMaterial.dispose();
    };
  }, [material, lineMaterial]);

  const pose = useRef<Pose>({
    x: 1.35,
    y: 0.72,
    z: 0,
    s: 0.8,
    wire: 0,
    scatter: 0,
    flow: 0,
    opacity: 1,
    yaw: 0,
    pitch: 0.36,
    spin: 1,
  });
  const target = useRef<Pose>({ ...pose.current });
  const state = useRef({ ry: 0, cx: 0, cy: 0, spinAcc: 0 });

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 30);
    material.uniforms.uTime.value += dt;

    // pointer easing
    const p = xp.pointer;
    p.x += (p.tx - p.x) * (1 - Math.exp(-dt * 6));
    p.y += (p.ty - p.y) * (1 - Math.exp(-dt * 6));

    const narrow = size.width < 900;
    const T = target.current;

    /* ── choreography: which scene owns the object right now ── */
    const { hero, identity, capabilities: cap, work, signature: sig, final: fin } = xp;

    if (fin > 0) {
      // Finale — the fragments return and re-stitch behind the mark
      T.opacity = smooth(0.02, 0.35, fin);
      T.scatter = 1 - smooth(0.15, 0.7, fin);
      T.wire = 1 - smooth(0.55, 0.98, fin);
      T.flow = 0;
      T.x = narrow ? 0.55 : 1.55;
      T.y = narrow ? -1.15 : -0.35;
      T.z = -0.9;
      T.s = narrow ? 0.5 : 0.78;
      T.yaw = 0.4;
      T.pitch = 0.42;
      T.spin = 0.5;
    } else if (work > 0 || sig > 0) {
      // Work and signature own their own visuals — the object dissolves out of the way
      T.opacity = 1 - smooth(0, 0.22, Math.max(work, sig));
      T.scatter = 1;
      T.wire = 1;
      T.z = -2.4;
      T.spin = 0.4;
    } else if (cap > 0) {
      // Scene 03 — regathers into a wire object on the right, then takes on each service's personality
      const gather = smooth(0, 0.3, cap);
      const svc = xp.service >= 0 ? SERVICE_POSE[xp.service] : null;
      T.opacity = 1;
      T.wire = svc?.wire ?? 1;
      T.scatter = lerp(1, svc?.scatter ?? 0.08, gather);
      T.flow = svc?.flow ?? 0;
      T.spin = svc?.spin ?? 0.6;
      T.x = narrow ? 0 : 1.75;
      T.y = narrow ? 1.05 : 0.05;
      T.z = narrow ? -1.6 : -0.7;
      T.s = narrow ? 0.62 : 0.86;
      T.yaw = 0;
      T.pitch = 0.5;
    } else {
      // Scenes 01–02 — solid stitches → wire → particle field
      const wire = smooth(0.08, 0.85, hero);
      const scatter = smooth(0.15, 0.9, identity);
      T.opacity = 1;
      T.wire = wire;
      T.scatter = scatter;
      T.flow = 0;
      T.spin = 1;
      // sits in the upper-centre air between the mark and the statement, then drifts to centre
      const baseX = narrow ? 0.6 : 0.2;
      T.x = lerp(baseX, 0, smooth(0, 1, hero));
      T.z = lerp(0, -1.4, hero) + lerp(0, -1.0, identity);
      T.y = narrow ? lerp(0.55, 0, hero) : lerp(0.85, 0, hero);
      T.s = (narrow ? 0.5 : 0.72) * (1 - hero * 0.1);
      T.yaw = hero * 1.3;
      T.pitch = 0.36 + identity * 0.7;
    }

    /* ── ease the live pose toward the target ── */
    const P = pose.current;
    const k = 1 - Math.exp(-dt * 2.4);
    const kf = 1 - Math.exp(-dt * 5.2); // scroll-coupled values respond faster
    P.x += (T.x - P.x) * k;
    P.y += (T.y - P.y) * k;
    P.z += (T.z - P.z) * k;
    P.s += (T.s - P.s) * k;
    P.wire += (T.wire - P.wire) * kf;
    P.scatter += (T.scatter - P.scatter) * kf;
    P.flow += (T.flow - P.flow) * k;
    P.opacity += (T.opacity - P.opacity) * kf;
    P.yaw += (T.yaw - P.yaw) * kf;
    P.pitch += (T.pitch - P.pitch) * k;
    P.spin += (T.spin - P.spin) * k;

    material.uniforms.uWire.value = P.wire;
    material.uniforms.uScatter.value = P.scatter;
    material.uniforms.uFlow.value = P.flow;
    material.uniforms.uOpacity.value = P.opacity;
    material.uniforms.uReveal.value = xp.reveal;
    material.uniforms.uLightDir.value.set(0.4 + p.x * 1.6, 1.0 + p.y * 1.2, 2.0);

    const visible = P.opacity > 0.01 && xp.reveal > 0.001;
    if (mesh.current) mesh.current.visible = visible;

    lineMaterial.opacity = P.wire * (1 - P.scatter) * 0.38 * xp.reveal * P.opacity;
    if (lines.current) lines.current.visible = visible && lineMaterial.opacity > 0.005;

    g.position.set(P.x, P.y, P.z);
    g.scale.setScalar(P.s);

    const st = state.current;
    st.spinAcc += (reduced ? 0 : dt * 0.16) * P.spin;
    st.ry += (st.spinAcc + p.x * 0.4 + P.yaw - st.ry) * (1 - Math.exp(-dt * 3));
    g.rotation.set(P.pitch + p.y * 0.28, st.ry, 0.12);

    // camera parallax
    st.cx += (p.x * 0.28 - st.cx) * (1 - Math.exp(-dt * 4));
    st.cy += (-p.y * 0.22 - st.cy) * (1 - Math.exp(-dt * 4));
    camera.position.x = st.cx;
    camera.position.y = st.cy;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geometry} material={material} frustumCulled={false} />
      <lineSegments ref={lines} geometry={lineGeometry} material={lineMaterial} frustumCulled={false} />
    </group>
  );
}
