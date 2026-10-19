import type { CoverProps } from "./types";

export default function ChatSocket({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />

      <circle cx="140" cy="140" r="24" fill={p.fg} />
      <text
        x="140"
        y="145"
        fontFamily="monospace"
        fontSize="13"
        fill={p.bg}
        textAnchor="middle"
        fontWeight="bold"
      >
        S
      </text>

      {[
        [55, 65],
        [225, 65],
        [55, 215],
        [225, 215],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy={cy}
            r="14"
            fill="none"
            stroke={p.fg}
            strokeWidth="2"
          />
          <circle cx={cx} cy={cy} r="5" fill={p.fg} />
        </g>
      ))}

      {[
        [68.5, 76.9, 107, 110.9],
        [211.5, 76.9, 173, 110.9],
        [68.5, 203.1, 107, 169.1],
        [211.5, 203.1, 173, 169.1],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={p.accent}
          strokeWidth="1.5"
        />
      ))}

      <circle
        cx="140"
        cy="140"
        r="40"
        fill="none"
        stroke={p.accent}
        strokeWidth="1"
      />
      <circle
        cx="140"
        cy="140"
        r="60"
        fill="none"
        stroke={p.bg}
        strokeWidth="1"
      />
    </svg>
  );
}
