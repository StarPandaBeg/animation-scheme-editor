import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import editorServerPlugin from "./src/server";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), editorServerPlugin()],
  resolve: {
    alias: [
      {
        find: "@animation-scheme-editor/core",
        replacement: "@animation-scheme-editor/core/src",
      },
    ],
  },
});
