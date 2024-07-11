import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { UserConfig } from "vitest/config";

// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [react()],
  server: {
    host: true,
    hmr: {
      path: "/hmr",
      port: 7000,
    },
    watch: {
      usePolling: true,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
};

export default defineConfig(config)
