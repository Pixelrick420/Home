import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
  },
});
