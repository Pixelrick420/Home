import type { CoverProps } from "./types";

const LISTING: [string, string][] = [
  ["0300:", "MOV AL, [0800]"],
  ["0302:", "MOV BL, [0801]"],
  ["0304:", "MUL BL"],
  ["0306:", "DIV BL"],
  ["0308:", "JNZ 030E"],
  ["030A:", "HLT"],
];

export default function Masm({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />
      <text
        x="32"
        y="58"
        fontFamily="monospace"
        fontSize="14"
        fontWeight="bold"
        fill={p.fg}
      >
        CODE:
      </text>
      {LISTING.map(([addr, op], i) => (
        <text
          key={addr}
          x="32"
          y={92 + i * 28}
          fontFamily="monospace"
          fontSize="14"
        >
          <tspan fill={p.accent}>{addr}</tspan>
          <tspan x="92" fill={p.fg}>
            {op}
          </tspan>
        </text>
      ))}
    </svg>
  );
}
