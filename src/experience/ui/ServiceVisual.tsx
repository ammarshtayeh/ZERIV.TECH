import type { ServiceVisualKind } from "../data/services";

interface Props {
  kind: ServiceVisualKind | null;
}

/**
 * Lightweight SVG "personalities" for each capability — pure vector, CSS-animated,
 * so the WebGL layer stays the single heavy surface.
 */
export function ServiceVisual({ kind }: Props) {
  return (
    <div className="xp-svis" data-kind={kind ?? "idle"} aria-hidden="true">
      <svg viewBox="0 0 300 360" className="xp-svis__svg">
        {kind === "web" && <Web />}
        {kind === "mobile" && <Mobile />}
        {kind === "uiux" && <UiUx />}
        {kind === "branding" && <Branding />}
        {kind === "ai" && <Ai />}
        {kind === "creative" && <Creative />}
        {kind === null && <Idle />}
      </svg>
    </div>
  );
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1 } as const;

function Idle() {
  return (
    <g className="xp-svis__idle">
      <path d="M150 60 L240 180 L150 300 L60 180 Z" {...stroke} opacity="0.35" />
      <path d="M150 120 L200 180 L150 240 L100 180 Z" {...stroke} opacity="0.6" />
      <line x1="20" y1="180" x2="60" y2="180" {...stroke} opacity="0.4" />
      <line x1="240" y1="180" x2="280" y2="180" {...stroke} opacity="0.4" />
    </g>
  );
}

function Web() {
  return (
    <g>
      <rect x="24" y="52" width="252" height="256" {...stroke} />
      <line x1="24" y1="84" x2="276" y2="84" {...stroke} />
      <rect x="36" y="64" width="8" height="8" fill="currentColor" />
      <rect x="50" y="64" width="8" height="8" fill="currentColor" opacity="0.5" />
      <rect x="64" y="64" width="8" height="8" fill="currentColor" opacity="0.25" />
      <rect x="110" y="63" width="130" height="10" {...stroke} opacity="0.4" />
      {/* column grid */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={40 + i * 56} y1="100" x2={40 + i * 56} y2="292" {...stroke} opacity="0.18" />
      ))}
      <rect className="xp-svis__block xp-svis__block--a" x="40" y="104" width="220" height="70" {...stroke} />
      <rect className="xp-svis__block xp-svis__block--b" x="40" y="190" width="104" height="100" {...stroke} />
      <rect className="xp-svis__block xp-svis__block--c" x="156" y="190" width="104" height="44" {...stroke} />
      <rect className="xp-svis__block xp-svis__block--d" x="156" y="246" width="104" height="44" {...stroke} />
      <line className="xp-svis__scan" x1="24" y1="100" x2="276" y2="100" stroke="currentColor" strokeWidth="1" />
    </g>
  );
}

function Mobile() {
  return (
    <g>
      <rect x="84" y="28" width="132" height="304" rx="22" {...stroke} />
      <line x1="130" y1="44" x2="170" y2="44" {...stroke} opacity="0.5" />
      <clipPath id="xp-svis-phone">
        <rect x="94" y="58" width="112" height="250" rx="12" />
      </clipPath>
      <g clipPath="url(#xp-svis-phone)">
        <path
          className="xp-svis__wave xp-svis__wave--1"
          d="M0 200 C 40 170, 80 230, 120 200 S 200 170, 240 200 S 320 230, 360 200 V 320 H 0 Z"
          fill="currentColor"
          opacity="0.14"
        />
        <path
          className="xp-svis__wave xp-svis__wave--2"
          d="M0 220 C 40 250, 80 190, 120 220 S 200 250, 240 220 S 320 190, 360 220 V 320 H 0 Z"
          fill="currentColor"
          opacity="0.22"
        />
        <path
          className="xp-svis__wave xp-svis__wave--3"
          d="M0 240 C 40 210, 80 270, 120 240 S 200 210, 240 240 S 320 270, 360 240 V 320 H 0 Z"
          fill="currentColor"
          opacity="0.34"
        />
      </g>
      <rect x="106" y="78" width="88" height="8" {...stroke} opacity="0.4" />
      <rect x="106" y="96" width="56" height="8" {...stroke} opacity="0.25" />
      <line x1="130" y1="318" x2="170" y2="318" stroke="currentColor" strokeWidth="2" />
    </g>
  );
}

