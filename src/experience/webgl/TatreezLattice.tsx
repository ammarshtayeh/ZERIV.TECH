"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildLattice } from "../lib/octagram";
import { xp } from "../lib/experience-store";
import { latticeFragment, latticeVertex } from "./shaders";
import type { DeviceTier } from "../hooks/useDeviceTier";

const GRID: Record<DeviceTier, number> = { high: 37, mid: 27, low: 19 };

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Props {
  tier: DeviceTier;
  reduced: boolean;
}

export function TatreezLattice({ tier, reduced }: Props) {
  const group = useRef<THREE.Group>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const { camera, size } = useThree();

  const lattice = useMemo(() => buildLattice(GRID[tier]), [tier]);

  const geometry = useMemo(() => {
    const cube = lattice.spacing * 0.6;
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

  const state = useRef({ rx: 0.35, ry: 0, cx: 0, cy: 0 });

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 30);
    const t = (material.uniforms.uTime.value += dt);

    // pointer easing
    const p = xp.pointer;
    p.x += (p.tx - p.x) * (1 - Math.exp(-dt * 6));
    p.y += (p.ty - p.y) * (1 - Math.exp(-dt * 6));

    const hero = xp.hero;
    const identity = xp.identity;
    const narrow = size.width < 900;

    const wire = smooth(0.08, 0.85, hero);
    const scatter = smooth(0.15, 0.9, identity);

    material.uniforms.uWire.value = wire;
    material.uniforms.uScatter.value = scatter;
    material.uniforms.uReveal.value = xp.reveal;
    material.uniforms.uLightDir.value.set(0.4 + p.x * 1.6, 1.0 + p.y * 1.2, 2.0);

    lineMaterial.opacity = wire * (1 - scatter) * 0.38 * xp.reveal;
    if (lines.current) lines.current.visible = lineMaterial.opacity > 0.005;

    // composition: right-weighted in the hero, centred behind Scene 02
    const baseX = narrow ? 0 : 1.6;
    const targetX = lerp(baseX, 0, smooth(0, 1, hero));
    const targetZ = lerp(0, -1.4, hero) + lerp(0, -1.0, identity);
    // narrow screens: sit in the gap between the statement and the word
    const targetY = narrow ? lerp(-0.45, 0, hero) : lerp(0.2, 0, hero);
    g.position.set(targetX, targetY, targetZ);

    const s = (narrow ? 0.6 : 0.92) * (1 - hero * 0.1);
    g.scale.setScalar(s);

    const st = state.current;
    const spin = reduced ? 0 : t * 0.16;
    st.ry += ((spin + p.x * 0.4 + hero * 1.3) - st.ry) * (1 - Math.exp(-dt * 3));
    st.rx += ((0.36 + p.y * 0.28 + identity * 0.7) - st.rx) * (1 - Math.exp(-dt * 3));
    g.rotation.set(st.rx, st.ry, 0.12);

    // camera parallax
    st.cx += (p.x * 0.28 - st.cx) * (1 - Math.exp(-dt * 4));
    st.cy += (-p.y * 0.22 - st.cy) * (1 - Math.exp(-dt * 4));
    camera.position.x = st.cx;
    camera.position.y = st.cy;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} material={material} frustumCulled={false} />
      <lineSegments ref={lines} geometry={lineGeometry} material={lineMaterial} frustumCulled={false} />
    </group>
  );
}
