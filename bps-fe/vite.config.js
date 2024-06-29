import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   "/erp": {
    //     target: "https://apidev.sucofindo.co.id/web/erp",
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/erp/, ""),
    //   },
    // },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  plugins: [react()],
});
