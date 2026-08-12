import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import playfairDisplayLatin700 from "@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff2?url";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { lightTokens } from "./theme";
import { pagePadding, selectionText, transitions } from "./constants";

const style = document.createElement("style");

const fontPreload = document.createElement("link");
fontPreload.rel = "preload";
fontPreload.as = "font";
fontPreload.type = "font/woff2";
fontPreload.href = playfairDisplayLatin700;
fontPreload.crossOrigin = "anonymous";
document.head.appendChild(fontPreload);

const cssVars = Object.entries(lightTokens)
  .map(([key, value]) => `    --${key}: ${value};`)
  .join("\n");

style.textContent = `
  :root {
${cssVars}
    --scrollbar: ${lightTokens.borderHover};
    --selection-text: ${selectionText.light};
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overscroll-behavior-y: none;
  }

  body {
    overflow-x: hidden;
    overscroll-behavior-y: none;
    background: var(--bg);
    color: var(--text);
  }

  ::selection {
    background-color: var(--accent);
    color: var(--selection-text);
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent);
  }

  section {
    padding-left: ${pagePadding.desktop} !important;
    padding-right: ${pagePadding.desktop} !important;
  }

  @media (max-width: 1024px) {
    section {
      padding-left: ${pagePadding.laptop} !important;
      padding-right: ${pagePadding.laptop} !important;
    }
  }

  @media (max-width: 768px) {
    section {
      padding-left: ${pagePadding.tablet} !important;
      padding-right: ${pagePadding.tablet} !important;
    }
  }

  @media (max-width: 480px) {
    section {
      padding-left: ${pagePadding.mobile} !important;
      padding-right: ${pagePadding.mobile} !important;
    }
  }

  .section-block {
    padding-top: 120px !important;
    padding-bottom: 120px !important;
  }

  @media (max-width: 1024px) {
    .section-block {
      padding-top: 100px !important;
      padding-bottom: 100px !important;
    }
  }

  @media (max-width: 768px) {
    .section-block {
      padding-top: 80px !important;
      padding-bottom: 80px !important;
    }
  }

  @media (max-width: 480px) {
    .section-block {
      padding-top: 60px !important;
      padding-bottom: 60px !important;
    }
  }

  .section-header {
    margin-bottom: 64px;
  }

  .section-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 16px;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 700;
    color: var(--text);
    margin: 0;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  @media (max-width: 480px) {
    .section-title {
      font-size: clamp(24px, 8vw, 34px);
    }
  }

  .card-hover {
    transition: ${transitions.card};
    cursor: pointer;
  }

  .card-hover:hover {
    border-color: var(--accent);
    box-shadow: 0 8px 40px color-mix(in srgb, var(--accent) 30%, transparent);
  }

  .nav-blur {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  @media (max-width: 768px) {
    .nav-blur {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
