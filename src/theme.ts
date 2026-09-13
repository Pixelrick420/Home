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
