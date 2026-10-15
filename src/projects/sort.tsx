import type { CoverProps } from "./types";

export default function Sort({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />

      {[
        { h: 40, sorted: false },
        { h: 90, sorted: false },
        { h: 55, sorted: false },
        { h: 130, sorted: false },
        { h: 75, sorted: false },
        { h: 160, sorted: true },
        { h: 175, sorted: true },
        { h: 200, sorted: true },
        { h: 215, sorted: true },
        { h: 230, sorted: true },
      ].map(({ h, sorted }, i) => (
        <rect
          key={i}
          x={22 + i * 24}
          y={250 - h}
          width="18"
          height={h}
          rx="3"
          fill={p.fg}
          opacity={sorted ? 0.9 : 0.3}
        />
      ))}

      <line
        x1="22"
        y1="255"
        x2="258"
        y2="255"
        stroke={p.fg}
        strokeWidth="1"
        opacity="0.2"
      />
    </svg>
  );
}
