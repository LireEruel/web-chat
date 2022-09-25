import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/web-chat/",
  build: {
    chunkSizeWarningLimit: 1600,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tagName) => tagName === "vue-advanced-chat",
        },
      },
    }),
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
