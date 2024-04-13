import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    svgr({
      // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
      include: "**/*.svg",
    }),
  ],
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
