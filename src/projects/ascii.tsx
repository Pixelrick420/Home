import type { CoverProps } from "./types";

export default function Ascii({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 260 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />

      {[
        "@@@%%##**++==--::..   ",
        "@@@%%##**++==--::..   ",
        "%%%##**++==--::..     ",
        "##***++==--::..       ",
        "***++==--::..   ..    ",
        "+++==--::..   ..::    ",
        "===--::..   ..::==    ",
        "--::..   ..::==++*    ",
        ":..   ..::==++**##    ",
        "   ..::==++**##%%@    ",
        " ..::==++**##%%@@@    ",
        "..::==++**##%%@@@@@   ",
      ].map((row, r) =>
        row.split("").map((ch, c) => {
          const bright = 0.15 + (r / 11) * 0.7 + (c / 21) * 0.15;
          return (
            <text
              key={`${r}-${c}`}
              x={22 + c * 11.5}
              y={60 + r * 17}
              fontFamily="monospace"
              fontSize="12"
              fill={p.fg}
              opacity={Math.min(bright, 0.9) + 0.3}
            >
              {ch}
            </text>
          );
        }),
      )}
    </svg>
  );
}
