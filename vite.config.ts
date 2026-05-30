import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Active explicitement le moteur Nitro sous-jacent pour Vercel
  nitro: {
    preset: "vercel",
  },
});