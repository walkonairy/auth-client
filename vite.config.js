import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/auth",
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  server: {
    host: "0.0.0.0",
    port: 5174,
  },
  build: {
    rollupOptions: {
      manualChunks:(id)=> {
        if(id.includes("node_modules")){
          return "vendor";
        }
      }
    }
  }
});
