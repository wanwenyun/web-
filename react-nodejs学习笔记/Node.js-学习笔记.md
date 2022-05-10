# 参考资料：
1. [一杯茶的时间，上手Node.js](https://zhuanlan.zhihu.com/p/97413574)

2. [Node.js学习指南](https://blog.poetries.top/node-learning-notes/notes/base/01-%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA.html#%E8%AE%A4%E8%AF%86-node-js)

3. [Node.js官网文档](http://nodejs.cn/learn/introduction-to-nodejs)
---
# 起步
## 什么是Node？
Node（或者说 Node.js，两者是等价的）是 JavaScript 的一种运行环境。

我们知道 JavaScript 都是在浏览器中执行的，用于给网页添加各种动态效果，那么可以说浏览器也是 JavaScript 的运行环境。两个运行环境差异如下图所示：
![img](./picture/Node-学习笔记.assets/Node-and-JS-run-env.png)
两个运行环境共同包含了 ECMAScript，也就是剥离了所有运行环境的 JavaScript 语言标准本身。

浏览器端 JavaScript 还包括了：BOM(window对象)、DOM(document对象)

Node.js 则是包括V8引擎(Chrome 浏览器中的JS引擎)。而 Node.js 则进一步将 V8 引擎加工成可以在任何操作系统中运行 JavaScript 的平台。

## 运行 Node 代码
运行 Node 代码通常有两种方式：
1. 在 REPL 中交互式输入和运行；
![img](./picture/Node-学习笔记.assets/REPL.png)
2. 将代码写入 JS 文件，并用 Node 执行。
创建test.js文件，里面代码内容为：`console.log('Hello World!');`
然后用 Node 解释器执行这个文件：
    ```
    $ node test.js
    Hello World!
    ```
    来对比一下，在浏览器和 Node 环境中执行这行代码有什么区别：
    - 在浏览器运行 console.log 调用了 BOM，实际上执行的是 `window.console.log('Hello World!')`
    - Node 首先在所处的操作系统中创建一个新的进程，然后向标准输出打印了指定的字符串， 实际上执行的是 `process.stdout.write('Hello World!\n')`

## Node全局对象
JavaScript在各个运行环境下的全局对象的比较：
![img](./picture/Node-学习笔记.assets/js-global-object.jpeg)
可以分为四类：
1. 浏览器专属，例如 `window、alert` 等等；
2. Node 专属，例如 `process、Buffer、__dirname、__filename` 等等；
3. 浏览器和 Node 共有，但是实现方式不同，例如 `console（第一节中已提到）、setTimeout、setInterval` 等；
4. 浏览器和 Node 共有，并且属于 ECMAScript 语言定义的一部分，例如 `Date、String、Promise` 等；

重点关注Node专属全局对象：

**procss**

process 全局对象可以说是 Node.js 的灵魂，它是管理当前 Node.js 进程状态的对象，提供了与操作系统的简单接口。可在Node REPL中查看process对象。它有以下属性：
- pid：进程编号
- env：系统环境变量
- argv：命令行执行此脚本时的输入参数
- platform：当前操作系统的平台、等

**Buffer**

Buffer 全局对象让 JavaScript 也能够轻松地处理二进制数据流，结合 Node 的流接口（Stream），能够实现高效的二进制文件处理。

**__filename 和 __dirname**

分别代表当前所运行 Node 脚本的文件路径和所在目录路径。

ps: __filename 和 __dirname 只能在 Node 脚本文件中使用，在 REPL 中是没有定义的。

**使用node全局对象**
```js
// test.js
setTimeout(() => {
  console.log('Hello World!');
}, 3000);

console.log('当前进程 ID', process.pid);
console.log('当前脚本路径', __filename);

const time = new Date();
console.log('当前时间', time.toLocaleString());
```
执行输出如下：（Hello World! 会延迟三秒输出）
```js
$ node timer.js
当前进程 ID 1961
当前脚本路径 /Users/wanwan/Desktop/test.js
当前时间 2022/5/7 下午5:56:15
Hello World!
```

在 setTimeout 等待的 3 秒内，程序并没有阻塞，而是继续向下执行，这就是 Node.js 的`异步非阻塞`!

## Node模块机制
在ES2015之前，js语言本身没有模块化的机制，构建复杂应用也没有统一的接口标准。人们通常使用一系列的`<script>` 标签来导入相应的模块（依赖），如下：
```js
<head>
  <script src="fileA.js"></script>
  <script src="fileB.js"></script>
</head>
```
这种方式会带来很多问题：
1. 导入的多个 JS 文件直接作用于全局命名空间，很容易产生命名冲突
2. 导入的 JS 文件之间不能相互访问
3. 导入的 script 无法被轻易去除或修改

因此，有两大模块化规范被提出:
1. AMD（Asynchronous Module Definition）规范
2. `CommonJS规范`，Node.js 所实现的正是这一模块标准。

### Node 模块机制浅析
Node 模块可分为两大类：
- 核心模块：Node 提供的内置模块，在安装 Node 时已经被编译成二进制可执行文件
- 文件模块：用户编写的模块，可以是自己写的，也可以是通过 npm 安装的。

Node为了实现模块机制，引入了三个新的全局对象（Node专属）: `require、exports、modules`。

**require**
require 用于导入其他 Node 模块，其参数接受一个字符串代表模块的名称或路径，通常被称为模块标识符。具体有以下三种形式。
```js
// 直接写模块名称,导入内置库或第三方模块，node会通过module.paths找到目标模块
const os = require('os');
const express = require('express');

// 通过相对路径导入其他模块
const utils = require('./utils');

// 通过绝对路径导入其他模块
const utils = require('/home/xxx/MyProject/utils');
```

**exports**：可用exports导出模块内容供给外部使用

**module**
module对象有以下字段:
![img](./picture/Node-学习笔记.assets/node-module.jpeg)
* `id`：模块的唯一标识符，如果是被运行的主程序则为 `.`，如果是被导入的模块（则等同于此文件名（即下面的 filename 字段）
* `path`和`filename`：模块所在路径和文件名
* `exports`：模块所导出的内容，实际上之前的 exports 对象是指向 module.exports 的引用。
* `parent`和`children`：用于记录模块之间的导入关系
* `loaded`：模块是否被加载。只有 children 中列出的模块才会被加载。
* `paths`：这个就是 Node 搜索文件模块的路径列表，Node 会从第一个路径到最后一个路径依次搜索指定的 Node 模块，找到了则导入，找不到就会报错。
> 仔细观察会发现 Node 文件模块查找路径（module.paths）的方式其实是这样的：先找当前目录下的 node_modules，没有的话再找上一级目录的 node_modules，还没找到的话就一直向上找，直到根目录下的 node_modules。

ps：[exports、module.exports和export、export default的区别](https://segmentfault.com/a/1190000010426778)

**命令行开发：接受输入参数, 通过 process.argv 读取命令行参数**
有以下4个文件
```js
// info.js
const os = require('os');

function printProgramInfo() {
  console.log('当前用户', os.userInfo().username);
  console.log('当前进程 ID', process.pid);
  console.log('当前脚本路径', __filename);
}

module.exports = printProgramInfo;
```
```js
function getCurrentTime() {
  const time = new Date();
  return time.toLocaleString();
}

exports.getCurrentTime = getCurrentTime;
```
```js
const printProgramInfo = require('./info');
const datetime = require('./datetime');

// 读取命令行参数
const waitTime = Number(process.argv[3]);
const message = process.argv[5];

setTimeout(() => {
  console.log(message);
}, waitTime*1000);

printProgramInfo();
console.log('当前时间', datetime.getCurrentTime());
```
```js
console.log(process.argv);
```
在REPL中分别执行这两行命令：
1. `node args.js --time 5 --message "hi wanwan"`
![img](./picture/Node-学习笔记.assets/args.png)
2. `node timer.js --time 5 --message "hi wanwan"`，输出如下：
    ```
    当前用户 wanwan
    当前进程 ID 46631
    当前脚本路径 /Users/wanwan/Desktop/ node-test/info.js
    当前时间 2022/5/9 下午7:42:28
    hi wanwan
    ```
### npm
在前面timer.js 所在的文件夹运行`npm init`，会生成**package.json 文件**， 安装两个包，`npm install commander ora`
```
{
  "name": "test",
  "version": "1.0.0",
  "description": "a cool time",
  "main": "timer.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "wanwan",
  "license": "ISC",
  "dependencies": {
    "commander": "^9.2.0",
    "ora": "^6.1.0"
  }
}
```
**npm scripts，也就是 npm 脚本**
在 package.json 中有个字段叫 scripts，这个字段就定义了全部的 npm scripts。npm scripts分两大类：
1. 预定义脚本： test、start、install、publish 等等，直接通过 `npm scriptName` 运行，例如 npm test，所有预定义的脚本可查看[文档](https://docs.npmjs.com/cli/v8/using-npm/scripts)
2. 自定义脚本：需通过`npm run <scriptName>`运行

## 监听exit事件
回调函数和事件机制共同组成了 Node 的异步世界。
Node 中的事件都是通过 `events` 核心模块中的 `EventEmitter` 这个类实现的。该类包括两个最关键的方法：

* on：用来监听事件的发生
* emit：用来触发新的事件
```js
const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

// 监听 connect 事件，注册回调函数
emitter.on('connect', function (username) {
  console.log(username + '已连接');
});

// 触发 connect 事件，并且加上一个参数（即上面的 username）
emitter.emit('connect', 'wanwan');
```