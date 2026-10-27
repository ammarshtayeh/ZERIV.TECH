"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mulberry32, SQ2 } from "../lib/octagram";
import { xp } from "../lib/experience-store";
import type { DeviceTier } from "../hooks/useDeviceTier";

const COUNT: Record<DeviceTier, number> = { high: 5200, mid: 3600, low: 2000 };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* perimeter sampler of an octagram ring (axis square + 45° square), side 0..7, t 0..1 */
function octPerim(a: number, side: number, t: number): [number, number] {
  const sq = (pts: [number, number][], k: number): [number, number] => {
    const [x1, y1] = pts[k];
    const [x2, y2] = pts[(k + 1) % 4];
    return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
  };
  if (side < 4) {
    return sq(
      [
        [-a, -a],
        [a, -a],
        [a, a],
        [-a, a],
      ],
      side
    );
  }
  const r = a * SQ2;
  return sq(
    [
      [0, -r],
      [r, 0],
      [0, r],
      [-r, 0],
    ],
    side - 4
  );
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProg;
  uniform float uReveal;
  uniform float uTheme;
  uniform float uPulse;
  uniform float uMotion;
  uniform float uPx;
  uniform vec2 uPointer;
  uniform float uPointerStr;

  attribute vec3 aF0;
  attribute vec3 aF1;
  attribute vec3 aF2;
  attribute vec3 aF3;
  attribute vec3 aRand;
  attribute float aColorId;
  attribute float aSize;

  varying vec3 vColor;
  varying float vGlow;
  varying float vAlpha;

  vec3 pick(float id, float t) {
    /* dark theme: glowing bone / neon red / neon green / dim tan */
    vec3 d = id < 0.5 ? vec3(0.93, 0.91, 0.86)
           : id < 1.5 ? vec3(1.00, 0.16, 0.28)
           : id < 2.5 ? vec3(0.06, 0.74, 0.37)
           : vec3(0.36, 0.35, 0.33);
    /* light theme: stitches become saturated embroidery ink on paper */
    vec3 l = id < 0.5 ? vec3(0.05, 0.05, 0.08)
           : id < 1.5 ? vec3(0.72, 0.03, 0.10)
           : id < 2.5 ? vec3(0.00, 0.36, 0.17)
           : vec3(0.22, 0.21, 0.20);
    return mix(d, l, t);
  }

  void main() {
    /* formation morph: mandala → river → orbit → converge */
    vec3 pos = aF0;
    pos = mix(pos, aF1, smoothstep(0.0, 1.0, uProg));
    pos = mix(pos, aF2, smoothstep(1.0, 2.0, uProg));
    pos = mix(pos, aF3, smoothstep(2.0, 3.0, uProg));

    /* idle breathing */
    pos += uMotion * 0.055 * vec3(
      sin(uTime * 0.6 + aRand.x * 6.2831),
      cos(uTime * 0.5 + aRand.y * 6.2831),
      sin(uTime * 0.7 + aRand.z * 6.2831)
    );

    /* whole-field slow spin */
    float spin = uTime * 0.045 * uMotion;
    float cs = cos(spin);
    float sn = sin(spin);
    pos.xy = mat2(cs, -sn, sn, cs) * pos.xy;

    /* cursor gravity ripple — stitches flee the pointer and heat up */
    vec2 dxy = pos.xy - uPointer;
    float d = length(dxy);
    float f = exp(-d * d * 0.55) * uPointerStr;
    pos.xy += normalize(dxy + vec2(0.0001)) * f * 0.55;
    vGlow = f;

    /* service-hover pulse: a red wave radiating from the centre */
    float wave = sin(length(pos.xy) * 2.4 - uTime * 3.2) * 0.5 + 0.5;
    vGlow += uPulse * wave * 0.65;

    /* reveal blooms outward from the centre */
    float rev = clamp((uReveal * 1.3 - length(aF0) * 0.11) * 4.0, 0.0, 1.0);
    vAlpha = rev;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    /* ink stitches on paper need to be larger to read as crosses */
    float sizeBoost = mix(1.0, 1.6, uTheme);
    gl_PointSize = aSize * sizeBoost * (1.0 + f * 1.7) * (240.0 / -mv.z) * uPx;

    vColor = pick(aColorId, uTheme);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTheme;

  varying vec3 vColor;
  varying float vGlow;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    /* the × of a cross-stitch — thicker arms in light mode so ink reads */
    float d = min(abs(uv.x + uv.y), abs(uv.x - uv.y)) * 0.7071;
    float arm = mix(0.42, 0.62, uTheme);
    float a = smoothstep(arm, 0.12, d);
    /* soft halo while heated */
    a += smoothstep(1.1, 0.0, length(uv)) * 0.28 * vGlow;
    if (a * vAlpha < 0.02) discard;

    vec3 hot = mix(vColor, vec3(1.0, 0.18, 0.30), clamp(vGlow, 0.0, 1.0) * 0.6);
    vec3 col = hot * (0.6 + 0.6 * clamp(vGlow * 2.0, 0.0, 1.0));
    col = mix(col, vColor, uTheme * 0.4);
    /* ink stitches on paper need full weight; additive glow can stay softer */
    float alpha = a * vAlpha * mix(0.9, 1.0, uTheme);
    gl_FragColor = vec4(col, alpha);
  }
`;

interface Props {
  tier: DeviceTier;
  reduced: boolean;
}

/**
 * The Tatreez Universe — a full-screen galaxy of cross-stitches.
 * Morphs with scroll, ripples away from the pointer, pulses when a capability is hovered.
 */
export function TatreezUniverse({ tier, reduced }: Props) {
  const points = useRef<THREE.Points>(null);
  const { camera, gl, size } = useThree();

  const data = useMemo(() => {
    const n = COUNT[tier];
    const rng = mulberry32(97);
    const R = 2.6;

    const f0 = new Float32Array(n * 3);
    const f1 = new Float32Array(n * 3);
    const f2 = new Float32Array(n * 3);
    const f3 = new Float32Array(n * 3);
    const rnd = new Float32Array(n * 3);
    const cid = new Float32Array(n);
    const siz = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      const q = rng();
      const scatter = q < 0.22;
      let x = 0;
      let y = 0;
      let z = 0;
      let color = 0;

      /* f0 — the mandala */
      if (scatter) {
        const ang = rng() * Math.PI * 2;
        const rad = 3.1 + rng() * 2.6;
        x = Math.cos(ang) * rad;
        y = Math.sin(ang) * rad;
        z = (rng() - 0.5) * 2.2;
        color = rng() < 0.78 ? 3 : 0;
      } else {
        const ring = 1 + Math.floor(rng() * 8);
        const [px, py] = octPerim((ring / 8) * R, Math.floor(rng() * 8), rng());
        x = px + (rng() - 0.5) * 0.05;
        y = py + (rng() - 0.5) * 0.05;
        z = (rng() - 0.5) * 0.5;
        if (ring <= 2) color = q < 0.62 ? 1 : q < 0.85 ? 0 : 3;
        else if (ring <= 5) color = q < 0.32 ? 2 : q < 0.75 ? 0 : 3;
        else color = q < 0.45 ? 2 : q < 0.85 ? 0 : 3;
      }
      f0.set([x, y, z], i * 3);
      cid[i] = color;

      /* f1 — the river */
      f1.set(
        [(rng() - 0.5) * 8.2, (rng() + rng() + rng() - 1.5) * 0.55, (rng() - 0.5) * 1.6],
        i * 3
      );

      /* f2 — five orbiting clusters */
      const c = i % 5;
      const ang0 = (c / 5) * Math.PI * 2 - Math.PI / 2;
      const ring2 = 1 + Math.floor(rng() * 5);
      const [lx, ly] = octPerim((ring2 / 5) * 0.62, Math.floor(rng() * 8), rng());
      f2.set(
        [Math.cos(ang0) * 2.4 + lx, Math.sin(ang0) * 2.4 + ly, (rng() - 0.5) * 0.4],
        i * 3
      );

      /* f3 — converge into the mark */
      const ring3 = 1 + Math.floor(rng() * 8);
      const [cx, cy] = octPerim((ring3 / 8) * 1.5, Math.floor(rng() * 8), rng());
      f3.set([cx, cy, (rng() - 0.5) * 0.35], i * 3);

      rnd.set([rng() * 2 - 1, rng() * 2 - 1, rng() * 2 - 1], i * 3);
      siz[i] = 0.8 + rng() * 1.0 + (color === 1 || color === 2 ? 0.3 : 0);
    }

    return { n, f0, f1, f2, f3, rnd, cid, siz };
  }, [tier]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.f0, 3)); // required by three
    geo.setAttribute("aF0", new THREE.BufferAttribute(data.f0, 3));
    geo.setAttribute("aF1", new THREE.BufferAttribute(data.f1, 3));
    geo.setAttribute("aF2", new THREE.BufferAttribute(data.f2, 3));
    geo.setAttribute("aF3", new THREE.BufferAttribute(data.f3, 3));
    geo.setAttribute("aRand", new THREE.BufferAttribute(data.rnd, 3));
    geo.setAttribute("aColorId", new THREE.BufferAttribute(data.cid, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(data.siz, 1));
    return geo;
  }, [data]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uProg: { value: 0 },
          uReveal: { value: 0 },
          uTheme: { value: 0 },
          uPulse: { value: 0 },
          uMotion: { value: reduced ? 0 : 1 },
          uPx: { value: 1 },
          uPointer: { value: new THREE.Vector2(99, 99) },
          uPointerStr: { value: 0 },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  /* theme tracking — also flips blending (additive glow ↔ ink on paper) */
  const theme = useRef(0);
  useEffect(() => {
    const read = () => {
      const light = !document.documentElement.classList.contains("dark");
      theme.current = light ? 1 : 0;
      material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [material]);

  const tmp = useRef({
    v: new THREE.Vector3(),
    prog: 0,
    pulse: 0,
    lastService: -2,
    str: 0,
    cx: 0,
    cy: 0,
  });

  useFrame((_, delta) => {
    const pts = points.current;
    if (!pts) return;
    const dt = Math.min(delta, 1 / 30);
    const st = tmp.current;
    const U = material.uniforms;

    U.uTime.value += dt;
    U.uPx.value = gl.getPixelRatio();

    /* scroll → formation 0..3 */
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const sp = max > 0 ? window.scrollY / max : 0;
    st.prog = lerp(st.prog, sp * 3, 1 - Math.exp(-dt * 3.5));
    U.uProg.value = st.prog;

    /* pointer → world position on the z=0 plane */
    const p = xp.pointer;
    p.x += (p.tx - p.x) * (1 - Math.exp(-dt * 7));
    p.y += (p.ty - p.y) * (1 - Math.exp(-dt * 7));
    const v = st.v.set(p.x, -p.y, 0.5).unproject(camera);
    const dir = v.sub(camera.position).normalize();
    const t = -camera.position.z / dir.z;
    U.uPointer.value.set(
      camera.position.x + dir.x * t,
      camera.position.y + dir.y * t
    );
    const wantStr = reduced || size.width < 900 ? 0 : 1.15;
    st.str = lerp(st.str, wantStr, 1 - Math.exp(-dt * 4));
    U.uPointerStr.value = st.str;

    /* capability hover sends a pulse through the galaxy */
    if (xp.service !== st.lastService) {
      st.lastService = xp.service;
      if (xp.service >= 0) st.pulse = 1;
    }
    st.pulse *= Math.exp(-dt * 1.6);
    U.uPulse.value = st.pulse;

    U.uReveal.value = xp.reveal;
    U.uTheme.value += (theme.current - U.uTheme.value) * (1 - Math.exp(-dt * 5));

    /* camera: gentle dolly with scroll + pointer parallax */
    st.cx += (p.x * 0.3 - st.cx) * (1 - Math.exp(-dt * 4));
    st.cy += (-p.y * 0.24 - st.cy) * (1 - Math.exp(-dt * 4));
    camera.position.x = st.cx;
    camera.position.y = st.cy;
    camera.position.z = 8 - (U.uProg.value / 3) * 1.1;
    camera.lookAt(0, 0, 0);
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
