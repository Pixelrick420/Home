import type { CoverProps } from "./types";

export default function Papyrus({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />
      <g
        transform="translate(140,140) scale(5.926) translate(-54,-54)"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path
          stroke={p.fg}
          d="M41.06,37.125L48.94,37.125M50.06,40.5L65.81,40.5M42.19,43.875L48.94,43.875M41.06,47.25L44.44,47.25M55.69,50.625L64.69,50.625M39.94,57.375L53.44,57.375M43.31,70.875L50.06,70.875"
        />
        <path
          stroke={p.fg}
          d="M53.44,37.125L62.44,37.125M59.44,43.875L64.69,43.875M41.06,54L47.81,54M41.06,64.125L51.19,64.125"
        />
        <path
          stroke={p.accent}
          d="M39.94,40.5L46.69,40.5M53.44,43.875L55.69,43.875M47.81,47.25L68.06,47.25M39.94,50.625L50.06,50.625M52.31,54L61.31,54M42.19,60.75L48.94,60.75M39.94,67.5L45.56,67.5"
        />
      </g>
    </svg>
  );
}
