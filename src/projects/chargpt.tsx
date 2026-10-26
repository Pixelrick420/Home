import type { CoverProps } from "./types";

const BARS = [10, 18, 8, 46, 14, 6, 26, 12, 34, 9, 16, 7];
const TOP = BARS.indexOf(Math.max(...BARS));

export default function CharGPT({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />
      <g fontFamily="monospace" fontSize="14">
        <text x="32" y="56" fill={p.fg} fontWeight="bold">
          to be, or not to be,
        </text>
        <text x="32" y="82" fill={p.accent}>
          that is the question.
        </text>
        <text x="32" y="108" fill={p.accent}>
          whether it is nobler in
        </text>
        <text x="32" y="134" fill={p.fg}>
          the mind to su
          <tspan fill={p.fg}>█</tspan>
        </text>
      </g>

      <line
        x1="32"
        y1="176"
        x2="248"
        y2="176"
        stroke={p.accent}
        strokeWidth="1"
      />
      {BARS.map((h, i) => (
        <rect
          key={i}
          x={32 + i * 18}
          y={244 - h}
          width="11"
          height={h}
          rx="2"
          fill={i === TOP ? p.fg : p.accent}
        />
      ))}
    </svg>
  );
}
