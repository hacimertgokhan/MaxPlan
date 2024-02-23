import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import copy from 'rollup-plugin-copy';

export default defineConfig(async () => ({
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  build: {
    target: "ES2022" // <--- bundan gercekten nefret ediyorum
  },
  plugins: [
    react(),
    copy({
      targets: [
        {
          src: 'node_modules/pspdfkit/dist/pspdfkit-lib',
          dest: 'public/',
        },
      ],
      hook: 'buildStart',
    }),
  ],
}));
