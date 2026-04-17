import { useState, type ReactNode } from "react";
import type { Project } from "../types";
import { useTheme } from "../context/ThemeContext";
import { fonts } from "../theme";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

interface Props {
  project: Project;
  index: number;
  visible: boolean;
}

function CoverArt({ id, bg, fg }: { id: string; bg: string; fg: string }) {
  const palettes: Record<string, { bg: string; fg: string }> = {
    chatsocket: { bg: "#0A0A0A", fg: "#A3E635" },
    mesh: { bg: "#0A0A0A", fg: "#A3E635" },
    gameoflife: { bg: "#0A0A0A", fg: "#A3E635" },
    portfolio: { bg: "#0A0A0A", fg: "#A3E635" },
    ascii: { bg: "#0A0A0A", fg: "#38BDF8" },
    sort: { bg: "#0A0A0A", fg: "#38BDF8" },
    tetris: { bg: "#0A0A0A", fg: "#38BDF8" },
    "below-c-level": { bg: "#0A0A0A", fg: "#38BDF8" },
    fractal: { bg: "#0A0A0A", fg: "#A3E635" },
    election: { bg: "#0A0A0A", fg: "#4ECDC4" },
    automata: { bg: "#0A0A0A", fg: "#E8B931" },
    asteroids: { bg: "#0A0A0A", fg: "#FF8C42" },
    shell: { bg: "#0A0A0A", fg: "#FF8C42" },
    leaderboard: { bg: "#0A0A0A", fg: "#A3E635" },
    "handwritten-digits": { bg: "#0A0A0A", fg: "#38BDF8" },
  };

  const p = palettes[id] || { bg, fg };

  const covers: Record<string, ReactNode> = {
    fractal: (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />
        <rect
          x="20"
          y="40"
          width="240"
          height="200"
          rx="8"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="1.5"
        />
        <rect
          x="20"
          y="40"
          width="240"
          height="30"
          fill="#FF8C42"
          opacity="0.1"
        />
        <circle cx="38" cy="55" r="5" fill="#FF5F57" />
        <circle cx="56" cy="55" r="5" fill="#FEBC2E" />
        <circle cx="74" cy="55" r="5" fill="#28C840" />
        <text
          x="120"
          y="59"
          fontFamily="monospace"
          fontSize="9"
          fill="#FF8C42"
          opacity="0.4"
          textAnchor="middle"
        >
          main.fr
        </text>
        <text
          x="38"
          y="95"
          fontFamily="monospace"
          fontSize="11"
          fill="#FF8C42"
          opacity="0.9"
        >
          !func main() -&gt; :void &#123;
        </text>
        <text
          x="48"
          y="115"
          fontFamily="monospace"
          fontSize="10"
          fill="#FF8C42"
          opacity="0.9"
        >
          {" "}
          :int x = 42;
        </text>
        <text
          x="48"
          y="135"
          fontFamily="monospace"
          fontSize="10"
          fill="#FF8C42"
          opacity="0.9"
        >
          {" "}
          print(x);
        </text>
        <text
          x="38"
          y="155"
          fontFamily="monospace"
          fontSize="11"
          fill="#FF8C42"
          opacity="0.9"
        >
          &#125;
        </text>
        <line
          x1="30"
          y1="170"
          x2="250"
          y2="170"
          stroke="#FF8C42"
          strokeWidth="1"
          opacity="0.4"
        />
        <text
          x="38"
          y="186"
          fontFamily="monospace"
          fontSize="9"
          fill="#FF8C42"
          opacity="0.9"
        >
          42
        </text>
        <rect x="225" y="175" width="20" height="15" rx="4" fill="#FF8C42" />
        <text
          x="235"
          y="185"
          fontFamily="sans-serif"
          fontSize="9"
          fill="#0D1117"
          textAnchor="middle"
          fontWeight="bold"
        >
          &gt;_
        </text>
      </svg>
    ),

    ascii: (
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
    ),

    portfolio: (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />
        <rect
          x="30"
          y="30"
          width="220"
          height="220"
          rx="10"
          fill="none"
          stroke={p.fg}
          strokeWidth="2"
        />
        <rect
          x="30"
          y="30"
          width="220"
          height="36"
          fill={p.fg}
          opacity="0.08"
        />
        <circle cx="50" cy="48" r="5" fill={p.fg} />
        <circle cx="65" cy="48" r="5" fill={p.fg} opacity="0.6" />
        <circle cx="80" cy="48" r="5" fill={p.fg} opacity="0.3" />
        <line
          x1="30"
          y1="86"
          x2="250"
          y2="86"
          stroke={p.fg}
          strokeWidth="1"
          opacity="0.15"
        />

        <text
          x="55"
          y="155"
          fontFamily="serif"
          fontSize="56"
          fill={p.fg}
          fontWeight="bold"
          opacity="0.9"
        >
          H
        </text>

        <rect x="55" y="168" width="90" height="6" fill={p.fg} opacity="0.25" />
        <rect
          x="55"
          y="180"
          width="110"
          height="6"
          fill={p.fg}
          opacity="0.15"
        />
        <rect x="55" y="192" width="70" height="6" fill={p.fg} opacity="0.1" />

        <circle cx="210" cy="155" r="30" fill={p.fg} opacity="0.08" />
        <circle cx="210" cy="155" r="18" fill={p.fg} opacity="0.18" />
        <circle cx="210" cy="155" r="6" fill={p.fg} />
        <rect
          x="192"
          y="198"
          width="36"
          height="3"
          fill={p.fg}
          opacity="0.25"
        />
      </svg>
    ),

    chatsocket: (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />

        <circle cx="140" cy="140" r="24" fill={p.fg} opacity="0.85" />
        <text
          x="140"
          y="145"
          fontFamily="monospace"
          fontSize="13"
          fill={p.bg}
          textAnchor="middle"
          fontWeight="bold"
        >
          S
        </text>

        {[
          [55, 65],
          [225, 65],
          [55, 215],
          [225, 215],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r="14"
              fill="none"
              stroke={p.fg}
              strokeWidth="2"
            />
            <circle cx={cx} cy={cy} r="5" fill={p.fg} />
          </g>
        ))}

        {[
          [55, 65, 116, 120],
          [225, 65, 164, 120],
          [55, 215, 116, 160],
          [225, 215, 164, 160],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={p.fg}
            strokeWidth="1.5"
            opacity="0.5"
          />
        ))}

        <circle
          cx="140"
          cy="140"
          r="40"
          fill="none"
          stroke={p.fg}
          strokeWidth="1"
          opacity="0.2"
        />
        <circle
          cx="140"
          cy="140"
          r="60"
          fill="none"
          stroke={p.fg}
          strokeWidth="1"
          opacity="0.1"
        />
      </svg>
    ),

    election: (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />
        <rect
          x="30"
          y="30"
          width="220"
          height="220"
          rx="10"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="2"
        />
        <text
          x="140"
          y="70"
          fontFamily="sans-serif"
          fontSize="14"
          fill="#FF8C42"
          textAnchor="middle"
          fontWeight="bold"
          letterSpacing="4"
        >
          BALLOT
        </text>
        <rect
          x="50"
          y="100"
          width="18"
          height="18"
          rx="3"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="2"
        />
        <polyline
          points="53,109 58,115 65,103"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="2.5"
        />
        <text
          x="78"
          y="113"
          fontFamily="sans-serif"
          fontSize="12"
          fill="#FF8C42"
        >
          Candidate A
        </text>
        <rect
          x="50"
          y="135"
          width="18"
          height="18"
          rx="3"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="2"
        />
        <text
          x="78"
          y="148"
          fontFamily="sans-serif"
          fontSize="12"
          fill="#FF8C42"
        >
          Candidate B
        </text>
        <rect
          x="50"
          y="170"
          width="18"
          height="18"
          rx="3"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="2"
        />
        <text
          x="78"
          y="183"
          fontFamily="sans-serif"
          fontSize="12"
          fill="#FF8C42"
        >
          NOTA
        </text>
      </svg>
    ),

    sort: (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />

        {[
          { h: 40, sorted: false },
          { h: 90, sorted: false },
          { h: 55, sorted: false },
          { h: 130, sorted: false },
          { h: 75, sorted: false },
          { h: 160, sorted: true },
          { h: 175, sorted: true },
          { h: 200, sorted: true },
          { h: 215, sorted: true },
          { h: 230, sorted: true },
        ].map(({ h, sorted }, i) => (
          <rect
            key={i}
            x={22 + i * 24}
            y={250 - h}
            width="18"
            height={h}
            rx="3"
            fill={sorted ? p.fg : p.fg}
            opacity={sorted ? 0.9 : 0.3}
          />
        ))}

        <line
          x1="22"
          y1="255"
          x2="258"
          y2="255"
          stroke={p.fg}
          strokeWidth="1"
          opacity="0.2"
        />
      </svg>
    ),

    automata: (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />
        <circle
          cx="60"
          cy="140"
          r="22"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="2"
        />
        <circle
          cx="140"
          cy="80"
          r="22"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="2"
        />
        <circle
          cx="140"
          cy="200"
          r="22"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="2"
        />
        <circle
          cx="220"
          cy="140"
          r="22"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="2.5"
        />
        <circle
          cx="220"
          cy="140"
          r="27"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="1"
        />
        <line
          x1="22"
          y1="140"
          x2="38"
          y2="140"
          stroke="#FF8C42"
          strokeWidth="2"
        />
        <polygon points="38,136 38,144 46,140" fill="#FF8C42" />
        <line
          x1="82"
          y1="128"
          x2="118"
          y2="92"
          stroke="#FF8C42"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <line
          x1="82"
          y1="152"
          x2="118"
          y2="188"
          stroke="#FF8C42"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <line
          x1="162"
          y1="90"
          x2="198"
          y2="128"
          stroke="#FF8C42"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <line
          x1="162"
          y1="190"
          x2="198"
          y2="152"
          stroke="#FF8C42"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <text
          x="60"
          y="145"
          fontFamily="monospace"
          fontSize="11"
          fill="#FF8C42"
          textAnchor="middle"
        >
          q0
        </text>
        <text
          x="140"
          y="85"
          fontFamily="monospace"
          fontSize="11"
          fill="#FF8C42"
          textAnchor="middle"
        >
          q1
        </text>
        <text
          x="140"
          y="205"
          fontFamily="monospace"
          fontSize="11"
          fill="#FF8C42"
          textAnchor="middle"
        >
          q2
        </text>
        <text
          x="220"
          y="145"
          fontFamily="monospace"
          fontSize="11"
          fill="#FF8C42"
          textAnchor="middle"
        >
          q3
        </text>
      </svg>
    ),

    mesh: (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />
        {Array.from({ length: 14 }, (_, r) =>
          Array.from({ length: 18 }, (_, c) => {
            const shades = [
              "#A3E635",
              "#A3E635",
              "#A3E635",
              "#222222",
              "#0a0a0a",
            ];
            if (Math.random() > 0.3) return null;
            const color = shades[Math.floor(Math.random() * shades.length)];
            const op = 0.3 + Math.random() * 0.6;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * 15 + 5}
                y={r * 16 + 25}
                width="13"
                height="14"
                fill={color}
                opacity={op}
              />
            );
          }),
        )}
      </svg>
    ),

    asteroids: (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />

        {[
          [30, 40],
          [80, 25],
          [150, 55],
          [210, 30],
          [255, 70],
          [40, 110],
          [250, 130],
          [20, 190],
          [270, 200],
          [100, 245],
          [230, 255],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i % 3 === 0 ? 1.5 : 1}
            fill={p.fg}
            opacity={0.3 + 0.2 * (i % 3)}
          />
        ))}

        <polygon
          points="140,90 125,125 140,118 155,125"
          fill="none"
          stroke={p.fg}
          strokeWidth="2"
        />

        <polygon points="134,120 140,138 146,120" fill={p.fg} opacity="0.5" />

        <rect
          x="139"
          y="60"
          width="2"
          height="8"
          rx="1"
          fill={p.fg}
          opacity="0.9"
        />

        <polygon
          points="65,160 80,148 100,150 115,162 110,178 90,188 70,182"
          fill="none"
          stroke={p.fg}
          strokeWidth="2"
          opacity="0.85"
        />

        <polygon
          points="195,80 210,72 225,78 228,95 215,104 198,98"
          fill="none"
          stroke={p.fg}
          strokeWidth="1.5"
          opacity="0.7"
        />

        <polygon
          points="200,190 210,184 218,190 215,200 205,202"
          fill="none"
          stroke={p.fg}
          strokeWidth="1.5"
          opacity="0.55"
        />
      </svg>
    ),

    tetris: (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />

        <rect
          x="70"
          y="20"
          width="140"
          height="240"
          rx="4"
          fill="none"
          stroke={p.fg}
          strokeWidth="1.5"
          opacity="0.3"
        />

        {[
          [1, 1, 1, 1, 1, 1, 1],
          [1, 1, 0, 1, 1, 1, 1],
          [1, 1, 1, 1, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
          [0, 0, 1, 1, 1, 0, 0],
        ].map((row, r) =>
          row.map((on, c) =>
            on ? (
              <rect
                key={`${r}-${c}`}
                x={74 + c * 19}
                y={222 - r * 19}
                width="17"
                height="17"
                rx="2"
                fill={p.fg}
                opacity={0.15 + r * 0.12}
              />
            ) : null,
          ),
        )}

        {[
          [0, 0],
          [1, 0],
          [2, 0],
          [2, 1],
        ].map(([dc, dr], i) => (
          <rect
            key={i}
            x={74 + (2 + dc) * 19}
            y={108 + dr * 19}
            width="17"
            height="17"
            rx="2"
            fill={p.fg}
            opacity="0.9"
          />
        ))}

        {[
          [0, 0],
          [1, 0],
          [2, 0],
          [2, 1],
        ].map(([dc, dr], i) => (
          <rect
            key={`g${i}`}
            x={74 + (2 + dc) * 19}
            y={184 + dr * 19}
            width="17"
            height="17"
            rx="2"
            fill="none"
            stroke={p.fg}
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        <text
          x="240"
          y="44"
          fontFamily="monospace"
          fontSize="8"
          fill={p.fg}
          opacity="0.4"
          textAnchor="middle"
        >
          NEXT
        </text>
        {[
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ].map(([dc, dr], i) => (
          <rect
            key={i}
            x={230 + dc * 14}
            y={52 + dr * 14}
            width="12"
            height="12"
            rx="2"
            fill={p.fg}
            opacity="0.6"
          />
        ))}
        <text
          x="28"
          y="44"
          fontFamily="monospace"
          fontSize="8"
          fill={p.fg}
          opacity="0.4"
        >
          SCORE
        </text>
        <text
          x="28"
          y="58"
          fontFamily="monospace"
          fontSize="10"
          fill={p.fg}
          opacity="0.7"
        >
          01480
        </text>
        <text
          x="28"
          y="82"
          fontFamily="monospace"
          fontSize="8"
          fill={p.fg}
          opacity="0.4"
        >
          LEVEL
        </text>
        <text
          x="28"
          y="96"
          fontFamily="monospace"
          fontSize="10"
          fill={p.fg}
          opacity="0.7"
        >
          3
        </text>
      </svg>
    ),

    gameoflife: (
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
                  fill={isAlive ? p.fg : p.fg}
                  opacity={isAlive ? 0.88 : 0.06}
                />,
              );
            }
          }
          return cells;
        })()}
      </svg>
    ),

    "below-c-level": (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />

        {Array.from({ length: 15 }, (_, i) => (
          <line
            key={`h${i}`}
            x1="20"
            y1={20 + i * 17}
            x2="260"
            y2={20 + i * 17}
            stroke={p.fg}
            strokeWidth="0.5"
            opacity="0.06"
          />
        ))}
        {Array.from({ length: 15 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={20 + i * 17}
            y1="20"
            x2={20 + i * 17}
            y2="260"
            stroke={p.fg}
            strokeWidth="0.5"
            opacity="0.06"
          />
        ))}

        {[
          [7, 8],
          [6, 8],
          [5, 8],
          [4, 8],
          [4, 7],
          [4, 6],
          [5, 6],
          [6, 6],
          [7, 6],
          [8, 6],
          [9, 6],
          [9, 7],
          [9, 8],
          [9, 9],
          [8, 9],
          [7, 9],
          [6, 9],
        ].map(([c, r], i, arr) => (
          <rect
            key={i}
            x={20 + c * 17}
            y={20 + r * 17}
            width="15"
            height="15"
            rx="3"
            fill={p.fg}
            opacity={i === 0 ? 0.95 : 0.35 + (i / arr.length) * 0.4}
          />
        ))}

        <rect
          x={20 + 7 * 17}
          y={20 + 8 * 17}
          width="15"
          height="15"
          rx="3"
          fill={p.fg}
          opacity="0.95"
        />

        <circle cx={20 + 7 * 17 + 5} cy={20 + 8 * 17 + 5} r="2" fill={p.bg} />
        <circle cx={20 + 7 * 17 + 10} cy={20 + 8 * 17 + 5} r="2" fill={p.bg} />

        <rect
          x={20 + 11 * 17}
          y={20 + 4 * 17}
          width="15"
          height="15"
          rx="3"
          fill="#CCCCCC"
          opacity="0.85"
        />
      </svg>
    ),

    shell: (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />
        {/* Terminal frame */}
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
        <rect
          x="20"
          y="40"
          width="240"
          height="28"
          fill={p.fg}
          opacity="0.08"
        />
        <circle cx="38" cy="54" r="5" fill="#FF5F57" />
        <circle cx="56" cy="54" r="5" fill="#FEBC2E" />
        <circle cx="74" cy="54" r="5" fill="#28C840" />
        {/* Prompt lines */}
        <text
          x="34"
          y="92"
          fontFamily="monospace"
          fontSize="11"
          fill={p.fg}
          opacity="0.5"
        >
          $
        </text>
        <text
          x="46"
          y="92"
          fontFamily="monospace"
          fontSize="11"
          fill={p.fg}
          opacity="0.9"
        >
          ls -la
        </text>
        <text
          x="34"
          y="111"
          fontFamily="monospace"
          fontSize="10"
          fill={p.fg}
          opacity="0.55"
        >
          drwxr-xr-x shell.py
        </text>
        <text
          x="34"
          y="128"
          fontFamily="monospace"
          fontSize="10"
          fill={p.fg}
          opacity="0.55"
        >
          drwxr-xr-x README.md
        </text>
        <text
          x="34"
          y="148"
          fontFamily="monospace"
          fontSize="11"
          fill={p.fg}
          opacity="0.5"
        >
          $
        </text>
        <text
          x="46"
          y="148"
          fontFamily="monospace"
          fontSize="11"
          fill={p.fg}
          opacity="0.9"
        >
          echo "hello"
        </text>
        <text
          x="34"
          y="167"
          fontFamily="monospace"
          fontSize="11"
          fill={p.fg}
          opacity="0.7"
        >
          hello
        </text>
        <text
          x="34"
          y="187"
          fontFamily="monospace"
          fontSize="11"
          fill={p.fg}
          opacity="0.5"
        >
          $
        </text>
        <text
          x="46"
          y="187"
          fontFamily="monospace"
          fontSize="11"
          fill={p.fg}
          opacity="0.9"
        >
          cd ~
        </text>
        {/* Blinking cursor */}
        <text
          x="34"
          y="207"
          fontFamily="monospace"
          fontSize="11"
          fill={p.fg}
          opacity="0.5"
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
          opacity="0.85"
        />
      </svg>
    ),

    leaderboard: (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />
        {/* Trophy podium bars */}
        {/* 2nd place */}
        <rect
          x="40"
          y="130"
          width="60"
          height="110"
          rx="4"
          fill={p.fg}
          opacity="0.45"
        />
        <text
          x="70"
          y="122"
          fontFamily="sans-serif"
          fontSize="13"
          fill={p.fg}
          opacity="0.7"
          textAnchor="middle"
          fontWeight="bold"
        >
          2
        </text>
        {/* 1st place */}
        <rect
          x="110"
          y="90"
          width="60"
          height="150"
          rx="4"
          fill={p.fg}
          opacity="0.9"
        />
        <text
          x="140"
          y="82"
          fontFamily="sans-serif"
          fontSize="13"
          fill={p.fg}
          opacity="0.9"
          textAnchor="middle"
          fontWeight="bold"
        >
          1
        </text>
        {/* Crown above 1st */}
        <polygon
          points="140,44 128,60 140,54 152,60"
          fill={p.fg}
          opacity="0.9"
        />
        <circle cx="128" cy="62" r="4" fill={p.fg} opacity="0.9" />
        <circle cx="140" cy="56" r="4" fill={p.fg} opacity="0.9" />
        <circle cx="152" cy="62" r="4" fill={p.fg} opacity="0.9" />
        {/* 3rd place */}
        <rect
          x="180"
          y="160"
          width="60"
          height="80"
          rx="4"
          fill={p.fg}
          opacity="0.3"
        />
        <text
          x="210"
          y="152"
          fontFamily="sans-serif"
          fontSize="13"
          fill={p.fg}
          opacity="0.5"
          textAnchor="middle"
          fontWeight="bold"
        >
          3
        </text>
        {/* Base line */}
        <line
          x1="30"
          y1="242"
          x2="250"
          y2="242"
          stroke={p.fg}
          strokeWidth="1"
          opacity="0.2"
        />
      </svg>
    ),

    "handwritten-digits": (
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" fill={p.bg} />
        {/* 28x28-style pixel grid showing digit "5" — sampled cells */}
        {(() => {
          const cellSize = 9;
          const cols = 28;
          const rows = 28;
          const offsetX = (280 - cols * cellSize) / 2;
          const offsetY = (280 - rows * cellSize) / 2;
          const lit = new Set([
            "10,11",
            "10,12",
            "11,11",
            "11,12",
            "11,13",
            "12,12",
            "12,13",
            "13,13",
            "13,14",
            "13,15",
            "14,14",
            "14,15",
            "14,16",
            "15,15",
            "15,16",
            "15,17",
            "15,18",
            "16,17",
            "16,18",
            "16,19",
            "17,17",
            "17,18",
            "17,19",
            "18,15",
            "18,16",
            "18,17",
            "18,18",
            "18,19",
            "19,13",
            "19,14",
            "19,15",
            "19,16",
            "19,17",
            "19,18",
            "19,19",
            "20,12",
            "20,13",
            "20,14",
            "20,15",
            "20,16",
            "20,17",
            "21,10",
            "21,11",
            "21,12",
            "21,13",
            "21,14",
            "21,15",
            "22,10",
            "22,11",
            "22,12",
            "22,13",
            "22,7",
            "22,8",
            "22,9",
            "23,10",
            "23,11",
            "23,12",
            "23,5",
            "23,6",
            "23,7",
            "23,8",
            "23,9",
            "24,10",
            "24,4",
            "24,5",
            "24,6",
            "24,7",
            "24,8",
            "24,9",
            "5,17",
            "5,18",
            "5,20",
            "5,21",
            "5,22",
            "6,11",
            "6,12",
            "6,13",
            "6,14",
            "6,15",
            "6,16",
            "6,17",
            "6,18",
            "6,19",
            "6,20",
            "6,21",
            "6,22",
            "7,10",
            "7,11",
            "7,12",
            "7,13",
            "7,14",
            "7,15",
            "7,16",
            "7,17",
            "7,8",
            "7,9",
            "8,10",
            "8,11",
            "8,12",
            "8,13",
            "8,14",
            "8,15",
            "8,16",
            "8,17",
            "8,8",
            "8,9",
            "9,11",
            "9,12",
            "9,13",
            "9,17",
            "9,9",
          ]);

          const cells = [];
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const on = lit.has(`${c},${r}`);
              cells.push(
                <rect
                  key={`${c}-${r}`}
                  y={offsetX + c * cellSize}
                  x={offsetY + r * cellSize}
                  width={cellSize - 1}
                  height={cellSize - 1}
                  rx="1"
                  fill={p.fg}
                  opacity={on ? 0.85 : 0.05}
                />,
              );
            }
          }
          return cells;
        })()}
      </svg>
    ),
  };

  const content = covers[id];
  if (!content) return null;

  return <div style={{ width: "100%", height: "100%" }}>{content}</div>;
}

