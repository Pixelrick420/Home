export const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
  sans: "'Space Grotesk', system-ui, sans-serif",
} as const;

export const lightTokens = {
  bg: "#FFFFFF",
  bgAlt: "#FAFAFA",
  bgCard: "#FFFFFF",

  text: "#1A1A1A",
  textSub: "#222222",
  textMuted: "#555555",
  textFaint: "#999999",

  accent: "#444444",
  accentHover: "#111111",

  border: "#222222",
  borderHover: "#AAAAAA",
} as const;

export const darkTokens = {
  bg: "#000000",
  bgAlt: "#0A0A0A",
  bgCard: "#141414",

  text: "#EEEEEE",
  textSub: "#D0D0D0",
  textMuted: "#AAAAAA",
  textFaint: "#797979",

  accent: "#CCCCCC",
  accentHover: "#F2F2F2",

  border: "#BDBDBD",
  borderHover: "#666666",
} as const;

export interface ThemeTokens {
  bg: string;
  bgAlt: string;
  bgCard: string;
  text: string;
  textSub: string;
  textMuted: string;
  textFaint: string;
  accent: string;
  accentHover: string;
  border: string;
  borderHover: string;
}

const PALETTES = {
  p1: { bg: "#0A0A0A", fg: "#A3E635", accent: "#A3E635" },
  p2: { bg: "#0A0A0A", fg: "#38BDF8", accent: "#38BDF8" },
  p3: { bg: "#0A0A0A", fg: "#FF8C42", accent: "#FF8C42" },
};

const projectPaletteConfig: Record<string, { palette: keyof typeof PALETTES }> =
  {
    chatsocket: { palette: "p1" },
    mesh: { palette: "p1" },
    gameoflife: { palette: "p2" },
    sharewave: { palette: "p2" },
    ascii: { palette: "p3" },
    sort: { palette: "p1" },
    tetris: { palette: "p1" },
    "below-c-level": { palette: "p1" },
    fractal: { palette: "p3" },
    election: { palette: "p2" },
    automata: { palette: "p2" },
    asteroids: { palette: "p3" },
    shell: { palette: "p3" },
    leaderboard: { palette: "p2" },
    "handwritten-digits": { palette: "p3" },
  };

export const projectPalettes: Record<
  string,
  { bg: string; fg: string; accent: string }
> = {};
for (const [id, { palette }] of Object.entries(projectPaletteConfig)) {
  projectPalettes[id] = { ...PALETTES[palette] };
}
