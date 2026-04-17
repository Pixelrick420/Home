import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Mode = "light" | "dark";

export interface ThemeTokens {
  bg: string;
  bgAlt: string;
  bgCard: string;
  text: string;
  textSub: string;
  textMuted: string;
  textFaint: string;
  accent: string;
  accentHover: string;
  border: string;
  borderHover: string;
  white: string;
}

interface ThemeCtx {
  mode: Mode;
  toggle: () => void;
  t: ThemeTokens;
}

export const lightTokens: ThemeTokens = {
  bg: "#FFFFFF",
  bgAlt: "#FAFAFA",
  bgCard: "#FFFFFF",
  text: "#1A1A1A",
  textSub: "#666666",
  textMuted: "#999999",
  textFaint: "#BBBBBB",
  accent: "#A3E635",
  accentHover: "#B8F05A",
  border: "#E5E5E5",
  borderHover: "#CCCCCC",
  white: "#FFFFFF",
};

export const darkTokens: ThemeTokens = {
  bg: "#0A0A0A",
  bgAlt: "#141414",
  bgCard: "#1A1A1A",
  text: "#F5F5F5",
  textSub: "#A0A0A0",
  textMuted: "#707070",
  textFaint: "#505050",
  accent: "#A3E635",
  accentHover: "#B8F05A",
  border: "#2A2A2A",
  borderHover: "#3A3A3A",
  white: "#FFFFFF",
};

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
