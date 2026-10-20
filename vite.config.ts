import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function preloadFonts(): Plugin {
  return {
    name: "preload-fonts",
    apply: "build",
    writeBundle(options, bundle) {
      const fonts = Object.keys(bundle)
        .filter((fileName) => /-latin-\d00-normal-[^/]+\.woff2$/.test(fileName))
        .sort();
      if (fonts.length === 0) return;

      const htmlPath = resolve(options.dir ?? "dist", "index.html");
      const html = readFileSync(htmlPath, "utf8");
      const updated = html.replace(
        /(\n[ \t]*)<\/head>/,
        (_match, indent: string) =>
          `${indent}${fonts
            .map(
              (fileName) =>
                `  <link rel="preload" href="/${fileName}" as="font" type="font/woff2" crossorigin>`,
            )
            .join(indent)}${indent}</head>`,
      );
      if (updated !== html) writeFileSync(htmlPath, updated);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-helmet-async")
            ) {
              return "react-vendor";
            }
            if (id.includes("framer-motion")) {
              return "motion-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
