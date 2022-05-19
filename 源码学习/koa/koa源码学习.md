# 简介

Koa是一个非常优秀的web框架。它使用了Node.js实现了一个十分具有表现力的 HTTP `中间件机制`，可以让开发者更加愉快的编写服务端应用程序。

[官网地址](https://koajs.com/)
[github](https://github.com/koajs/koa)

# 使用
官网给出的一个简单的例子：
```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```
koa源码的代码量是非常少的，核心代码只有4个文件。
- application.js
- context.js
- request.js
- response.js

那就从上面简单的例子，带着以下几个问题，去学习koa的源码吧。
1. Koa是如何启动的？
2. Koa如何封装req和res的？
3. Koa的中间件原理和洋葱模型？

# 源码学习
先来看看上面的例子做了上面事情。
先引入koa，再new了一个koa的实例对象 app，再分别调用实例上的`use`和`listen`方法。

下面开始正式学习源码。
看项目先从`package.json`开始，在这个文件中你可以知道该项目的依赖包，启动命令，以及`入口文件`等

```
{
  "main": "lib/application.js",
  ...
}

```
很明显，入口文件是`application.js`，所以例子中require进来的内容，就是在该文件中定义的class `Application`。它有以下属性：
```
proxy：是否信任proxy header参数，默认为false
subdomainOffset
proxyIpHeader：代理 IP 头，默认为 X-Forwarded-For
maxIpsCount：从代理 IP 标头读取的最大 IP，默认为 0（表示无穷大）
env：环境参数，默认为NODE_ENV或'development'
middleware：保存通过app.use(middleware)注册的中间件
context：context模块，通过context.js创建
request：request模块，通过request.js创建
response：response模块，通过response.js创建
```
实例化后的对象中有以下几个函数：
```
listen
toJSON
inspect
use
callback
handleRequest
createContext
onerror
```
实际上我们会用到可能是`listen`、`use`、`onerror`，其他函数很多都是内部自己调用。

## listen
```js
listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
}
```
listen的实现很简单，实际上就是创建一个http服务，并且监听你传入的端口，这里的this.callback是重点！我们之后去看。

## use
在Koa中，一切都是中间件。use这个api就是我们经常会用到的设置中间件的api，内部的代码实现也是很简单的。
```js
use (fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
    debug('use %s', fn._name || fn.name || '-')
    this.middleware.push(fn)
    return this
}
```
之前说到koa的class中有一个middleware变量，其实就是一个数组，在我们使用app.use的时候，实际上就是将函数push进middleware数组中，等待之后的调用。

koa挂载中间件
```js
app.use(async (ctx, next) => {
  // do some thing
});
```

## callback
该函数是前面调用listen函数时，内部createServer时传入的回调函数。
```js
callback () {
    const fn = compose(this.middleware)

    if (!this.listenerCount('error')) this.on('error', this.onerror)

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }

    return handleRequest
}
```
在这个callback中有一个非常重要的函数，compose函数，这个函数是来自`koa-compose`的，koa-compose就是实现中间件洋葱模型的调用方式的关键所在。

其次，因为Koa的class是继承了Emitter的，所以在这里可以直接调用listenerCount来监听error事件，当发生了error的情况下，那么将会调用onerror函数来输出错误。

handleRequest函数就是将createServer返回的req和res放入createContext中创建出`ctx上下文对象`，并传入this.handleRequest中并返回this.handleRequest函数给createContext作为监听回调函数。

接下来重点关注以下几个函数进行详细阅读：
1. koa-compose
2. createContext
3. handleRequest

## koa-compose
[koa-compose](https://github.com/koajs/compose/blob/master/index.js)主要的作用就是将我们use进去的中间件数组转化为洋葱模式的执行方式的一个库。核心源码就是一个函数。
```js
/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  // 是否为数组
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    // 循环判断数组中的item是否为函数
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0) // 返回第一个被use的中间件函数
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i] // 获取当前传入下标对应的中间件函数
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        // 洋葱模型的触发方式，先执行当前的中间，并将下一个中间作为第二个参数（next）传入当前中间件中
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```
执行效果如图：
![img](./pictures/koa-middleware.png)
因为每一个中间件都是一个async函数，所以我们调用await next()实际上是调用下一个中间件代码，当下一个中间代码执行完后，就回到上一个中间的next之后的代码继续执行，如此类推，从而实现出一个洋葱模型的中间件执行模式。

## createContext
createContext函数是用来生成全局context对象的。实际上是对createServer中返回的req和res进行封装。
```js
createContext (req, res) {
    const context = Object.create(this.context) // this.context来自context.js文件
    const request = context.request = Object.create(this.request) // this.request来自request.js
    const response = context.response = Object.create(this.response) // this.response来自response.js
    context.app = request.app = response.app = this
    context.req = request.req = response.req = req // http模块原生对象
    context.res = request.res = response.res = res // http模块原生对象
    request.ctx = response.ctx = context
    request.response = response
    response.request = request
    context.originalUrl = request.originalUrl = req.url
    context.state = {}
    return context
}
```
context.js文件中使用了[delegates](https://github.com/tj/node-delegates)这个库，主要是将context中的一些值和函数代理到request和response中，这样实际上我们调用ctx.hostname获取值的时候，实际上是调用了req.hostname。从而方便调用。

## request.js和response.js
request就不一一说明里面的内容，因为request里面基本上就只做2件事情，将request对象上的一些值代理到req上面，另外就是提供了一些额外的值和函数，基本上都是基于req上面的信息进行封装的。response也一样。

## handleRequest
handleRequest就是提供给createServer的回调函数，接受组装好的ctx和中间件调用函数作为参数。
```js
handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
```
一开始就将res的statusCode定义为404。如果在我们没有设置body的情况下，默认就会返回404。当所有中间执行完毕，就会执行context中的`respond`函数(对返回做统一处理)。

## 总结
到这里基本上就是koa的源码阅读。koa源码中总体来说做了几件事情：

1. 创建服务，监听端口
2. 基于req，res封装出ctx
3. 构建洋葱模型的中间件执行机制
4. 对返回做统一处理
5. 对ctx和全局的error做监听

---
[参考文章](https://zhuanlan.zhihu.com/p/90677000)






TODO: 有没有可能自己实现一个洋葱圈模型