function UiUx() {
  return (
    <g>
      <rect x="30" y="50" width="240" height="260" {...stroke} opacity="0.3" />
      <rect className="xp-svis__pane xp-svis__pane--1" x="46" y="66" width="96" height="60" {...stroke} />
      <rect className="xp-svis__pane xp-svis__pane--2" x="158" y="66" width="96" height="120" {...stroke} />
      <rect className="xp-svis__pane xp-svis__pane--3" x="46" y="142" width="96" height="44" {...stroke} />
      <rect className="xp-svis__pane xp-svis__pane--4" x="46" y="202" width="208" height="92" {...stroke} />
      <circle cx="70" cy="90" r="10" {...stroke} />
      <line x1="90" y1="90" x2="128" y2="90" {...stroke} opacity="0.5" />
      <line x1="60" y1="164" x2="128" y2="164" {...stroke} opacity="0.5" />
      <line x1="174" y1="90" x2="238" y2="90" {...stroke} opacity="0.5" />
      <line x1="174" y1="110" x2="220" y2="110" {...stroke} opacity="0.3" />
      <line x1="174" y1="130" x2="230" y2="130" {...stroke} opacity="0.3" />
      <path className="xp-svis__cursor" d="M0 0 L12 5 L6 7 L4 13 Z" fill="currentColor" />
      <line x1="30" y1="180" x2="270" y2="180" stroke="var(--xp-red)" strokeWidth="1" opacity="0.6" strokeDasharray="3 5" />
      <line x1="150" y1="50" x2="150" y2="310" stroke="var(--xp-red)" strokeWidth="1" opacity="0.6" strokeDasharray="3 5" />
    </g>
  );
}

function Branding() {
  return (
    <g>
      <text x="40" y="200" className="xp-svis__glyph xp-svis__glyph--thin" fill="currentColor">
        Aa
      </text>
      <text x="40" y="200" className="xp-svis__glyph xp-svis__glyph--bold" fill="currentColor">
        Aa
      </text>
      <circle cx="222" cy="86" r="26" {...stroke} className="xp-svis__prim xp-svis__prim--1" />
      <rect x="196" y="238" width="52" height="52" {...stroke} className="xp-svis__prim xp-svis__prim--2" />
      <path d="M46 300 L72 254 L98 300 Z" {...stroke} className="xp-svis__prim xp-svis__prim--3" />
      <line x1="40" y1="222" x2="260" y2="222" {...stroke} opacity="0.35" />
      <line x1="40" y1="140" x2="260" y2="140" {...stroke} opacity="0.2" />
    </g>
  );
}

const AI_NODES: [number, number][] = [
  [60, 90], [60, 180], [60, 270],
  [150, 60], [150, 130], [150, 200], [150, 270],
  [240, 120], [240, 240],
];
const AI_LINKS: [number, number][] = [
  [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [3, 7], [4, 7], [4, 8], [5, 8], [6, 8], [3, 8],
];

function Ai() {
  return (
    <g>
      {AI_LINKS.map(([a, b], i) => (
        <line
          key={i}
          className="xp-svis__link"
          style={{ animationDelay: `${(i % 6) * 0.25}s` }}
          x1={AI_NODES[a][0]}
          y1={AI_NODES[a][1]}
          x2={AI_NODES[b][0]}
          y2={AI_NODES[b][1]}
          {...stroke}
        />
      ))}
      {AI_NODES.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="var(--xp-bg)" stroke="currentColor" strokeWidth="1" />
          <circle
            className="xp-svis__pulse"
            style={{ animationDelay: `${i * 0.18}s` }}
            cx={x}
            cy={y}
            r="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
      ))}
    </g>
  );
}

function Creative() {
  return (
    <g>
      <g className="xp-svis__spin xp-svis__spin--slow" style={{ transformOrigin: "150px 180px" }}>
        <path d="M150 40 L290 180 L150 320 L10 180 Z" {...stroke} opacity="0.3" />
        <path d="M51 81 H249 V279 H51 Z" {...stroke} opacity="0.3" />
      </g>
      <g className="xp-svis__spin xp-svis__spin--rev" style={{ transformOrigin: "150px 180px" }}>
        <path d="M150 90 L240 180 L150 270 L60 180 Z" {...stroke} opacity="0.6" />
        <path d="M86 116 H214 V244 H86 Z" {...stroke} opacity="0.6" />
      </g>
      <g className="xp-svis__spin xp-svis__spin--fast" style={{ transformOrigin: "150px 180px" }}>
        <path d="M150 140 L190 180 L150 220 L110 180 Z" fill="var(--xp-red)" opacity="0.85" />
      </g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          className="xp-svis__noise"
          style={{ animationDelay: `${i * 0.13}s` }}
          x1="20"
          y1={70 + i * 44}
          x2="280"
          y2={70 + i * 44}
          {...stroke}
          opacity="0.15"
        />
      ))}
    </g>
  );
}
