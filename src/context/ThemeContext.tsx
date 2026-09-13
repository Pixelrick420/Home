import { useLayoutEffect, useState, type ReactNode } from "react";
import { ThemeContext, DEFAULT_MODE, type Mode } from "./useTheme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") return saved;
    return DEFAULT_MODE;
  });

  useLayoutEffect(() => {
    localStorage.setItem("portfolio-theme", mode);
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggle: () => setMode((m) => (m === "light" ? "dark" : "light")),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
