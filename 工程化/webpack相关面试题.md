- [webpack的作用是什么？](#webpack的作用是什么)
- [webpack核心概念](#webpack核心概念)
  - [Entry](#entry)
  - [Output](#output)
  - [Module](#module)
  - [Chunk](#chunk)
  - [Loader](#loader)
  - [Plugin](#plugin)
- [webpack打包流程？](#webpack打包流程)
- [sourceMap是什么？](#sourcemap是什么)


>https://juejin.cn/post/6943468761575849992#heading-5
>
>https://segmentfault.com/a/1190000041100811

# webpack的作用是什么？
* **模块打包：** 可以将**不同模块的文件打包整合**在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。
* **编译兼容：** 在前端的“上古时期”，手写一堆**浏览器兼容**代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过webpack的`Loader`机制，不仅仅可以帮助我们对代码做polyfill，还可以编译转换诸如`.less, .vue, .jsx`这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。
* **能力扩展：** 通过webpack的`Plugin`机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如**按需加载，代码压缩**等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

# webpack核心概念

## Entry
入口起点(entry point)指示 webpack 应该使用哪个模块,来作为构建其内部依赖图的开始。
进入入口起点后,webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
每个依赖项随即被处理,最后输出到称之为 `bundles` 的文件中。(个人将bunles理解为结果文件)

## Output
output 属性告诉 webpack 在哪里输出它所创建的 bundles， 以及如何命名这些文件,默认值为 ./dist。
也就是说，output定义了打包的`输出`。

## Module
模块,在 Webpack 里一切皆模块,一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

## Chunk
代码块,一个 Chunk 由多个模块组合而成，用于代码合并与分割。

## Loader
loader 让 webpack 能够去处理那些`非js`文件（webpack 自身只理解 JavaScript）。并可以对代码做polyfill，解决一些浏览器兼容问题。
>core-js 是js标准库的polyfill

## Plugin
loader 被用于转换某些类型的模块,而插件则可以用于执行范围更广的任务。比如：按需加载，代码压缩，文件管理、环境注入等

>loader是翻译官，plugin是干活滴

# webpack打包流程？
Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程 :
1. 读取webpack的`配置参数`；
2.启动webpack，创建`Compiler`对象并开始解析项目；
3.从`入口`文件（entry）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成`依赖关系树`；
4.对不同文件类型的依赖模块文件使用对应的`Loader`进行编译，最终转为Javascript文件；
5. 整个过程中webpack会通过发布订阅模式，向外抛出一些hooks，而webpack的插件即可通过监听这些关键的事件节点，执行`插件任务`进而达到干预输出结果的目的。
6. 根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 `Chunk`,再把每个 Chunk 转换成一个单独的文件加入到输出列表，再根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

>`Compiler` 对象: compiler 对象是 webpack 的编译器对象。compiler 对象会在启动 webpack 的时候被一次性的初始化，compiler 对象中包含了所有 webpack 可自定义操作的配置，例如 loader 的配置，plugin 的配置，entry 的配置等各种原始 webpack 配置等

# sourceMap是什么？