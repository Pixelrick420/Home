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

  accent: "#38BDF8",
  accentHover: "#60A5FA",

  border: "#E5E5E5",
  borderHover: "#CCCCCC",

  white: "#FFFFFF",
} as const;

export const darkTokens = {
  bg: "#0A0A0A",
  bgAlt: "#141414",
  bgCard: "#1A1A1A",

  text: "#F5F5F5",
  textSub: "#CCCCCC",
  textMuted: "#AAAAAA",
  textFaint: "#888888",

  accent: "#A3E635",
  accentHover: "#B8F05A",

  border: "#2A2A2A",
  borderHover: "#3A3A3A",

  white: "#FFFFFF",
} as const;

export const coverPalettes = [
  { bg: "#1A1A1A", fg: "#A3E635" },
  { bg: "#0A0A0A", fg: "#A3E635" },
  { bg: "#FAFAFA", fg: "#1A1A1A" },
  { bg: "#A3E635", fg: "#1A1A1A" },
  { bg: "#1A1A1A", fg: "#FF6B6B" },
  { bg: "#FAFAFA", fg: "#A3E635" },
  { bg: "#0A0A0A", fg: "#FFFFFF" },
  { bg: "#FAFAFA", fg: "#666666" },
] as const;

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
  white: string;
}

const PALETTES = {
  p1: { bg: "#0A0A0A", fg: "#A3E635", accent: "#A3E635" },
  p2: { bg: "#0A0A0A", fg: "#38BDF8", accent: "#38BDF8" },
  p3: { bg: "#0A0A0A", fg: "#FF8C42", accent: "#FF8C42" },
};

const projectPaletteConfig: Record<
  string,
  {
    palette: keyof typeof PALETTES;
    overrides?: Partial<{ bg: string; fg: string; accent: string }>;
  }
> = {
  chatsocket: { palette: "p1" },
  mesh: { palette: "p1" },
  gameoflife: { palette: "p1" },
  portfolio: { palette: "p1" },
  ascii: { palette: "p2" },
  sort: { palette: "p2" },
  tetris: { palette: "p2" },
  "below-c-level": { palette: "p2" },
  fractal: { palette: "p3" },
  election: { palette: "p3" },
  automata: { palette: "p3" },
  asteroids: { palette: "p3" },
  shell: { palette: "p3" },
  leaderboard: { palette: "p1" },
  "handwritten-digits": { palette: "p2" },
};

export const projectPalettes: Record<
  string,
  { bg: string; fg: string; accent: string }
> = {};
for (const [id, { palette, overrides }] of Object.entries(
  projectPaletteConfig,
)) {
  projectPalettes[id] = { ...PALETTES[palette], ...overrides };
}
