import path from "path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: path.resolve(__dirname, "./src/app/routes"),
      quoteStyle: "double",
      semicolons: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    coverage: {
      reporter: ["json-summary", "json"],
    },
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
