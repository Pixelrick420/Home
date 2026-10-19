import type { CoverProps } from "./types";

export default function Fractal({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />
      <text
        x="32"
        y="94"
        fontFamily="monospace"
        fontSize="14"
        fill={p.fg}
        fontWeight="bold"
      >
        !start
      </text>
      <text x="32" y="128" fontFamily="monospace" fontSize="14">
        <tspan fill={p.fg} fontWeight="bold">
          :int{" "}
        </tspan>
        <tspan fill={p.accent}>age = </tspan>
        <tspan fill={p.accent}>25;</tspan>
      </text>
      <text x="32" y="162" fontFamily="monospace" fontSize="14">
        <tspan fill={p.accent}>print(</tspan>
        <tspan fill={p.fg}>"Hello World!"</tspan>
        <tspan fill={p.accent}>);</tspan>
      </text>
      <text
        x="32"
        y="196"
        fontFamily="monospace"
        fontSize="14"
        fill={p.fg}
        fontWeight="bold"
      >
        !end
      </text>
    </svg>
  );
}
