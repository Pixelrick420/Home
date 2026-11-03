import type { ComponentType } from "react";
import { getPaletteByIndex } from "../theme";
import type { CoverPalette, CoverProps } from "./types";
import Fractal from "./fractal";
import Ascii from "./ascii";
import ShareWave from "./sharewave";
import ChatSocket from "./chatsocket";
import Election from "./election";
import Sort from "./sort";
import Papyrus from "./papyrus";
import Mesh from "./mesh";
import Asteroids from "./asteroids";
import Tetris from "./tetris";
import BelowCLevel from "./below-c-level";
import Shell from "./shell";
import HandwrittenDigits from "./handwritten-digits";
import CharGPT from "./chargpt";
import Gravity from "./gravity";
import Automata from "./automata";
import Paint from "./paint";
import VirtualKeys from "./virtualkeys";
import Blog from "./blog";
import Masm from "./masm";

const covers: Record<string, ComponentType<CoverProps>> = {
  fractal: Fractal,
  ascii: Ascii,
  sharewave: ShareWave,
  chatsocket: ChatSocket,
  election: Election,
  sort: Sort,
  papyrus: Papyrus,
  mesh: Mesh,
  asteroids: Asteroids,
  tetris: Tetris,
  "below-c-level": BelowCLevel,
  shell: Shell,
  "handwritten-digits": HandwrittenDigits,
  chargpt: CharGPT,
  gravity: Gravity,
  automata: Automata,
  paint: Paint,
  virtualkeys: VirtualKeys,
  blog: Blog,
  masm: Masm,
};

const fallbackPalette: CoverPalette = {
  bg: "#0A0A0A",
  fg: "#FF8C42",
  accent: "#C2410C",
};

export function CoverArt({ id, index }: { id: string; index?: number }) {
  const Cover = covers[id];
  if (!Cover) return null;

  const palette = index !== undefined ? getPaletteByIndex(index) : fallbackPalette;

  return (
    <div className="h-full w-full" aria-hidden="true">
      <Cover p={palette} />
    </div>
  );
}
