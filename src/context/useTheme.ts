import { createContext, useContext } from "react";
import { darkTokens, lightTokens, type ThemeTokens } from "../theme";

export type Mode = "light" | "dark";

export const DEFAULT_MODE: Mode = "light";

interface ThemeCtx {
  mode: Mode;
  toggle: () => void;
  t: ThemeTokens;
}

export const ThemeContext = createContext<ThemeCtx>({
  mode: DEFAULT_MODE,
  toggle: () => {},
  t: DEFAULT_MODE === "light" ? lightTokens : darkTokens,
});

export function useTheme() {
  return useContext(ThemeContext);
}
