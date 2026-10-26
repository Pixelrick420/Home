import type { CoverProps } from "./types";

const PARAGRAPH = [196, 210, 184, 204, 120];

export default function Blog({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />

      <rect x="36" y="38" width="150" height="12" rx="3" fill={p.fg} />
      <rect x="36" y="58" width="96" height="12" rx="3" fill={p.fg} />
      <rect x="36" y="82" width="64" height="5" rx="2.5" fill={p.accent} />

      {PARAGRAPH.map((w, i) => (
        <rect
          key={i}
          x="36"
          y={106 + i * 15}
          width={w}
          height="5"
          rx="2.5"
          fill={p.accent}
        />
      ))}

      <rect x="36" y="186" width="4" height="26" fill={p.fg} />
      <rect x="50" y="190" width="140" height="5" rx="2.5" fill={p.fg} />
      <rect x="50" y="203" width="96" height="5" rx="2.5" fill={p.fg} />

      <g transform="translate(50 242)">
        <path
          d="M0 9C-15 -2 -12 -15 -5 -15C-2 -15 0 -12 0 -10C0 -12 2 -15 5 -15C12 -15 15 -2 0 9Z"
          fill={p.fg}
        />
      </g>
      <rect x="70" y="239" width="34" height="6" rx="3" fill={p.accent} />
    </svg>
  );
}
