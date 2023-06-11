- [路由概述](#路由概述)
- [Hash模式](#hash模式)
  - [react 路由hash模式实现原理 - `<HashRouter>`](#react-路由hash模式实现原理---hashrouter)
- [history模式](#history模式)
  - [react 路由history模式实现原理 - `<BrowserRouter>`](#react-路由history模式实现原理---browserrouter)
- [面试题](#面试题)
  - [react-router 里的 Link 标签和 a 标签的区别](#react-router-里的-link-标签和-a-标签的区别)
  - [react-router与react-router-dom的关系？](#react-router与react-router-dom的关系)
  - [react-router-dom 6 有什么新特性？](#react-router-dom-6-有什么新特性)

# 路由概述

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

## react 路由hash模式实现原理 - `<HashRouter>`

React 路由的 Hash 模式指的是 URL 地址中以 # 开头的部分用于匹配路由，而不是直接将地址路径作为路由匹配。

实现 Hash 模式的原理是：

1. 首先在页面中引入 `React Router` 库，并在路由配置中设置 `<HashRouter>` 作为根组件。

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

## react 路由history模式实现原理 - `<BrowserRouter>`

React路由中`history`模式是使用HTML5 History API将路径更新到URL地址栏中。通过使用`history.pushState()`或`history.replaceState()`方法，可以动态地改变浏览器的历史记录，从而保证在浏览器刷新或后退按钮点击时，页面渲染的正确性。

React Router中的history模式具体实现如下：

1. Web应用启动时，React Router初始化history对象，并将其传递给Router组件，对应`<BrowserRouter>`组件

2. Router组件使用`history.listen()`方法监听`popstate` 事件得知URL地址的变化；

3. 当URL地址发生变化时，Router组件将匹配当前URL地址的Route组件渲染到页面上。

4. `PushState`或`ReplaceState`方法可以在应用响应操作后，通过`history.push()`(向浏览器历史记录栈中添加一个新的状态记录)或`history.replace()`(替换栈顶的状态记录)方法将路径更新到URL地址栏中。

5. 当应用在history模式下发生错误或遇到404错误时，可以通过`history.push()`方法将用户重定向到错误页面。

总结一下，history 模式的实现原理是通过监听 `popstate` 事件和使用 History API 来实现的，然后再将 `history` 对象传递给 React Router 组件，以便进行状态管理和导航。

# 面试题
## react-router 里的 Link 标签和 a 标签的区别

React Router 的 `Link` 组件与 HTML 里的 `a` 标签看起来很相似，它们都可以用来实现页面间的跳转。但是，它们之间存在几个关键的不同：

1. `Link` 组件使用了 `history.pushState` API 来改变 URL，从而更新 UI，而 `a` 标签则会通过浏览器发起请求，加载一个新的页面
2. 使用 `Link` 组件跳转页面，不会刷新整个页面，只会更新需要更新的部分，从而提高了页面的性能。
3. `Link` 组件可以像普通组件一样在 React 应用中使用，可以轻松得到当前路由的状态并根据路由状态进行布局或渲染组件。

## react-router与react-router-dom的关系？
react-router-dom 是基于 react-router 封装的一套用于 Web 端的路由库。在项目中引入 react-router-dom 后，就可以使用 BrowserRouter、Switch、Link 等组件实现路由跳转、组件渲染等功能了。

## react-router-dom 6 有什么新特性？
1. `<Switch>`重命名为`<Routes>`
2. `<Route>`的新特性变更。`component/render`被`element`替代
   ```js
   // v5
   <Route path=":userId" component={Profile} />
   <Route
     path=":userId"
     render={routeProps => (
       <Profile routeProps={routeProps} animate={true} />
     )}
   />
   
   // v6
   <Route path=":userId" element={<Profile />} />
   <Route path=":userId" element={<Profile animate={true} />} />
   ```
3. 嵌套路由变得更简单, `Outlet`
   1. **简化嵌套路由定义**，v5中的嵌套路由必须非常明确定义，且要求在这些组件中**包含许多字符串匹配逻辑**。而在V6中可以删除字符串匹配逻辑。不需要任何useRouteMatch()！
      ```js
       // v5
       import { BrowserRouter, Switch, Route, Link,   useRouteMatch } from 'react-router-dom';
       function App() {
         return (
           <BrowserRouter>
             <Switch>
               <Route exact path="/" component={Home} />
               <Route path="/profile" component={Profile} />
             </Switch>
           </BrowserRouter>
         );
       }
       function Profile() {
         let { path, url } = useRouteMatch();
         return (
           <div>
             <nav>
               <Link to={`${url}/me`}>My Profile</Link>
             </nav>
             <Switch>
               <Route path={`${path}/me`}><MyProfile /></Route>
             </Switch>
           </div>
         );
       }
      ```
      ```js
       // v6
       import { BrowserRouter, Routes, Route, Link } from   'react-router-dom';
       function App() {
         return (
           <BrowserRouter>
             <Routes>
               <Route path="/" element={<Home />} />
               <Route path="profile/*" element={<Profile/>} />
             </Routes>
           </BrowserRouter>
         );
       }
       function Profile() {
         return (
           <div>
             <nav>
               <Link to="me">My Profile</Link>
             </nav>
             <Switch>
               <Route path="me" element={<MyProfile />} />
             </Switch>
           </div>
         );
       }
      ```
   2. `Outlet`：在嵌套路由场景，用于在父路由和子路由之间输出子路由的组件。
      ```js
      function App() {
        return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="profile" element={<Profile />}>
                <Route path=":id" element={<MyProfile />} />
                <Route path="me" element={<OthersProfile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        );
      }
      function Profile() {
        return (
          <div>
            <nav>
              <Link to="me">My Profile</Link>
            </nav>
             // 将直接根据上面定义的不同路由参数，渲染<MyProfile />或<OthersProfile />
            <Outlet />
          </div>
        )
      }
      ```
4. 用`useNavigate`代替`useHistory`
   ```js
   // v5
   history.push('/home');
   history.replace('/home');
   
   // v6
   navigate('/home');
   navigate('/home', {replace: true});
   ```
5. 新钩子`useRoutes`代替`react-router-config`。
   ```js
   function App() {
     let element = useRoutes([
       { path: '/', element: <Home /> },
       { path: 'dashboard', element: <Dashboard /> },
       { path: 'invoices',
         element: <Invoices />,
         children: [
           { path: ':id', element: <Invoice /> },
           { path: 'sent', element: <SentInvoices /> }
         ]
       },
       // 重定向
       { path: 'home', redirectTo: '/' },
       // 404找不到
       { path: '*', element: <NotFound /> }
     ]);
     return element;
   }
   ```
6. **大小减少*8：从20kb到8kb