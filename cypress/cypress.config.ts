import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001", // Your React app runs here
    supportFile: "cypress/support/e2e.ts", // Keeps global setup files
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    supportFile: "cypress/support/component.ts", // Keeps global setup files
  },
});
