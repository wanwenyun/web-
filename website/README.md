# 弯弯个人小站

本站点使用 VitePress 进行开发，
开发参考手册: <https://process1024.github.io/vitepress/guide/what-is-vitepress>

## 本地开发

### 安装依赖包

`yarn`

### 本地开发

`yarn run docs:dev`

### 打包

`yarn run docs:build`

### 部署 Github 线上域名

将 docs/dist 下所有的文件复制到<https://github.com/wanwenyun/wanwenyun.github.io>的`main`分支，将其提交远端仓库，即可自动部署.

### 访问线上

<https://wanwenyun.github.io/>

### 脚本

_utils/js2md.mjs_

执行`node js2md.mjs`，用于将之前的笔记中的.js 转成.md 文件，并且移动对应目录的文件至该项目中

_utils/genConfig.mjs_

执行`node genConfig.mjs`，用于生成`.vitepress/config.js`中的 sibebar，即网站的侧边栏，将 console.log 的输出复制到谷歌浏览器的 FeHelper 插件中格式化 JSON 数据，然后复制到`.vitepress/config.js`的 sidebar 字段下.
