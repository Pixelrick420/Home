import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

const style = document.createElement("style");

style.textContent = `
  :root {
    --bg: #FFFFFF;
    --bgAlt: #FAFAFA;
    --bgCard: #FFFFFF;

    --text: #1A1A1A;
    --textSub: #222222;
    --textMuted: #555555;
    --textFaint: #999999;

    --accent: #FF69B4;
    --accentHover: #E30B5C;

    --border: #E5E5E5;
    --borderHover: #CCCCCC;

    --white: #FFFFFF;

    --scrollbar: #CCCCCC;
    --selection-text: #FFFFFF;
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
  }

  body {
    overflow-x: hidden;
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
    padding-left: 80px !important;
    padding-right: 80px !important;
  }

  @media (max-width: 1024px) {
    section {
      padding-left: 48px !important;
      padding-right: 48px !important;
    }
  }

  @media (max-width: 768px) {
    section {
      padding-left: 32px !important;
      padding-right: 32px !important;
    }
  }

  @media (max-width: 480px) {
    section {
      padding-left: 20px !important;
      padding-right: 20px !important;
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

  .card-hover {
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .card-hover:hover {
    border-color: var(--accent);
    box-shadow: 0 8px 40px color-mix(in srgb, var(--accent) 30%, transparent);
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
