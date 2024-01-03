import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        strictPort: true,
        host: true,
        port: Number(process.env.CLIENT_PORT) || 3000,

    },
    define: {
        'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
    },
});