- [React理念](#react理念)
  - [React理念](#react理念-1)
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
    - [Fiber架构 - 心智模式](#fiber架构---心智模式)
      - [什么是代数效应](#什么是代数效应)
      - [代数效应在React中的应用 - `Hooks`](#代数效应在react中的应用---hooks)
      - [代数效应和Fiber](#代数效应和fiber)
    - [Fiber架构的实现原理](#fiber架构的实现原理)
    - [Fiber架构的工作原理 - 双缓存 :heavy\_exclamation\_mark:](#fiber架构的工作原理---双缓存-heavy_exclamation_mark)
- [React生命周期](#react生命周期)
  - [专业术语解释， render阶段、commit阶段等与总结 :heavy\_exclamation\_mark:](#专业术语解释-render阶段commit阶段等与总结-heavy_exclamation_mark)
- [Render阶段 :heavy\_exclamation\_mark:](#render阶段-heavy_exclamation_mark)
  - [流程概览](#流程概览)
    - [“递”阶段](#递阶段)
    - [“归”阶段](#归阶段)
    - [例子](#例子)
  - [“递”阶段 - beginWork](#递阶段---beginwork)
  - ["归"阶段 - completeWork](#归阶段---completework)
- [commit阶段](#commit阶段)
  - [before mutation阶段（执行DOM操作前）](#before-mutation阶段执行dom操作前)
  - [mutation阶段（执行DOM操作）](#mutation阶段执行dom操作)
  - [layout阶段（执行DOM操作后）](#layout阶段执行dom操作后)

> 参考资料：React技术揭秘：https://react.iamkasong.com/preparation/idea.html#react%E7%90%86%E5%BF%B5


# React理念

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
### Fiber架构 - 心智模式
React核心团队成员Sebastian Markbåge（React Hooks的发明者）说：我们在React中做的就是践行`代数效应`（Algebraic Effects）。

#### 什么是代数效应
[代数效应](https://overreacted.io/zh-hans/algebraic-effects-for-the-rest-of-us/)：是函数式编程中的一个概念，用于将副作用从函数调用中分离。也就是说能够将副作用从函数中逻辑中分离，使得函数关注点保持存粹。

#### 代数效应在React中的应用 - `Hooks`

对于类似useState、useReducer、useRef这样的Hook，我们不需要关注FunctionComponent的state在Hook中是如何保存的，React会为我们处理。

我们只需要假设useState返回的是我们想要的state，并编写业务逻辑就行。
```js
function App() {
  const [num, updateNum] = useState(0);
  
  return (
    <button onClick={() => updateNum(num => num + 1)}>{num}</button>  
  )
}
```

#### 代数效应和Fiber
React Fiber可以理解为：

* React内部实现的一套状态更新机制。支持任务不同`优先级`，可中断与恢复，并且恢复后可以复用之前的`中间状态`。

* 其中每个任务更新单元为`React Element`对应的`Fiber节点`。


### Fiber架构的实现原理
在React15及以前，Reconciler采用`递归`的方式创建虚拟DOM，递归过程是`不能中断`的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿。

为了解决这个问题，React16将递归的无法中断的更新重构为`异步的可中断更新`，由于曾经用于递归的虚拟DOM数据结构已经无法满足需要。于是，全新的`Fiber架构`应运而生。

Fiber包含三层含义：
* 作为`架构`来说，之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack Reconciler`。React16的Reconciler基于Fiber节点实现，被称为`Fiber Reconciler`。
* 作为`静态的数据结构`来说，每个Fiber节点对应一个`React element`，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的`DOM节点`等信息。
* 作为`动态的工作单元`来说，每个Fiber节点保存了本次更新中该组件`改变的状态`、`要执行的工作`（需要被删除/被插入页面中/被更新...）。

**在React16中，虚拟DOM就是fiber**

### Fiber架构的工作原理 - 双缓存 :heavy_exclamation_mark:
React使用`“双缓存”`来完成`Fiber树`的构建与替换 —— 对应着`DOM树`的创建与更新。

在React中最多会同时存在两棵Fiber树。
* 当前屏幕上`显示内容`对应的Fiber树称为`current Fiber tree`，其对应节点为`current fiber`
* `正在内存中构建`的Fiber树称为`workInProgress Fiber tree`，其对应节点为`workInProgress fiber`

`current fiber`和`workInProgress fiber`通过`alternate`属性连接。

React应用的根节点通过使`current`指针在不同`Fiber树`的`rootFiber`间切换来完成current Fiber树指向的切换。

:heavy_exclamation_mark:即当`workInProgress Fiber树`构建完成交给`Renderer`渲染在页面上后，应用根节点的`current`指针指向`workInProgress Fiber树`，此时`workInProgress Fiber树`就变为`current Fiber树`。

`每次状态更新`都会产生`新`的workInProgress Fiber树，通过`current`与`workInProgress`的`替换`，完成`DOM`更新。

fiber树的**构建/替换**分为`mount时`， `update时`。


# React生命周期

<img src="./pictures/lifeCycle.png"/>

## 专业术语解释， render阶段、commit阶段等与总结 :heavy_exclamation_mark:

[参考链接](https://github.com/mbaxszy7/blog/issues/16)

- **Render阶段**
  - 在render阶段，React将**更新**应用于通过`setState或render`方法触发的组件，并确定需要在用户屏幕上做哪些更新--哪些节点需要插入，更新或删除，哪些组件需要调用其生命周期方法。
  - 最终的这些更新信息被保存在一个叫`effect list`的`fiber` 节点树上
  - 当然，在首次渲染时，React不需要产生任何更新信息，而是会给每个从render方法返回的element生成一个fiber节点，最终生成一个fiber节点树， 后续的更新也是复用了这棵fiber树。
- **Commit阶段**
  - 在这个阶段时，React内部会有2个fiber树和一个list：
    1. `current fiber tree`: 表示`显示内容`对应的Fiber树。在首次渲染时，React不需要产生任何更新信息，而是会给每个从render方法返回的element生成一个fiber节点，最终生成一个fiber节点树， 后续的更新也是复用了这棵fiber树。
    2. `workInProgress fiber tree`: 表示`正在内存中构建`的Fiber树。所有的更新计算工作都在workInProgress tree的fiber上执行。当React 遍历current fiber tree时，它为每个current fiber 创建一个替代（alternate）节点，这样的alternate节点构成了workInProgress tree
    3. `effect list`: 是workInProgress fiber tree 的子树，它的作用是串联了标记具有更新的节点
  - Commit阶段会遍历effect list，把所有更新都commit到`DOM树`上。具体如下
    1. 首先会有一个pre-commit阶段，主要是执行`getSnapshotBeforeUpdate`方法，可以获取当前DOM的快照（snap）
    2. 然后给需要卸载的组件执行componentWillUnmount方法
    3. 接着会把current fiber tree 替换为workInProgress fiber tree
    4. 最后执行DOM的插入、更新和删除，给更新的组件执行componentDidUpdate，给插入的组件执行componentDidMount
  - 重点要注意的是，这一阶段是**同步执行的，不能中止**。

----

* `Reconciler（协调器）`工作的阶段被称为`render阶段`。因为在该阶段会调用组件的render方法。
* `Renderer（渲染器）`工作的阶段被称为`commit阶段`。commit阶段会把render阶段提交的信息**渲染**在页面上。
* render与commit阶段统称为`work`，即React在工作中。相对应的，如果任务正在`Scheduler(调度器)`内调度，就不属于work。

----

* `Scheduler（调度器）`—— 调度任务的优先级，高优任务优先进入Reconciler。会在浏览器空闲时触发回调的功能，还会执行其他操作。Scheduler是一个独立于React的包
* `Reconciler（协调器）`—— 负责找出变化的组件。在此引用了`Fiber架构`，目的是为了实现将**同步**的更新变为**可中断的异步**更新。
* `Renderer（渲染器）`—— 负责将变化的组件渲染到页面上

# Render阶段 :heavy_exclamation_mark:

本章我们会讲解`Fiber节点`是如何被创建并构建`Fiber树`的。

## 流程概览

在render阶段，React将更新应用于通过setState或render方法触发的组件，并确定需要在用户屏幕上做哪些更新--哪些节点需要插入，更新或删除，哪些组件需要调用其生命周期方法。

`render阶段`开始于`performSyncWorkOnRoot`或`performConcurrentWorkOnRoot`方法的调用。这取决于本次更新是同步更新还是异步更新。
```js
// performSyncWorkOnRoot会调用该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress); 
  }
}

// performConcurrentWorkOnRoot会调用该方法
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) { // 如果当前浏览器帧没有剩余时间，shouldYield会中止循环，直到浏览器有空闲时间后再继续遍历。
    performUnitOfWork(workInProgress);
  }
}
```

`performUnitOfWork`方法会创建下一个`Fiber节点`并赋值给`workInProgress`，并将workInProgress与已创建的Fiber节点连接起来构成Fiber树。

Fiber Reconciler(协调器)通过遍历的方式实现可中断的递归，所以`performUnitOfWork`的工作可以分为两部分：“递”和“归”。

### “递”阶段
* 首先从`rootFiber`开始向下深度优先遍历。为遍历到的每个Fiber节点调用`beginWork方法`。:clap:
* 该方法会根据传入的Fiber节点创建子Fiber节点，并将这两个Fiber节点连接起来。
* 当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

### “归”阶段
* 在“归”阶段会调用`completeWork`处理Fiber节点。:clap:
* 当某个Fiber节点执行完completeWork，如果其存在兄弟Fiber节点（即fiber.sibling !== null），会进入其`兄弟Fiber`的“递”阶段。
* 如果不存在兄弟Fiber，会进入`父级Fiber`的“归”阶段。
* “递”和“归”阶段会交错执行直到“归”到rootFiber。至此，render阶段的工作就结束了。

### 例子
```js
function App() {
  return (
    <div>
      i am
      <span>KaSong</span>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
```
<img src='./pictures/reactRender.png' width=60%/>

## “递”阶段 - beginWork
[源码在此](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3075)

beginWork的工作是传入`当前Fiber`节点，创建`子Fiber`节点。

beginWork的工作可以分为两部分：
* **update时**：如果`current`存在，在满足一定条件时可以复用current节点，这样就能克隆current.child作为workInProgress.child，而不需要新建workInProgress.child。
* **mount时**：除`fiberRootNode`以外，current === null。会根据`fiber.tag`不同，进入不同类型Fiber的创建逻辑。创建不同类型的子Fiber节点。
  

```js
function beginWork(
  current: Fiber | null, //当前组件对应的Fiber节点在上一次更新时的Fiber节点，即workInProgress.alternate
  workInProgress: Fiber, // 当前组件对应的Fiber节点
  renderLanes: Lanes // 优先级相关
): Fiber | null {

  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  if (current !== null) {
    // ...省略

    // 复用current
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderLanes,
    );
  } else {
    didReceiveUpdate = false;
  }

  // mount时：根据tag不同，创建不同的子Fiber节点
  switch (workInProgress.tag) {
    case IndeterminateComponent: 
      // ...省略
    case LazyComponent: 
      // ...省略
    case FunctionComponent: 
      // ...省略
    case ClassComponent: 
      // ...省略
    case HostRoot:
      // ...省略
    case HostComponent:
      // ...省略
    case HostText:
      // ...省略
    // ...省略其他类型
  }
}
```

对于我们常见的组件类型，如（FunctionComponent/ClassComponent/HostComponent），最终会进入`reconcileChildren`方法。


* **reconcileChildren**： 通过current === null 区分mount与update
   * 对于**mount**的组件，他会创建新的子Fiber节点。调用`mountChildFibers`方法
   * 对于**update**的组件，他会将当前组件与该组件在上次更新时对应的Fiber节点比较（也就是俗称的**Diff**算法:heavy_exclamation_mark:），将比较的结果生成新Fiber节点。调用`reconcileChildFibers`方法，会为Fiber节点带上`effectTag`属性。
* **effectTag**：它表示，Render阶段结束后，通知Render（渲染器）要执行的DOM操作类型。保存在`fiber.effectTag`上。
  ```js
  // DOM需要插入到页面中
  export const Placement = /*                */ 0b00000000000010;
  // DOM需要更新
  export const Update = /*                   */ 0b00000000000100;
  // DOM需要插入到页面中并更新
  export const PlacementAndUpdate = /*       */ 0b00000000000110;
  // DOM需要删除
  export const Deletion = /*                 */ 0b0000000000100
  ```


<img src='./pictures/beginWork.png'/>


## "归"阶段 - completeWork
completeWork的目的就是为了`创建好对应的dom节点`插入对应的`父级节点`的dom节点, 为其添加`副作用`标识。

completeWork的上层函数`completeUnitOfWork`中，每个执行完completeWork且存在`effectTag`的Fiber节点会被保存在一条被称为`effectList`的单向链表中。effectList中保存所有的effectTag。

<img src='./pictures/completeWork.png'/>

# commit阶段

一些`副作用`对应的DOM操作、一些生命周期钩子（componentDidXXX）、某些hook（useEffect）都在commit阶段执行

commit阶段的主要工作（即Renderer的工作流程）分为三部分：

* before mutation阶段（执行DOM操作前）
* mutation阶段（执行DOM操作）
* layout阶段（执行DOM操作后）

另外，

* 在before mutation之前：主要做一些变量赋值，状态重置的工作。
* 在layout阶段之后：1. useEffect相关处理 2. 性能追踪相关 3. 执行同步任务, 比如在 componentDidMount 中执行 setState 创建的更新会在这里被同步执行, useLayoutEffect、useEffect的回调方法也会在这里被执行


## before mutation阶段（执行DOM操作前）

在before mutation阶段，会遍历`effectList`（保存effectTag的单向链表），并调用`commitBeforeMutationEffects`函数，依次执行：

1. 处理DOM节点渲染/删除后的 autoFocus、blur逻辑
2. 调用getSnapshotBeforeUpdate生命周期钩子
3. 调度useEffect
   
## mutation阶段（执行DOM操作）

mutation阶段会遍历 `effectList`，依次执行`commitMutationEffects`。该方法的主要工作为根据`effectTag`调用不同的处理函数`处理Fiber`

## layout阶段（执行DOM操作后）

layout阶段会遍历 `effectList`，依次执行`commitLayoutEffects`。该方法的主要工作为根据`effectTag`调用不同的处理函数`处理Fiber`并更新`ref`。

