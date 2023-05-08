- [没有ajax的时候，页面渲染过程](#没有ajax的时候页面渲染过程)
- [CSR - 客户端渲染](#csr---客户端渲染)
- [SSR - 服务端渲染](#ssr---服务端渲染)
  - [SSR的实现方式](#ssr的实现方式)
  - [react 服务端渲染如何处理路由](#react-服务端渲染如何处理路由)
  - [Next.js](#nextjs)
  - [服务端渲染相关面试题](#服务端渲染相关面试题)
- [SSG - 静态页面生成](#ssg---静态页面生成)


> 参考文章
> 1. https://www.modb.pro/db/29765
> 2. https://github.com/yacan8/blog/issues/30

## 没有ajax的时候，页面渲染过程

在没有AJAX的时候，几乎所有应用都是服务端渲染（此时服务器渲染非现在的服务器渲染）。过程：浏览器请求页面URL，然后服务器接收到请求之后，到数据库查询数据，将数据丢到后端的组件模板（php、asp、jsp等）中，并渲染成HTML片段，接着服务器在组装这些HTML片段，组成一个完整的HTML，最后返回给浏览器，这个时候，浏览器已经拿到了一个完整的被服务器动态组装出来的HTML文本，然后将HTML渲染到页面中，过程没有任何JavaScript代码的参与。
<img src="./picture/FERender/pic1.png" width=70%/>

缺点：
* 每次更新页面的一小的模块，都需要重新请求一次页面，重新查一次数据库，重新组装一次HTML
* 前端JavaScript代码和后端（jsp、php、jsp）代码混杂在一起，使得日益复杂的WEB应用难以维护

## CSR - 客户端渲染

有了nodejs之后，项目可以做到前后端分离。

浏览器请求URL，**前端服务器**直接返回一个`空的静态HTML文件`，然后加载了很多`渲染页面需要的 js 脚本`和 CSS 样式表，浏览器拿到 HTML 文件后开始加载脚本和样式表，并且执行脚本，这个时候脚本请求后端服务提供的API，获取数据，获取完成后将数据通过js脚本动态的将数据`渲染`到页面中，完成页面显示。
<img src="./picture/FERender/CSR.png" width=70%/>

优点：

- 前后端分离，开发效率高。

缺点：

- 前端响应速度慢，特别是首屏，这样用户是受不了的。
- 不利于SEO优化，因为爬虫不认识SPA，所以它只是记录了一个页面。

重点：客户端渲染通常需要从服务器端获取数据和模板，然后在**浏览器端**进行数据绑定和渲染。

## SSR - 服务端渲染

浏览器请求URL，前端服务器接收到URL请求之后，根据不同的URL，前端服务器向后端服务器请求数据，请求完成后，`前端服务器会组装一个携带了具体数据的HTML文本`，并且返回给浏览器，浏览器得到HTML之后开始渲染页面，同时，浏览器加载并执行 js 脚本，给页面上的元素绑定事件，让页面变得可交互，当用户与浏览器页面进行交互，如跳转到下一个页面时，浏览器会执行 js 脚本，向后端服务器请求数据，获取完数据之后再次执行 js 代码动态渲染页面。

<img src="./picture/FERender/SSR.png" width=70%/>

优点：

- 尽量不占用前端的资源，前端这块耗时少，速度快。
- 有利于SEO优化，因为在后端有完整的html页面，所以爬虫更容易爬取信息。
- 更好的安全性：由于服务端渲染是在服务器端完成的，可以更好地保护敏感数据，不会暴露在客户端环境中。

缺点：

- 不利于前后端分离，开发的效率降低了。
- 对html的解析，对前端来说加快了速度，但是加大了服务器的压力。

`CSR和SSR本质的区别：是谁来完成了html的完整拼接，服务端渲染是在服务端生成DOM树，客户端渲染是由浏览器生成DOM树。`

### SSR的实现方式

服务端渲染的实现一般有两种方法，分别是：

- 在服务器端使用`模板引擎`渲染页面，然后将渲染好的 HTML 发送给客户端展示。这种方式比较适用于传统的后端开发语言，如 PHP、Java 等。
- 在前端框架中使用服务器端渲染插件或库，如 `Next.js`、`Nuxt.js` 等，使得在服务器端也可以渲染 React、Vue 等前端框架渲染的页面并生成 HTML。

实现服务端渲染需要注意以下几点：

- 服务器环境：服务端渲染需要 Node.js 运行环境。
- 构建工具：需要使用 Webpack 等工具来打包渲染的代码。
- 渲染引擎：需要使用 React 官方提供的渲染引擎 ReactDOMServer.renderToString() 或者 ReactDOMServer.renderToStaticMarkup() 来进行渲染。
- 路由处理：因为服务端渲染是针对某一个页面进行渲染的，需要服务端也能够正确的解析浏览器地址路由。

### react 服务端渲染如何处理路由

React 服务端渲染中处理路由有两种主要方式：静态路由和动态路由。静态路由是指路由信息在应用启动时就已经确定，而动态路由是指路由信息在应用运行时才会动态变化。

对于静态路由，你可以使用第三方的路由库如 React Router 来处理。在服务端，你可以在 renderToString() 方法中使用 StaticRouter 组件来渲染路由信息。例如：

```javascript
import { StaticRouter } from 'react-router-dom';
import App from './App';

const context = {};
const html = ReactDOMServer.renderToString(
  <StaticRouter location={request.url} context={context}>
    <App />
  </StaticRouter>
);
```

这里我们通过 StaticRouter 组件将当前请求的 URL 传递给路由器，并将路由器渲染的结果插入到 HTML 中。如果你希望在服务端和客户端之间进行同构，在客户端也需要使用相同的路由器和配置。

对于动态路由，你需要自己编写一个路由模块并将其加载到服务端应用中。你可以在路由模块中根据用户请求的 URL 动态生成路由配置，并使用 React Router 的 matchPath 方法进行匹配。例如：

```javascript
const routeResult = routes.find(route => matchPath(req.url, route));
if (!routeResult) {
  next();
  return;
}
const { component } = routeResult;
const initialProps = await (component.getInitialProps ? component.getInitialProps({ req, res }) : Promise.resolve({}));
const context = { initialProps };
const html = ReactDOMServer.renderToString(
  <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>
);
```

在这个例子中，我们首先使用 `matchPath` 方法找到用户请求的 URL 对应的路由，然后根据路由中定义的组件渲染页面。如果定义了 getInitialProps 方法，我们还需要执行它来获取组件的初始化数据。最后，将组件渲染成实际的 HTML 并返回。

### Next.js

Next.js主要是通过以下几个核心机制实现服务端渲染的：

- 服务端渲染(SSR)：Next.js利用React的服务端渲染能力，在服务器端生成HTML代码，并将其发送给浏览器端；
- 预取机制：Next.js在路由系统中提供预取机制，可以在页面渲染前预先获取异步数据，然后将获取到的数据注入到组件的props中，这样在组件渲染时就可以直接使用数据。这个机制可以加速页面渲染速度，提升用户体验。
- 自动代码分割：Next.js会自动将页面代码分割成小块，只在必须的时候才会加载这些代码块，减少了无用的代码加载，从而提高页面加载速度。
- 静态文件服务：Next.js提供了静态文件服务，可以为项目的资源提供有效的访问路径，同时也可以缓存一些静态文件，减少请求次数，提高性能。

总的来说，Next.js提供了一套完整的服务端渲染解决方案，不但提高了网站的性能，同时也可以方便的在React应用中使用服务端渲染和其他相关技术。

### 服务端渲染相关面试题

- 你是否了解客户端渲染和服务端渲染？它们有何区别？
- 为什么要使用服务端渲染，它有哪些优势和劣势？
- 如何在 React 和 Vue 中实现服务端渲染？
- 在服务端渲染中，如何处理异步数据请求？
- 如何缓存服务端渲染后的内容？
- 你是否遇到过服务端渲染的性能问题？如何解决？
- 在使用服务端渲染时，如何保证 SEO 优化？
- 如何在前端页面中给出用户是否开启了 JavaScript？
  
## SSG - 静态页面生成

// TODO: 待补充


___
