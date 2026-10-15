import type { CoverProps } from "./types";

export default function GameOfLife({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />

      {(() => {
        const alive = new Set([
          "4,3",
          "5,4",
          "3,5",
          "4,5",
          "5,5",

          "13,8",
          "13,9",
          "13,10",

          "3,13",
          "4,13",
          "3,14",
          "4,14",

          "9,6",
          "10,6",
          "8,7",
          "9,7",
          "9,8",

          "14,12",
          "15,11",
          "16,11",
          "17,12",
          "16,13",
          "15,13",
        ]);
        const cells = [];
        for (let r = 0; r < 17; r++) {
          for (let c = 0; c < 17; c++) {
            const isAlive = alive.has(`${c},${r}`);
            cells.push(
              <rect
                key={`${r}-${c}`}
                x={14 + c * 15}
                y={14 + r * 15}
                width="13"
                height="13"
                rx="2"
                fill={p.fg}
                opacity={isAlive ? 0.88 : 0.06}
              />,
            );
          }
        }
        return cells;
      })()}
    </svg>
  );
}
