import type { CoverProps } from "./types";

const MESH_CELLS = Array.from({ length: 14 }, (_, r) =>
  Array.from({ length: 18 }, (_, c) => {
    if (Math.random() > 0.3) return null;
    return { r, c, bright: Math.random() >= 0.5 };
  }),
)
  .flat()
  .filter(
    (cell): cell is { r: number; c: number; bright: boolean } =>
      cell !== null,
  );

export default function Mesh({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />
      {MESH_CELLS.map(({ r, c, bright }) => (
        <rect
          key={`${r}-${c}`}
          x={c * 15 + 5}
          y={r * 16 + 25}
          width="13"
          height="14"
          fill={bright ? p.fg : p.accent}
        />
      ))}
    </svg>
  );
}
