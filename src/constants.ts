import type { CSSProperties } from "react";

export const alpha = {
  sectionOverlay: 0.85,
  cardOverlay: 0.92,
  backdrop: 0.6,
  shadow: 0.35,
  footer: 0.5,
  navNumber: 0.8,
} as const;

export const hexAlpha = {
  bg: "15",
  shadow: "20",
  border: "40",
} as const;

export const radius = {
  card: "12px",
  pill: "50px",
  pillSm: "40px",
  modal: "16px",
  tag: "6px",
  bar: "2px",
} as const;

export const fontSize = {
  xs: "11px",
  sm: "13px",
  md: "15px",
  lg: "18px",
  heading: "24px",
  heroBadge: "clamp(5px, 2.5vw, 12px)",
  heroTitle: "clamp(42px, 8vw, 140px)",
  heroLead: "clamp(18px, 2.5vw, 26px)",
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  lgPlus: "20px",
  xl: "24px",
  xlPlus: "28px",
  xxl: "32px",
  huge: "48px",
} as const;

export const pagePadding = {
  desktop: "80px",
  laptop: "48px",
  tablet: "32px",
  mobile: "20px",
} as const;

export const section = {
  base: "120px 80px",
  laptop: "100px 48px",
  tablet: "80px 32px",
  mobile: "60px 20px",
} as const;

export const contactSection = {
  base: "120px 80px 100px",
  laptop: "100px 48px 80px",
  tablet: "80px 32px 60px",
  mobile: "60px 20px 48px",
} as const;

export const zIndex = {
  waves: -1,
  sectionBg: 0,
  app: 1,
  content: 2,
  navMenu: 99,
  nav: 100,
  modal: 1000,
} as const;

export const width = {
  container: "1200px",
  hero: "1000px",
  heroText: "560px",
  modal: "640px",
} as const;

export const layout = {
  minHeight: "100vh",
} as const;

export const transitions = {
  bg: "background-color 0.4s ease",
  color: "color 0.2s",
  button: "background-color 0.2s, border-color 0.2s, color 0.2s",
  primary: "background-color 0.2s, box-shadow 0.2s",
  card: "border-color 0.3s, box-shadow 0.3s",
  all: "all 0.2s ease",
} as const;

export const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const duration = {
  fast: 0.3,
  medium: 0.5,
  slow: 0.8,
  loop: 1.5,
} as const;

export const offset = {
  y: 40,
  ySmall: 20,
  yLg: 60,
  x: 20,
} as const;

export const stagger = 0.1;

export const overlayPill = {
  bg: "#aaaaaa",
  text: "#1A1A1A",
} as const;

export const selectionText = {
  light: "#FFFFFF",
  dark: "#1A1A1A",
} as const;

export const sectionStyle: CSSProperties = {
  position: "relative",
  padding: section.base,
  transition: transitions.bg,
  overflow: "hidden",
};

export const sectionOverlay = (bg: string): CSSProperties => ({
  position: "absolute",
  inset: 0,
  backgroundColor: bg,
  opacity: alpha.sectionOverlay,
  zIndex: zIndex.sectionBg,
  transition: transitions.bg,
});

export const sectionInner: CSSProperties = {
  position: "relative",
  zIndex: zIndex.content,
  maxWidth: width.container,
  margin: "0 auto",
};
