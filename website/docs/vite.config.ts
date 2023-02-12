//vite.config.ts
import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";

//default options
export default defineConfig({
  plugins: [
    SearchPlugin({
      placeholder: "输入搜索内容",
      buttonLabel: "搜索",
      previewLength: 10,
    }),
  ],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ["../.."],
    },
  },
});
