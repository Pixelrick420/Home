import type { CoverProps } from "./types";

const jitter = (n: number) => {
  const v = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return (v - Math.floor(v)) * 2 - 1;
};

const ARMS = [0, 1].flatMap((arm) =>
  Array.from({ length: 56 }, (_, i) => {
    const t = i / 55;
    const r = 12 + Math.pow(t, 0.85) * 100 + jitter(arm * 100 + i) * 3.5;
    const a = arm * Math.PI + t * 2.7 * Math.PI;
    return {
      key: `${arm}-${i}`,
      x: 140 + r * Math.cos(a),
      y: 140 + r * Math.sin(a) * 0.72,
      r: 3 - t * 1.9,
      bright: t < 0.55,
    };
  }),
);

const STARS = Array.from({ length: 22 }, (_, i) => ({
  x: 140 + jitter(i * 3 + 1) * 130,
  y: 140 + jitter(i * 3 + 2) * 130,
}));

export default function Gravity({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />
      {STARS.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="1" fill={p.accent} />
      ))}
      <g transform="rotate(-20 140 140)">
        {ARMS.map((d) => (
          <circle
            key={d.key}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={d.bright ? p.fg : p.accent}
          />
        ))}
        <circle cx="140" cy="140" r="8" fill={p.fg} />
        <circle
          cx="140"
          cy="140"
          r="15"
          fill="none"
          stroke={p.fg}
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