export default function ProjectCard({ project, index, visible }: Props) {
  const { t } = useTheme();
  const [hov, setHov] = useState(false);

  const bgPalettes: Record<string, { bg: string; fg: string }> = {
    // Green group
    chatsocket: { bg: "#0A0A0A", fg: "#A3E635" },
    mesh: { bg: "#0A0A0A", fg: "#A3E635" },
    gameoflife: { bg: "#0A0A0A", fg: "#A3E635" },
    portfolio: { bg: "#0A0A0A", fg: "#A3E635" },
    // Blue group
    ascii: { bg: "#0A0A0A", fg: "#38BDF8" },
    sort: { bg: "#0A0A0A", fg: "#38BDF8" },
    tetris: { bg: "#0A0A0A", fg: "#38BDF8" },
    "below-c-level": { bg: "#0A0A0A", fg: "#38BDF8" },
    // Keep original colors for the rest
    fractal: { bg: "#0D1117", fg: "#A3E635" },
    election: { bg: "#1a2332", fg: "#4ECDC4" },
    automata: { bg: "#1C1C1C", fg: "#E8B931" },
    asteroids: { bg: "#0a0a0a", fg: "#FF8C42" },
    // New projects
    shell: { bg: "#0A0A0A", fg: "#FF8C42" },
    leaderboard: { bg: "#0A0A0A", fg: "#A3E635" },
    "handwritten-digits": { bg: "#0A0A0A", fg: "#38BDF8" },
  };

  const pal = bgPalettes[project.id] || { bg: "#0a0a0a", fg: "#FF8C42" };
  console.log(project.id);

  return (
    <motion.article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 40,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="card-hover"
      style={{
        backgroundColor: t.bgCard,
        border: `1px solid ${hov ? t.accent : t.border}`,
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "100%",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <motion.div
            animate={{ scale: hov ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
            style={{ width: "100%", height: "100%" }}
          >
            <CoverArt id={project.id} bg={pal.bg} fg={pal.fg} />
          </motion.div>

          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{
              clipPath: hov ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
            }}
            transition={{ duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(10, 10, 10, 0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontFamily: fonts.sans,
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "#1A1A1A",
                textDecoration: "none",
                backgroundColor: t.accent,
                padding: "14px 24px",
                borderRadius: "50px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaGithub size={18} />
              View on GitHub
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div style={{ padding: "24px 28px 28px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "12px",
          }}
        >
          <h3
            style={{
              fontFamily: fonts.serif,
              fontSize: "22px",
              fontWeight: 700,
              color: t.text,
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: "12px",
              color: t.textFaint,
              marginTop: "2px",
              flexShrink: 0,
              marginLeft: "12px",
            }}
          >
            {project.year}
          </span>
        </div>

        <p
          style={{
            fontFamily: fonts.sans,
            fontSize: "15px",
            color: t.textSub,
            lineHeight: 1.6,
            margin: "0 0 18px 0",
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: fonts.sans,
                fontSize: "11px",
                fontWeight: 500,
                color: t.textSub,
                backgroundColor: t.bgAlt,
                padding: "6px 12px",
                borderRadius: "6px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
