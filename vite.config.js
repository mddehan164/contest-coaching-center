import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "./stats.html", // কোন ফাইলে রিপোর্ট বানাবে
      open: true, // build শেষে auto browser খুলে দিবে
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@custom": path.resolve(__dirname, "src/custom"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
});
