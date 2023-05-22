- [前言](#前言)
- [Hash模式](#hash模式)
  - [react 路由hash模式实现原理](#react-路由hash模式实现原理)
- [history模式](#history模式)
  - [react 路由history模式实现原理](#react-路由history模式实现原理)

# 前言

前端路由是指在单页面应用（SPA）中，**通过改变 URL 路径来实现页面的切换和状态的管理的一种技术**。相比传统的多页面应用，前端路由可以提高用户的体验，避免了多次请求页面资源的时间消耗，并且可以实现更好的管理和控制页面状态。

简单的说，就是在保证只有一个 HTML 页面，且与用户交互时不刷新和跳转页面的同时，为 SPA 中的每个视图展示形式匹配一个特殊的 url。在刷新、前进、后退和SEO时均通过这个特殊的 url 来实现。
为实现这一目标，我们需要做到以下二点：

- 改变 url 且不让浏览器像服务器发送请求。
- 可以监听到 url 的变化

通常在前端路由中，可以通过使用一些开源库来实现，比如 React Router、Vue Router 等，它们都提供了统一而易于使用的 API 来根据 URL 路径进行视图的切换和状态的管理。

前端路由的实现主要有两种方式：`hash` 模式和 `history` 模式。 hash 模式是通过 URL 的哈希值来实现路由的跳转，比如 `http://domain.com/#/path；history` 模式是通过 HTML5 中的 history API 来实现路由的切换，比如 `http://domain.com/path`。

无论是哪种方式，前端路由的实现都要依赖于 **JavaScript 和浏览器**的特性，因此需要考虑浏览器兼容性和页面加载速度等问题。

# Hash模式

是通过**监听浏览器 URL 中的 hash 值的变化来实现路由的切换**。`hash` 就是指 url 后的 `#` 号以及后面的字符。比如说 "www.baidu.com/#hashhash" ，其中 "#hashhash" 就是我们期望的 `hash` 值。

**由于 hash 值的变化不会导致浏览器像服务器发送请求**，而且 hash 的改变会触发 `hashchange` 事件，因此可以通过监听这个事件来实现路由的切换。

使用 Hash 模式的好处是，**可以避免因为路由变化而导致整个页面的刷新**，因为 hash 只会影响到 URL 的一部分，不会触发完整的页面重新加载。这也是单页面应用中常用的一种路由模式。

## react 路由hash模式实现原理

React 路由的 Hash 模式指的是 URL 地址中以 # 开头的部分用于匹配路由，而不是直接将地址路径作为路由匹配。

实现 Hash 模式的原理是：

1. 首先在页面中引入 `React Router` 库，并在路由配置中设置 `HashRouter` 作为根组件。

2. 在 HashRouter 组件中包含一组 Route 组件，并为每个 Route 组件指定对应的路径和组件。

3. 当用户在浏览器地址栏中输入或点击链接访问某个路由时，浏览器会自动将 # 后面的部分作为路由路径，然后通过 React 路由匹配器找到对应的组件进行渲染。

4. 用户在页面中点击链接跳转到新的路由时，需要在链接中指定跳转的路径，同时使用 `window.location.hash` 改变 URL 中的 hash 值，从而触发路由匹配器对新路由进行渲染。

需要注意的是，由于 Hash 模式使用的是 URL 中的 hash 值，所以即使通过链接或页面跳转到新的路由，也不会向服务器发送请求，而只是在客户端进行页面切换。

# history模式

是通过**浏览器提供的 history API 来控制 URL 的变化**。history API 可以添加、修改和删除浏览器的访问历史记录，从而实现上一步、下一步和手动跳转页面。基于此，前端路由库可以使用新增的 `history.pushState()` 和 `history.replaceState()` 方法来控制 URL 的变化，在当前已有的 `back、forward、go`基础之上，它们提供了对历史记录修改的功能。然后通过监听 `popstate` 事件来实现路由的切换。只是当它们执行修改时，虽然改变了当前的 URL ，但**浏览器不会立即向后端发送请求**。

history.pushState() 和 history.replaceState() 的区别在于：

- `history.pushState()` 在保留现有历史记录的同时，将 url 加入到历史记录中。
- `history.replaceState()` 会将历史记录中的当前页面历史替换为 url。

通过监听 `popstate`事件，获取URL的变化。

## react 路由history模式实现原理

React Router 的 history 模式是通过 HTML5 的 History API 实现的。在 history 模式下，页面的路由使用 URL 路径名来表示，而不是使用 URL 中的 hash 部分。

具体实现原理如下：

1.首先，通过 `window.addEventListener('popstate', callback)` 监听 URL 的变化。当浏览器的前进或后退按钮被点击时，会触发 `popstate` 事件，callback 函数就会被调用。

2.使用 `pushState` 和 `replaceState` 方法，通过 JavaScript 来改变历史记录。`pushState` 方法可以向浏览器历史记录栈中添加一个新的状态记录，而 `replaceState` 则可以替换栈顶的状态记录，都不会触发页面的刷新。

3.在初始化时，需要调用 `createBrowserHistory` 创建一个 `history` 对象，它是整个路由系统的核心，负责管理浏览器历史记录、触发导航事件等。

4.接下来需要将 `history` 对象传递给 `<Router>` 组件，以便让 React Router 监听到 `history` 对象上的变化，并自动更新组件状态。

总结一下，history 模式的实现原理是通过监听 popstate 事件和使用 History API 来实现的，然后再将 `history` 对象传递给 React Router 组件，以便进行状态管理和导航。