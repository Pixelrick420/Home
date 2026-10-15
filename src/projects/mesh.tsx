import type { CoverProps } from "./types";

const MESH_CELLS = Array.from({ length: 14 }, (_, r) =>
  Array.from({ length: 18 }, (_, c) => {
    if (Math.random() > 0.3) return null;
    return { r, c, op: 0.3 + Math.random() * 0.6 };
  }),
)
  .flat()
  .filter(
    (cell): cell is { r: number; c: number; op: number } => cell !== null,
  );

export default function Mesh({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />
      {MESH_CELLS.map(({ r, c, op }) => (
        <rect
          key={`${r}-${c}`}
          x={c * 15 + 5}
          y={r * 16 + 25}
          width="13"
          height="14"
          fill={p.fg}
          opacity={op}
        />
      ))}
    </svg>
  );
}
