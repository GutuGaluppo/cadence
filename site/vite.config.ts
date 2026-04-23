import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = dirname(fileURLToPath(import.meta.url));
const siteBase = process.env.SITE_BASE ?? "/";

export default defineConfig({
  root: siteRoot,
  base: siteBase,
  plugins: [react()],
  build: {
    outDir: resolve(siteRoot, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(siteRoot, "index.html"),
        privacy: resolve(siteRoot, "privacy/index.html"),
        support: resolve(siteRoot, "support/index.html"),
        changelog: resolve(siteRoot, "changelog/index.html"),
      },
    },
  },
});
