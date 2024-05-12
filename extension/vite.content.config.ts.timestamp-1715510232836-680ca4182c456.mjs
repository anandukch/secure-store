// vite.content.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///run/media/anandukch/DATA/Anandu/arena/projects/secure-store/extension/node_modules/vite/dist/node/index.js";
import react from "file:///run/media/anandukch/DATA/Anandu/arena/projects/secure-store/extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "/run/media/anandukch/DATA/Anandu/arena/projects/secure-store/extension";
var vite_content_config_default = defineConfig({
    plugins: [react()],
    define: {
        "process.env": {},
    },
    build: {
        emptyOutDir: true,
        outDir: resolve(__vite_injected_original_dirname, "dist"),
        lib: {
            formats: ["iife"],
            entry: resolve(__vite_injected_original_dirname, "./src/content-script/index.tsx"),
            name: "COntnet Page",
        },
        rollupOptions: {
            output: {
                entryFileNames: "index.global.js",
                extend: true,
            },
        },
    },
});
export { vite_content_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb250ZW50LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ydW4vbWVkaWEvYW5hbmR1a2NoL0RBVEEvQW5hbmR1L2FyZW5hL3Byb2plY3RzL3NlY3VyZS1zdG9yZS9leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ydW4vbWVkaWEvYW5hbmR1a2NoL0RBVEEvQW5hbmR1L2FyZW5hL3Byb2plY3RzL3NlY3VyZS1zdG9yZS9leHRlbnNpb24vdml0ZS5jb250ZW50LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcnVuL21lZGlhL2FuYW5kdWtjaC9EQVRBL0FuYW5kdS9hcmVuYS9wcm9qZWN0cy9zZWN1cmUtc3RvcmUvZXh0ZW5zaW9uL3ZpdGUuY29udGVudC5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgICBkZWZpbmU6IHtcbiAgICAgICAgXCJwcm9jZXNzLmVudlwiOiB7fSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgICAgICBvdXREaXI6IHJlc29sdmUoX19kaXJuYW1lLCBcImRpc3RcIiksXG4gICAgICAgIGxpYjoge1xuICAgICAgICAgICAgZm9ybWF0czogW1wiaWlmZVwiXSxcbiAgICAgICAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb250ZW50LXNjcmlwdC9pbmRleC50c3hcIiksXG4gICAgICAgICAgICBuYW1lOiBcIkNPbnRuZXQgUGFnZVwiLFxuICAgICAgICB9LFxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJpbmRleC5nbG9iYWwuanNcIixcbiAgICAgICAgICAgICAgICBleHRlbmQ6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1osU0FBUyxlQUFlO0FBQzVhLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUZsQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLDhCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ0osZUFBZSxDQUFDO0FBQUEsRUFDcEI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILGFBQWE7QUFBQSxJQUNiLFFBQVEsUUFBUSxrQ0FBVyxNQUFNO0FBQUEsSUFDakMsS0FBSztBQUFBLE1BQ0QsU0FBUyxDQUFDLE1BQU07QUFBQSxNQUNoQixPQUFPLFFBQVEsa0NBQVcsZ0NBQWdDO0FBQUEsTUFDMUQsTUFBTTtBQUFBLElBQ1Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNYLFFBQVE7QUFBQSxRQUNKLGdCQUFnQjtBQUFBLFFBQ2hCLFFBQVE7QUFBQSxNQUNaO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
