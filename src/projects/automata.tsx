import type { CoverProps } from "./types";

const STATES = [
  { id: "q0", x: 52, y: 140 },
  { id: "q1", x: 140, y: 92 },
  { id: "q2", x: 140, y: 188 },
  { id: "q3", x: 228, y: 140 },
];

const EDGES = [
  { d: "M66 132.3L126 99.7", label: "a", lx: 88, ly: 104 },
  { d: "M66 147.7L126 180.3", label: "b", lx: 88, ly: 186 },
  { d: "M154 99.7L214 132.3", label: "ε", lx: 192, ly: 104 },
  { d: "M154 180.3L214 147.7", label: "ε", lx: 192, ly: 186 },
];

export default function Automata({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker
          id="automata-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill={p.accent} />
        </marker>
      </defs>
      <rect width="280" height="280" fill={p.bg} />

      <path
        d="M14 140L34 140"
        stroke={p.accent}
        strokeWidth="2"
        markerEnd="url(#automata-arrow)"
      />

      {EDGES.map((e) => (
        <g key={e.d}>
          <path
            d={e.d}
            stroke={p.accent}
            strokeWidth="2"
            fill="none"
            markerEnd="url(#automata-arrow)"
          />
          <text
            x={e.lx}
            y={e.ly}
            fontFamily="monospace"
            fontSize="14"
            fontWeight="bold"
            fill={p.fg}
            textAnchor="middle"
          >
            {e.label}
          </text>
        </g>
      ))}

      {STATES.map((s) => (
        <g key={s.id}>
          <circle
            cx={s.x}
            cy={s.y}
            r="16"
            fill={p.bg}
            stroke={p.fg}
            strokeWidth="2"
          />
          {s.id === "q3" && (
            <circle
              cx={s.x}
              cy={s.y}
              r="11"
              fill="none"
              stroke={p.fg}
              strokeWidth="1.5"
            />
          )}
          <text
            x={s.x}
            y={s.y + 4}
            fontFamily="monospace"
            fontSize="11"
            fill={p.fg}
            textAnchor="middle"
          >
            {s.id}
          </text>
        </g>
      ))}
    </svg>
  );
}
