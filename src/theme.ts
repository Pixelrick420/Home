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

  accent: "#A3E635",
  accentHover: "#B8F05A",

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
