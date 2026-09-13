import { createContext, useContext } from "react";

export type Mode = "light" | "dark";

export const DEFAULT_MODE: Mode = "dark";

interface ThemeCtx {
  mode: Mode;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeCtx>({
  mode: DEFAULT_MODE,
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}
