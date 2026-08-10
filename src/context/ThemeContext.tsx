import { useEffect, useState, type ReactNode } from "react";
import { lightTokens, darkTokens } from "../theme.ts";
import { selectionText } from "../constants";
import { ThemeContext, DEFAULT_MODE, type Mode } from "./useTheme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") return saved;
    return DEFAULT_MODE;
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
      mode === "light" ? selectionText.light : selectionText.dark,
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
