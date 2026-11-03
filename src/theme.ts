const PALETTES = [
  { bg: "#0A0A0A", fg: "#FF8C42", accent: "#C2410C" },
  { bg: "#0A0A0A", fg: "#38BDF8", accent: "#0284C7" },
  { bg: "#0A0A0A", fg: "#A3E635", accent: "#4D7C0F" },
] as const;

export function getPaletteByIndex(index: number) {
  return PALETTES[index % PALETTES.length];
}

export const projectPalettes: Record<
  string,
  { bg: string; fg: string; accent: string }
> = {};
