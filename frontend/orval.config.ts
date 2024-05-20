import { defineConfig } from "orval";

export default defineConfig({
  backend: {
    input: {
      target: "http://localhost:8080/v3/api-docs",
    },
    output: {
      target: "index.ts",
      client: "axios-functions",
      workspace: "src/shared/api",
      mode: "split",
      mock: true,
      override: {
        mutator: {
          path: "./instance.ts",
          name: "customInstance",
        },
      },
    },
  },
});
