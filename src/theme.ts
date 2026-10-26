const PALETTES = {
  p1: { bg: "#0A0A0A", fg: "#A3E635", accent: "#4D7C0F" },
  p2: { bg: "#0A0A0A", fg: "#38BDF8", accent: "#0284C7" },
  p3: { bg: "#0A0A0A", fg: "#FF8C42", accent: "#C2410C" },
};

const projectPaletteConfig: Record<string, { palette: keyof typeof PALETTES }> =
  {
    fractal: { palette: "p3" },
    gravity: { palette: "p1" },
    chatsocket: { palette: "p2" },
    chargpt: { palette: "p3" },
    papyrus: { palette: "p1" },
    automata: { palette: "p2" },
    sharewave: { palette: "p3" },
    election: { palette: "p1" },
    mesh: { palette: "p2" },
    blog: { palette: "p3" },
    paint: { palette: "p1" },
    asteroids: { palette: "p2" },
    shell: { palette: "p3" },
    "below-c-level": { palette: "p1" },
    masm: { palette: "p2" },
    ascii: { palette: "p3" },
    tetris: { palette: "p1" },
    virtualkeys: { palette: "p2" },

    gameoflife: { palette: "p2" },
    sort: { palette: "p1" },
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
