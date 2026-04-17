import { useTheme } from "../context/ThemeContext";

interface SableTextureProps {
  opacity?: number;
  size?: number;
}

export function DotField({ opacity = 0.03, size = 1.5 }: SableTextureProps) {
  const { mode } = useTheme();
  const color = mode === "light" ? "#CCCCCC" : "#333333";

  const rand = (x: number, y: number, seed: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.3) * 43758.5453;
    return n - Math.floor(n);
  };

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
      }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {Array.from({ length: 20 }, (_, row) =>
        Array.from({ length: 30 }, (_, col) => {
          const visible = rand(col, row, 1) > 0.4;
          if (!visible) return null;
          const r = size * (0.5 + rand(col, row, 2) * 0.8);
          const ox = (rand(col, row, 3) - 0.5) * 30 * 0.3;
          const oy = (rand(col, row, 4) - 0.5) * 30 * 0.3;
          return (
            <circle
              key={`${row}-${col}`}
              cx={col * 30 + 15 + ox}
              cy={row * 30 + 15 + oy}
              r={r}
              fill={color}
              opacity={opacity}
            />
          );
        }),
      )}
    </svg>
  );
}
