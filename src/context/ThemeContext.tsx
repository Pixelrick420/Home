import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { lightTokens, darkTokens, type ThemeTokens } from "../theme.ts";

export type Mode = "light" | "dark";

interface ThemeCtx {
  mode: Mode;
  toggle: () => void;
  t: ThemeTokens;
}

const ThemeContext = createContext<ThemeCtx>({
  mode: "dark",
  toggle: () => {},
  t: lightTokens,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const t = mode === "light" ? lightTokens : darkTokens;

  useEffect(() => {
    localStorage.setItem("portfolio-theme", mode);
    document.body.style.backgroundColor = t.bg;
    document.body.style.setProperty("--text-color", t.text);
    document.body.style.transition =
      "background-color 0.3s ease, color 0.3s ease";
  }, [mode, t.bg, t.text]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggle: () => setMode((m) => (m === "light" ? "dark" : "light")),
        t,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
