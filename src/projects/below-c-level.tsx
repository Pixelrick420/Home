import type { CoverProps } from "./types";

export default function BelowCLevel({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />

      {Array.from({ length: 15 }, (_, i) => (
        <line
          key={`h${i}`}
          x1="20"
          y1={20 + i * 17}
          x2="260"
          y2={20 + i * 17}
          stroke={p.bg}
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: 15 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={20 + i * 17}
          y1="20"
          x2={20 + i * 17}
          y2="260"
          stroke={p.bg}
          strokeWidth="0.5"
        />
      ))}

      {[
        [7, 8],
        [6, 8],
        [5, 8],
        [4, 8],
        [4, 7],
        [4, 6],
        [5, 6],
        [6, 6],
        [7, 6],
        [8, 6],
        [9, 6],
        [9, 7],
        [9, 8],
        [9, 9],
        [8, 9],
        [7, 9],
        [6, 9],
      ].map(([c, r], i, arr) => (
        <rect
          key={i}
          x={20 + c * 17}
          y={20 + r * 17}
          width="15"
          height="15"
          rx="3"
          fill={
            (i === 0 ? 0.95 : 0.35 + (i / arr.length) * 0.4) >= 0.65
              ? p.fg
              : p.accent
          }
        />
      ))}

      <rect
        x={20 + 7 * 17}
        y={20 + 8 * 17}
        width="15"
        height="15"
        rx="3"
        fill={p.fg}
      />

      <circle cx={20 + 7 * 17 + 5} cy={20 + 8 * 17 + 5} r="2" fill={p.bg} />
      <circle cx={20 + 7 * 17 + 10} cy={20 + 8 * 17 + 5} r="2" fill={p.bg} />

      <rect
        x={20 + 11 * 17}
        y={20 + 4 * 17}
        width="15"
        height="15"
        rx="3"
        fill={p.fg}
      />
    </svg>
  );
}
