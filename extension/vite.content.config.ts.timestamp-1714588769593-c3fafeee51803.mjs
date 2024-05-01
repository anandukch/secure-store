// vite.content.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///run/media/anandukch/DATA/Anandu/arena/projects/secure-store/extension/node_modules/vite/dist/node/index.js";
import react from "file:///run/media/anandukch/DATA/Anandu/arena/projects/secure-store/extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "/run/media/anandukch/DATA/Anandu/arena/projects/secure-store/extension";
var vite_content_config_default = defineConfig({
  plugins: [react()],
  define: {
    "process.env": {}
  },
  build: {
    emptyOutDir: true,
    outDir: resolve(__vite_injected_original_dirname, "dist"),
    lib: {
      formats: ["iife"],
      entry: resolve(__vite_injected_original_dirname, "./content-script/index.tsx"),
      name: "Cat Facts"
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.global.js",
        extend: true
      }
    }
  }
});
export {
  vite_content_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb250ZW50LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ydW4vbWVkaWEvYW5hbmR1a2NoL0RBVEEvQW5hbmR1L2FyZW5hL3Byb2plY3RzL3NlY3VyZS1zdG9yZS9leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ydW4vbWVkaWEvYW5hbmR1a2NoL0RBVEEvQW5hbmR1L2FyZW5hL3Byb2plY3RzL3NlY3VyZS1zdG9yZS9leHRlbnNpb24vdml0ZS5jb250ZW50LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcnVuL21lZGlhL2FuYW5kdWtjaC9EQVRBL0FuYW5kdS9hcmVuYS9wcm9qZWN0cy9zZWN1cmUtc3RvcmUvZXh0ZW5zaW9uL3ZpdGUuY29udGVudC5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIGRlZmluZToge1xuICAgICdwcm9jZXNzLmVudic6IHt9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgb3V0RGlyOiByZXNvbHZlKF9fZGlybmFtZSwgJ2Rpc3QnKSxcbiAgICBsaWI6IHtcbiAgICAgIGZvcm1hdHM6IFsnaWlmZSddLFxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9jb250ZW50LXNjcmlwdC9pbmRleC50c3gnKSxcbiAgICAgIG5hbWU6ICdDYXQgRmFjdHMnXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdpbmRleC5nbG9iYWwuanMnLFxuICAgICAgICBleHRlbmQ6IHRydWUsXG4gICAgICB9XG4gICAgfVxuICB9XG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1osU0FBUyxlQUFlO0FBQzVhLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUZsQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLDhCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sZUFBZSxDQUFDO0FBQUEsRUFDbEI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGFBQWE7QUFBQSxJQUNiLFFBQVEsUUFBUSxrQ0FBVyxNQUFNO0FBQUEsSUFDakMsS0FBSztBQUFBLE1BQ0gsU0FBUyxDQUFDLE1BQU07QUFBQSxNQUNoQixPQUFPLFFBQVEsa0NBQVcsNEJBQTRCO0FBQUEsTUFDdEQsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLFFBQ2hCLFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
