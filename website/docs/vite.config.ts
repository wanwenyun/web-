/*
 * @Author: ouyangzhichao@kuaishou.com
 * @Date: 2023-02-11 18:20:23
 * @LastEditors: ouyangzhichao ouyangzhichao@kuaishou.com
 * @LastEditTime: 2023-02-11 18:28:08
 * @FilePath: /website/docs/vite.config.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
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
