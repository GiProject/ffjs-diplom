import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  server: {
    watch: {
      usePolling: true,
    },
    strictPort: true,
    host: true,
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
  },
});
