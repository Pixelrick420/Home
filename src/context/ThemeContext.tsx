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
  t: darkTokens,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") return saved;
    return "dark";
  });

  const t = mode === "light" ? lightTokens : darkTokens;

  useEffect(() => {
    localStorage.setItem("portfolio-theme", mode);
    const root = document.documentElement;

    Object.entries(t).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    root.style.setProperty(
      "--selection-text",
      mode === "light" ? "#FFFFFF" : "#1A1A1A",
    );

    root.style.setProperty("--scrollbar", t.borderHover);
  }, [mode, t]);

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
