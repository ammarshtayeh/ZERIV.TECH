export const latticeVertex = /* glsl */ `
  uniform float uTime;
  uniform float uWire;
  uniform float uScatter;
  uniform float uFlow;
  uniform float uReveal;
  uniform vec3 uLightDir;

  attribute vec3 aOffset;
  attribute vec3 aRand;
  attribute float aColorId;
  attribute float aDist;

  varying vec3 vColor;
  varying float vLight;
  varying float vAlpha;
  varying float vDepth;

  const vec3 BONE  = vec3(0.910, 0.886, 0.824);
  const vec3 RED   = vec3(0.808, 0.067, 0.149);
  const vec3 GREEN = vec3(0.000, 0.478, 0.239);
  const vec3 ASH   = vec3(0.30, 0.295, 0.28);

  void main() {
    // staggered reveal from the centre outward
    float r = clamp((uReveal * 1.25 - aDist) * 5.0, 0.0, 1.0);

    // stitch → thin wire node → particle
    float scl = r * mix(1.0, 0.34, uWire) * mix(1.0, 0.55, uScatter);

    vec3 drift = vec3(
      sin(uTime * 0.7 + aRand.x * 6.2831),
      cos(uTime * 0.55 + aRand.y * 6.2831),
      sin(uTime * 0.62 + aRand.z * 6.2831)
    );
    vec3 scatter = aRand * uScatter * vec3(4.2, 2.6, 2.0) + drift * uScatter * 0.3;

    // fluid surface — a slow wave travelling through the lattice
    float wave = sin(aOffset.x * 2.4 + uTime * 1.5) * 0.16
               + sin(aOffset.z * 3.1 - uTime * 1.1) * 0.1
               + cos((aOffset.x + aOffset.y) * 1.7 + uTime * 0.8) * 0.08;
    vec3 flow = vec3(0.0, wave, wave * 0.35) * uFlow;

    vec3 p = position * scl + aOffset + scatter + flow;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    vec3 n = normalize(normalMatrix * normal);
    vLight = 0.32 + 0.68 * max(dot(n, normalize(uLightDir)), 0.0);

    vColor = aColorId < 0.5 ? BONE : (aColorId < 1.5 ? RED : (aColorId < 2.5 ? GREEN : ASH));
    vAlpha = r;
    vDepth = -mv.z;
  }
`;

export const latticeFragment = /* glsl */ `
  uniform float uScatter;
  uniform float uOpacity;

  varying vec3 vColor;
  varying float vLight;
  varying float vAlpha;
  varying float vDepth;

  const vec3 BG = vec3(0.027, 0.031, 0.039);

  void main() {
    if (vAlpha < 0.01) discard;
    vec3 col = vColor * vLight * mix(1.0, 1.5, uScatter);
    // atmospheric depth
    col = mix(col, BG, smoothstep(9.5, 17.0, vDepth));
    gl_FragColor = vec4(col, vAlpha * mix(1.0, 0.75, uScatter) * uOpacity);
  }
`;
