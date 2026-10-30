import { useLayoutEffect, useState, type ReactNode } from "react";
import { ThemeContext, DEFAULT_MODE, type Mode } from "./useTheme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof localStorage === "undefined") return DEFAULT_MODE;
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") return saved;
    return DEFAULT_MODE;
  });

  useLayoutEffect(() => {
    localStorage.setItem("portfolio-theme", mode);
    document.documentElement.dataset.theme = mode;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute(
        "content",
        mode === "light" ? "#ffffff" : "#000000",
      );
    }
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
