import type { CoverProps } from "./types";

const KEY = 19;
const GAP = 4;
const STEP = KEY + GAP;

const ROWS: [number, number][] = [
  [10, 0],
  [9, 0.5],
  [7, 1.5],
];

const PRESSED = new Set(["1-3", "2-2"]);

export default function VirtualKeys({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />

      <rect
        x="27"
        y="32"
        width="226"
        height="52"
        rx="5"
        fill="none"
        stroke={p.fg}
        strokeWidth="1.5"
      />
      <rect x="39" y="46" width="96" height="5" rx="2.5" fill={p.fg} />
      <rect x="39" y="60" width="62" height="5" rx="2.5" fill={p.accent} />
      <rect x="109" y="57" width="6" height="12" fill={p.fg} />

      {ROWS.map(([count, offset], r) =>
        Array.from({ length: count }, (_, c) => {
          const pressed = PRESSED.has(`${r}-${c}`);
          return (
            <rect
              key={`${r}-${c}`}
              x={27 + (offset + c) * STEP}
              y={106 + r * 29}
              width={KEY}
              height="24"
              rx="3"
              fill={pressed ? p.fg : "none"}
              stroke={pressed ? p.fg : p.accent}
              strokeWidth="1.5"
            />
          );
        }),
      )}

      <rect
        x="27"
        y="193"
        width="48"
        height="24"
        rx="3"
        fill="none"
        stroke={p.accent}
        strokeWidth="1.5"
      />
      <rect
        x="81"
        y="193"
        width="118"
        height="24"
        rx="3"
        fill="none"
        stroke={p.accent}
        strokeWidth="1.5"
      />
      <rect
        x="205"
        y="193"
        width="48"
        height="24"
        rx="3"
        fill="none"
        stroke={p.accent}
        strokeWidth="1.5"
      />
    </svg>
  );
}
