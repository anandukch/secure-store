import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), wasm()],
    build: {
        outDir: "dist",
        emptyOutDir: false,
        rollupOptions: {
            input: {
                index: new URL("./index.html", import.meta.url).pathname,
                background: new URL("./src/service-worker/background.html", import.meta.url).pathname,
            },
            output: {
                assetFileNames: "assets/[name].[hash][extname]",
            },
            external: ["libsodium-wrappers-sumo"],
        },
    },
    resolve: {
        alias: {
            crypto: "crypto-browserify",
        },
    },
});
