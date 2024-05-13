import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist",
        emptyOutDir: false,
        rollupOptions: {
            input: {
                index: new URL("./index.html", import.meta.url).pathname,
                background: new URL("./src/service-worker/background.html", import.meta.url).pathname,
            },
        },
    },
});
