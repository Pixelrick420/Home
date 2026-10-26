import type { CoverProps } from "./types";

const SWATCHES = 7;
const SELECTED = 2;

export default function Paint({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />

      <rect
        x="28"
        y="28"
        width="224"
        height="172"
        rx="4"
        fill="none"
        stroke={p.accent}
        strokeWidth="1.5"
      />

      <rect
        x="48"
        y="106"
        width="84"
        height="62"
        fill="none"
        stroke={p.accent}
        strokeWidth="3"
      />
      <circle cx="184" cy="92" r="30" fill={p.accent} />
      <circle
        cx="200"
        cy="144"
        r="22"
        fill="none"
        stroke={p.fg}
        strokeWidth="3"
      />
      <path
        d="M46 78C62 40 84 40 94 66C104 92 124 58 140 52"
        fill="none"
        stroke={p.fg}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {Array.from({ length: SWATCHES }, (_, i) => (
        <g key={i}>
          <rect
            x={28 + i * 32}
            y="218"
            width="24"
            height="24"
            rx="3"
            fill={i % 2 === 0 ? p.fg : p.accent}
          />
          {i === SELECTED && (
            <rect
              x={24 + i * 32}
              y="214"
              width="32"
              height="32"
              rx="5"
              fill="none"
              stroke={p.fg}
              strokeWidth="1.5"
            />
          )}
        </g>
      ))}
    </svg>
  );
}
