import { createContext, useContext } from "react";
import { darkTokens, lightTokens, type ThemeTokens } from "../theme";

export type Mode = "light" | "dark";

export const DEFAULT_MODE: Mode = "dark";

const tokensByMode: Record<Mode, ThemeTokens> = {
  light: lightTokens,
  dark: darkTokens,
};

interface ThemeCtx {
  mode: Mode;
  toggle: () => void;
  t: ThemeTokens;
}

export const ThemeContext = createContext<ThemeCtx>({
  mode: DEFAULT_MODE,
  toggle: () => {},
  t: tokensByMode[DEFAULT_MODE],
});

export function useTheme() {
  return useContext(ThemeContext);
}
