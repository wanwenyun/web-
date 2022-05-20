# Webpack入门
## Webpack是什么？
Webpack是一个模块打包工具(module bundler)，因为平常多用来对前端工程打包，所以也是一个前端构建工具。
通俗的说是：`找出模块之间的依赖关系，按照一定的规则把这些模块组织合并为一个JavaScript文件`。

## 快速入门
现在我有三个文件，a.js，b.js和index.html

a.js内容：
```js
// ES6的模块化语法
import { name } from './b.js';  
console.log(name);
``` 

b.js内容：
```js
 // ES6的模块化语法
 export var name = 'Jack';
```

在HTML文件中引入a.js文件

这时用浏览器打开index.html，会报错:

`Uncaught SyntaxError: Cannot use import statement outside a module`

一方面是浏览器对原始的ES6模块默认引入方式不支持而报错，另一方面即使使用支持的方式引入也会因本地JS引入的安全问题而报错。

所以，我们可以通过Webpack把这两个文件打包成一个JS文件来解决这个问题。Webpack打包后，代码里就没有这种模块化语法了。执行以下命令：

`npx webpack a.js -o bundle.js`

上面命令的作用：从a.js文件开始，按照模块引入的顺序把所有代码打包到bundle.js文件里。注意，webpack是打包命令，后面的是打包参数。

可以看到，文件夹中多了bundle.js这个文件。这时index.html文件再去引入bundle.js就不会报错了。

<img src="./picture/webpack/files.png" width = "30%" />

这就是最简单的一个打包过程了。

## webpack配置文件
Webpack默认的配置文件是项目根目录下的webpack.config.js，在执行`npx webpack`命令的时候，Webpack会自动寻找该文件并使用其配置信息进行打包。

基于上面的代码，新增一个配置文件，内容如下：
```js
var path = require('path');  
module.exports = {
  entry: './a.js', // 打包入口
  output: {
    path: path.resolve(__dirname, ''), // webpack基于Node.js执行，path是Node中的路径解析模块。__dirname是node的一个全局变量，path.resolve(__dirname, '')表示当前文件夹根目录的绝对路径
    filename: 'bundle.js' // 打包产物
  },
  mode: 'none' // webpack打包模式，默认是'production'
};
```
这样就是使用配置文件打包的方式。

## Webpack loader
Webpack自身只支持对JS文件处理（现在的版本也支持对JSON文件处理），如果引入了一个非js文件，那么Webpack在处理该模块的时候，会在控制台报错：`Module parse failed…You may need an appropriate loader to handle this file type.`

当Webpack自身无法处理某种类型的文件的时候，我们就可以通过配置特定的`loader`，赋予Webpack来处理该类型文件的能力。

还是延续上面的文件夹，在里面再加一个c.css文件，内容如下:
```css
.hello {
    margin: 30px;
    color: blue;
}
```
然后在a.js中引入了c.css;

在html文件中加入一个div标签：
```html
<div class="hello">Hello, Loader</div>
```

配置文件暂时保持不变，看一下执行打包命令，是什么结果？—— 果然报错了

`You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.`

提示我们需要安装相应的loader来处理CSS文件。

这里需要安装两个loader
1. css-loader：解析CSS文件，包括解析@import等CSS自身的语法。
2. style-loader：把JS里的样式代码插入到html文件里。原理：JS动态生成style标签插入到html文件的head标签里。

执行`npm install css-loader@3.6.0 style-loader@1.2.1 `安装该两个loader

在webpack.config.js文件中配置这两个loader
```js
var path = require('path');  
module.exports = {
  entry: './a.js', // 打包入口
  output: {
      ... // 此处内容与前面一致
  },
  module: {
    rules: [{
      test: /\.css$/, // 表示当文件后缀是.css时，使用对应use里的loader
      use: ['style-loader', 'css-loader'] // use里面的值是数组，每一项是一个loader。loader的执行顺序是从后向前执行。
    }]
  },
  mode: 'none' // webpack打包模式，默认是'production'
};
```

这样再执行打包命令，便成功了。在浏览器打开index.html，发现CSS生效了，文字颜色变成蓝色。

# Webpack 入口与出口

## 模块化相关的知识：
- Webpack支持ES6 Module、CommonJS和AMD等模块化方法，目前常用的是ES6 Module和CommonJS。
- ES6 Module通过export导出模块，import … from '…'或import '…'导入模块。
- CommonJS通过module.exports导出模块，require('…')导入模块。
- ES6 Module通过import()函数动态导入模块，CommonJS通过require.ensure动态导入模块，现在推荐使用import()函数动态导入模块。

## 入口entry
