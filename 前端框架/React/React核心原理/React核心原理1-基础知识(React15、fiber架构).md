- [React理念](#react理念)
- [老React架构 - React 15](#老react架构---react-15)
  - [Reconciler（协调器）](#reconciler协调器)
  - [Renderer（渲染器）](#renderer渲染器)
  - [React15的缺点](#react15的缺点)
- [新React架构 - React16](#新react架构---react16)
  - [Scheduler（调度器）](#scheduler调度器)
  - [Reconciler（协调器）ps:render阶段](#reconciler协调器psrender阶段)
  - [Render（渲染器）ps:commit阶段](#render渲染器pscommit阶段)
  - [总结 :heavy\_exclamation\_mark:](#总结-heavy_exclamation_mark)
- [Fiber](#fiber)
  - [为什么要Fiber架构](#为什么要fiber架构)
  - [Fiber架构特点](#fiber架构特点)
  - [Fiber的三层含义](#fiber的三层含义)
  - [Fiber架构的工作原理 - 双缓存 :heavy\_exclamation\_mark:](#fiber架构的工作原理---双缓存-heavy_exclamation_mark)

> 参考资料：React技术揭秘：https://react.iamkasong.com/preparation/idea.html#react%E7%90%86%E5%BF%B5

## React理念

React理念是：构建快速响应的大型 Web 应用程序。

但由于以下两个瓶颈会制约应用的响应速度：

1. CPU瓶颈：当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。
2. IO瓶颈：发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。

React应对这两大瓶颈的办法是：努力将`同步`的更新变为`可中断`的异步更新。:heart:

## 老React架构 - React 15

React15架构可以分为两层：
* `Reconciler（协调器）`—— 负责找出变化的组件
* `Renderer（渲染器）`—— 负责将变化的组件渲染到页面上

### Reconciler（协调器）
我们知道，在React中可以通过this.setState、this.forceUpdate、ReactDOM.render等API触发更新。

每当有更新发生时，Reconciler会做如下工作：
1. 调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
2. 将虚拟DOM和上次更新时的虚拟DOM对比
3. 通过对比找出本次更新中变化的虚拟DOM
4. 通知`Renderer`将变化的虚拟DOM渲染到页面上

Reconciler是递归处理虚拟DOM的，[参考链接](https://zh-hans.reactjs.org/docs/implementation-notes.html)

### Renderer（渲染器）
由于React支持跨平台，所以不同平台有不同的Renderer。我们前端最熟悉的是负责在`浏览器`环境渲染的Renderer —— [ReactDOM](https://www.npmjs.com/package/react-dom)。

除此之外，还有以下几种render：
1. ReactNative渲染器，渲染App原生组件
2. ReactTest渲染器，渲染出纯Js对象用于测试
3. ReactArt渲染器，渲染到Canvas, SVG 或 VML (IE8)

在每次更新发生时，`Renderer`接到`Reconciler`通知，将变化的组件渲染在当前宿主环境。

### React15的缺点
当子组件更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。

## 新React架构 - React16
React16架构可以分为三层：
* `Scheduler（调度器）`—— 调度任务的优先级，高优任务优先进入Reconciler。:pushpin:
* `Reconciler（协调器）`—— 负责找出变化的组件 :pushpin:
* `Renderer（渲染器）`—— 负责将变化的组件渲染到页面上

**可以看到，相较于React15，React16中新增了Scheduler（调度器），让我们来了解下他。**

### Scheduler（调度器）
React实现了功能更完备的`requestIdleCallback`polyfill，这就是`Scheduler`。会在浏览器空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置。
> 部分浏览器已经实现了[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)这个API，但存在兼容性问题；并且该方法的触发受很多因素影响，所以不稳定。
> Scheduler是独立于React的库

### Reconciler（协调器）ps:render阶段
在React15中Reconciler是递归处理虚拟DOM的。在React16中，更新工作从递归变成了可以`中断`的`循环`过程。每次循环都会调用`shouldYield`判断当前是否有剩余时间。
```js
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```
那么React16是如何解决中断更新时DOM渲染不完全的问题呢？

* 在React16中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表`增/删/更新`的标记
* 整个Scheduler与Reconciler的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

Reconciler内部采用了`Fiber`的架构。:heavy_exclamation_mark:

### Render（渲染器）ps:commit阶段
Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。

### 总结 :heavy_exclamation_mark:
* React16采用`Scheduler（调度器）`和`新的Reconcile(协调器)`
* Scheduler（调度器）会在浏览器空闲时触发回调的功能，还会执行其他操作。
* Reconciler(协调器)内部采用了`Fiber`的架构。目的是为了实现将**同步**的更新变为**可中断的异步**更新。
* Scheduler（调度器）和 Reconcile(协调器)的工作不会被用户看见。只有Render（渲染器）会更新页面上的DOm

## Fiber

### 为什么要Fiber架构

在React15及以前，Reconciler采用`递归`的方式创建虚拟DOM，递归过程是`不能中断`的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿。

为了解决这个问题，React16将递归的无法中断的更新重构为`异步的可中断更新`，由于曾经用于递归的虚拟DOM数据结构已经无法满足需要。于是，全新的`Fiber架构`应运而生。

### Fiber架构特点

[**代数效应**](https://overreacted.io/zh-hans/algebraic-effects-for-the-rest-of-us/)：是函数式编程中的一个概念，用于将副作用从函数调用中分离。也就是说能够将副作用从函数中逻辑中分离，使得函数关注点保持存粹。

**代数效应在React中的应用 - `Hooks`**

对于类似useState、useReducer、useRef这样的Hook，我们不需要关注FunctionComponent的state在Hook中是如何保存的，React会为我们处理。

**React Fiber可以理解为：**

- React内部实现的一套状态更新机制。支持任务不同`优先级`，可中断与恢复，并且恢复后可以复用之前的`中间状态`。

- 其中每个任务更新单元为`React Element`对应的`Fiber节点`。

### Fiber的三层含义

- 作为`架构`来说，之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack Reconciler`。React16的Reconciler基于Fiber节点实现，被称为`Fiber Reconciler`。
- 作为`静态的数据结构`来说，每个Fiber节点对应一个`React element`，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的`DOM节点`等信息。
- 作为`动态的工作单元`来说，每个Fiber节点保存了本次更新中该组件`改变的状态`、`要执行的工作`（需要被删除/被插入页面中/被更新...）。

**在React16中，虚拟DOM就是fiber**:heavy_exclamation_mark:

### Fiber架构的工作原理 - 双缓存 :heavy_exclamation_mark:

React使用`“双缓存”`来完成`Fiber树`的构建与替换 —— 对应着`DOM树`的创建与更新。

在React中最多会同时存在两棵Fiber树。

- 当前屏幕上`显示内容`对应的Fiber树称为`current Fiber tree`，其对应节点为`current fiber`
- `正在内存中构建`的Fiber树称为`workInProgress Fiber tree`，其对应节点为`workInProgress fiber`

`current fiber`和`workInProgress fiber`通过`alternate`属性连接。

React应用的根节点通过使`current`指针在不同`Fiber树`的`rootFiber`间切换来完成current Fiber树指向的切换。

:heavy_exclamation_mark:即当`workInProgress Fiber树`构建完成交给`Renderer`渲染在页面上后，应用根节点的`current`指针指向`workInProgress Fiber树`，此时`workInProgress Fiber树`就变为`current Fiber树`。

`每次状态更新`都会产生`新`的workInProgress Fiber树，通过`current`与`workInProgress`的`替换`，完成`DOM`更新。

fiber树的**构建/替换**分为`mount时`， `update时`。
