import type { CoverProps } from "./types";

export default function ShareWave({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />

      <line
        x1="53"
        y1="140"
        x2="228"
        y2="140"
        stroke={p.fg}
        strokeWidth="1"
        opacity="0.08"
      />

      {Array.from({ length: 22 }, (_, i) => {
        const amp = 12 + 62 * Math.abs(Math.sin(i * 0.55 + 0.3));
        const x = 53 + i * 8;
        return (
          <rect
            key={i}
            x={x}
            y={140 - amp}
            width="6.5"
            height={amp * 2}
            rx="3"
            fill={p.fg}
            opacity={0.35 + (amp / 75) * 0.6}
          />
        );
      })}
    </svg>
  );
}
