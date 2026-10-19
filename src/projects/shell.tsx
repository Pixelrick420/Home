import type { CoverProps } from "./types";

export default function Shell({ p }: CoverProps) {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="280" fill={p.bg} />
      <rect
        x="20"
        y="40"
        width="240"
        height="200"
        rx="8"
        fill="none"
        stroke={p.fg}
        strokeWidth="1.5"
      />
      <circle cx="38" cy="54" r="5" fill="#FF5F57" />
      <circle cx="56" cy="54" r="5" fill="#FEBC2E" />
      <circle cx="74" cy="54" r="5" fill="#28C840" />
      <text
        x="34"
        y="92"
        fontFamily="monospace"
        fontSize="11"
        fill={p.accent}
      >
        $
      </text>
      <text
        x="46"
        y="92"
        fontFamily="monospace"
        fontSize="11"
        fill={p.fg}
      >
        ls -la
      </text>
      <text
        x="34"
        y="111"
        fontFamily="monospace"
        fontSize="10"
        fill={p.accent}
      >
        drwxr-xr-x shell.py
      </text>
      <text
        x="34"
        y="128"
        fontFamily="monospace"
        fontSize="10"
        fill={p.accent}
      >
        drwxr-xr-x README.md
      </text>
      <text
        x="34"
        y="148"
        fontFamily="monospace"
        fontSize="11"
        fill={p.accent}
      >
        $
      </text>
      <text
        x="46"
        y="148"
        fontFamily="monospace"
        fontSize="11"
        fill={p.fg}
      >
        echo "hello"
      </text>
      <text
        x="34"
        y="167"
        fontFamily="monospace"
        fontSize="11"
        fill={p.fg}
      >
        hello
      </text>
      <text
        x="34"
        y="187"
        fontFamily="monospace"
        fontSize="11"
        fill={p.accent}
      >
        $
      </text>
      <text
        x="46"
        y="187"
        fontFamily="monospace"
        fontSize="11"
        fill={p.fg}
      >
        cd ~
      </text>
      <text
        x="34"
        y="207"
        fontFamily="monospace"
        fontSize="11"
        fill={p.accent}
      >
        $
      </text>
      <rect
        x="46"
        y="196"
        width="8"
        height="13"
        rx="1"
        fill={p.fg}
      />
    </svg>
  );
}
