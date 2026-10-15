import type { CoverProps } from "./types";

export default function Tetris({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />

      <rect
        x="70"
        y="20"
        width="140"
        height="240"
        rx="4"
        fill="none"
        stroke={p.fg}
        strokeWidth="1.5"
        opacity="0.3"
      />

      {[
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
      ].map((row, r) =>
        row.map((on, c) =>
          on ? (
            <rect
              key={`${r}-${c}`}
              x={74 + c * 19}
              y={222 - r * 19}
              width="17"
              height="17"
              rx="2"
              fill={p.fg}
              opacity={0.15 + r * 0.12}
            />
          ) : null,
        ),
      )}

      {[
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
      ].map(([dc, dr], i) => (
        <rect
          key={i}
          x={74 + (2 + dc) * 19}
          y={108 + dr * 19}
          width="17"
          height="17"
          rx="2"
          fill={p.fg}
          opacity="0.9"
        />
      ))}

      {[
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
      ].map(([dc, dr], i) => (
        <rect
          key={`g${i}`}
          x={74 + (2 + dc) * 19}
          y={184 + dr * 19}
          width="17"
          height="17"
          rx="2"
          fill="none"
          stroke={p.fg}
          strokeWidth="1"
          opacity="0.3"
        />
      ))}

      <text
        x="240"
        y="44"
        fontFamily="monospace"
        fontSize="8"
        fill={p.fg}
        opacity="0.4"
        textAnchor="middle"
      >
        NEXT
      </text>
      {[
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ].map(([dc, dr], i) => (
        <rect
          key={i}
          x={230 + dc * 14}
          y={52 + dr * 14}
          width="12"
          height="12"
          rx="2"
          fill={p.fg}
          opacity="0.6"
        />
      ))}
      <text
        x="28"
        y="44"
        fontFamily="monospace"
        fontSize="8"
        fill={p.fg}
        opacity="0.4"
      >
        SCORE
      </text>
      <text
        x="28"
        y="58"
        fontFamily="monospace"
        fontSize="10"
        fill={p.fg}
        opacity="0.7"
      >
        01480
      </text>
      <text
        x="28"
        y="82"
        fontFamily="monospace"
        fontSize="8"
        fill={p.fg}
        opacity="0.4"
      >
        LEVEL
      </text>
      <text
        x="28"
        y="96"
        fontFamily="monospace"
        fontSize="10"
        fill={p.fg}
        opacity="0.7"
      >
        3
      </text>
    </svg>
  );
}
