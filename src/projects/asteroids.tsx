import type { CoverProps } from "./types";

export default function Asteroids({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />

      {[
        [30, 40],
        [80, 25],
        [150, 55],
        [210, 30],
        [255, 70],
        [40, 110],
        [250, 130],
        [20, 190],
        [270, 200],
        [100, 245],
        [230, 255],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i % 3 === 0 ? 1.5 : 1}
          fill={p.fg}
          opacity={0.3 + 0.2 * (i % 3)}
        />
      ))}

      <polygon
        points="140,90 125,125 140,118 155,125"
        fill="none"
        stroke={p.fg}
        strokeWidth="2"
      />

      <polygon points="134,120 140,138 146,120" fill={p.fg} opacity="0.5" />

      <rect
        x="139"
        y="60"
        width="2"
        height="8"
        rx="1"
        fill={p.fg}
        opacity="0.9"
      />

      <polygon
        points="65,160 80,148 100,150 115,162 110,178 90,188 70,182"
        fill="none"
        stroke={p.fg}
        strokeWidth="2"
        opacity="0.85"
      />

      <polygon
        points="195,80 210,72 225,78 228,95 215,104 198,98"
        fill="none"
        stroke={p.fg}
        strokeWidth="1.5"
        opacity="0.7"
      />

      <polygon
        points="200,190 210,184 218,190 215,200 205,202"
        fill="none"
        stroke={p.fg}
        strokeWidth="1.5"
        opacity="0.55"
      />
    </svg>
  );
}
