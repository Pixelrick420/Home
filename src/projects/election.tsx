import type { CoverProps } from "./types";

export default function Election({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />
      <rect
        x="30"
        y="34"
        width="220"
        height="212"
        rx="14"
        fill={p.fg}
        fillOpacity="0.03"
        stroke={p.fg}
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <text
        x="140"
        y="66"
        fontFamily="monospace"
        fontSize="12"
        fill={p.fg}
        textAnchor="middle"
        fontWeight="bold"
        letterSpacing="4"
        opacity="0.9"
      >
        BALLOT
      </text>
      <line
        x1="50"
        y1="80"
        x2="230"
        y2="80"
        stroke={p.fg}
        strokeWidth="1"
        opacity="0.15"
      />
      <rect
        x="44"
        y="92"
        width="192"
        height="28"
        rx="8"
        fill={p.accent}
        opacity="0.1"
      />
      <circle cx="58" cy="106" r="8" fill={p.accent} />
      <circle cx="58" cy="106" r="3" fill={p.bg} />
      <circle
        cx="58"
        cy="142"
        r="8"
        fill="none"
        stroke={p.fg}
        strokeWidth="2"
        opacity="0.4"
      />
      <circle
        cx="58"
        cy="178"
        r="8"
        fill="none"
        stroke={p.fg}
        strokeWidth="2"
        opacity="0.4"
      />
      {(() => {
        const rows = [
          { cy: 106, pattern: ["d", "h", "d", "h", "d"], op: 0.95 },
          { cy: 142, pattern: ["h", "d", "h", "d", "h"], op: 0.6 },
          { cy: 178, pattern: ["d", "d", "d"], op: 0.6 },
        ];
        return rows.map(({ cy, pattern, op }) =>
          pattern.map((cell, i) =>
            cell === "d" ? (
              <circle
                key={`${cy}-${i}`}
                cx={82 + i * 20}
                cy={cy}
                r="3"
                fill={p.fg}
                opacity={op}
              />
            ) : (
              <rect
                key={`${cy}-${i}`}
                x={82 + i * 20 - 6}
                y={cy - 1.4}
                width="12"
                height="2.8"
                rx="1.4"
                fill={p.fg}
                opacity={op}
              />
            ),
          ),
        );
      })()}
    </svg>
  );
}
