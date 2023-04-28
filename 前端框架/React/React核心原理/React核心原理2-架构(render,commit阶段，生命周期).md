- [React生命周期](#react生命周期)
- [专业术语解释， render阶段、commit阶段等与总结 :heavy\_exclamation\_mark](#专业术语解释-render阶段commit阶段等与总结-heavy_exclamation_mark)
- [Render阶段 :heavy\_exclamation\_mark](#render阶段-heavy_exclamation_mark)
  - [流程概览](#流程概览)
    - [“递”阶段 -- beginWork](#递阶段----beginwork)
    - [“归”阶段 -- completeWork](#归阶段----completework)
    - [例子](#例子)
  - [“递”阶段 - beginWork](#递阶段---beginwork)
    - [reconcileChildren](#reconcilechildren)
    - [effectTag](#effecttag)
    - [总结](#总结)
  - ["归"阶段 - completeWork](#归阶段---completework)
    - [HostComponen如何处理](#hostcomponen如何处理)
    - [`effectList`](#effectlist)
    - [总结](#总结-1)
- [commit阶段](#commit阶段)
  - [before mutation阶段（执行DOM操作前）](#before-mutation阶段执行dom操作前)
  - [mutation阶段（执行DOM操作）](#mutation阶段执行dom操作)
    - [Placement effect](#placement-effect)
    - [Update effect](#update-effect)
    - [Deletion effect](#deletion-effect)
  - [layout阶段（执行DOM操作后）](#layout阶段执行dom操作后)

# React生命周期

<img src="./pictures/lifeCycle.png"/>

# 专业术语解释， render阶段、commit阶段等与总结 :heavy_exclamation_mark

[参考链接](https://github.com/mbaxszy7/blog/issues/16)

- **Render阶段 -- 确定更新细节**
  - **在render阶段，React将**更新**应用于通过`setState或render`方法触发的组件，并确定需要在用户屏幕上做哪些更新--哪些节点需要插入，更新或删除，哪些组件需要调用其生命周期方法**。
  - 最终的这些更新信息被保存在一个叫`effect list`的`fiber` 节点树上
  - 当然，在首次渲染时，React不需要产生任何更新信息，而是会给每个从render方法返回的element生成一个fiber节点，最终生成一个fiber节点树， 后续的更新也是复用了这棵fiber树。
- **Commit阶段 -- 将更新作用到Dom树上**
  - 在这个阶段时，React内部会有2个fiber树和一个list：
    1. `current fiber tree`: 表示`显示内容`对应的Fiber树。在首次渲染时，React不需要产生任何更新信息，而是会给每个从render方法返回的element生成一个fiber节点，最终生成一个fiber节点树， 后续的更新也是复用了这棵fiber树。
    2. `workInProgress fiber tree`: 表示`正在内存中构建`的Fiber树。所有的更新计算工作都在workInProgress tree的fiber上执行。当React 遍历current fiber tree时，它为每个current fiber 创建一个替代（alternate）节点，这样的alternate节点构成了workInProgress tree
    3. `effect list`: 是workInProgress fiber tree 的子树，它的作用是串联了标记具有更新的节点
  - **Commit阶段会遍历effect list，把所有更新都commit到`DOM树`上**。具体如下
    1. 首先会有一个pre-commit阶段，主要是执行`getSnapshotBeforeUpdate`方法，可以获取当前DOM的快照（snap）
    2. 然后给需要卸载的组件执行componentWillUnmount方法
    3. 接着会把current fiber tree 替换为workInProgress fiber tree
    4. 最后执行DOM的插入、更新和删除，给更新的组件执行componentDidUpdate，给插入的组件执行componentDidMount
  - 重点要注意的是，这一阶段是**同步执行的，不能中止**。

----

- `Scheduler（调度器）`—— 调度任务的优先级，高优任务优先进入Reconciler。会在浏览器空闲时触发回调的功能，还会执行其他操作。Scheduler是一个独立于React的包
- `Reconciler（协调器）`—— **负责找出变化的组件，确定更新细节**。在此引用了`Fiber架构`，目的是为了实现将**同步**的更新变为**可中断的异步**更新。其工作的阶段被称为`render阶段`。因为在该阶段会调用组件的render方法。
- `Renderer（渲染器）`—— 负责将变化的组件渲染到页面上其工作的阶段被称为`commit阶段`。commit阶段会把render阶段提交的信息**渲染**在页面上。

render与commit阶段统称为`work`，即React在工作中。相对应的，如果任务正在`Scheduler(调度器)`内调度，就不属于work。

# Render阶段 :heavy_exclamation_mark

本章我们会讲解`Fiber节点`是如何被创建并构建`Fiber树`的。

## 流程概览

在`render`阶段，React将更新应用于通过setState或render方法触发的组件，并确定需要在用户屏幕上做哪些更新--哪些节点需要插入，更新或删除，哪些组件需要调用其生命周期方法。

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

Fiber Reconciler(协调器)通过遍历的方式实现可中断的递归，所以`performUnitOfWork`的工作可以分为两部分：`“递”和“归”`。

### “递”阶段 -- beginWork

- 首先从`rootFiber`开始向下**深度**优先遍历。为遍历到的每个Fiber节点调用`beginWork方法`。:clap: -- 该方法会根据传入的Fiber节点创建子Fiber节点，并将这两个Fiber节点连接起来。
- 当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

### “归”阶段 -- completeWork

- 在“归”阶段会调用`completeWork`处理Fiber节点。:clap:
- 当某个Fiber节点执行完completeWork，如果其存在兄弟Fiber节点（即fiber.sibling !== null），会进入其`兄弟Fiber`的`递`阶段。
- 如果不存在兄弟Fiber，会进入`父级Fiber`的`归`阶段。
- `递`和`归`阶段会交错执行直到“归”到rootFiber。至此，render阶段的工作就结束了。

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

在`render`阶段会依次执行：

```js
1. rootFiber beginWork
2. App Fiber beginWork
3. div Fiber beginWork
4. "i am" Fiber beginWork
5. "i am" Fiber completeWork
6. span Fiber beginWork
7. span Fiber completeWork
8. div Fiber completeWork
9. App Fiber completeWork
10. rootFiber completeWork
```

## “递”阶段 - beginWork

[源码在此](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3075)

`beginWork`的工作是传入`当前Fiber`节点，根据`fiber.tag`来创建其`子Fiber`节点。并为Fiber节点带上`effectTag`属性。

beginWork的工作可以分为两部分：

- **update时**：如果`current`存在，在**满足一定条件时可以复用current节点**，这样就能克隆current.child作为workInProgress.child，而不需要新建workInProgress.child。
- **mount时**：除`fiberRootNode`以外，current === null。会根据`fiber.tag（组件类型，类组件、函数组件...）`不同，进入不同类型Fiber的创建逻辑。根据不同的tag，来创建当前fiber节点的第一个`子Fiber节点`。
  
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

### reconcileChildren
  
通过current === null 区分mount与update

- 对于**mount**的组件，他会创建新的`子Fiber节点`。调用`mountChildFibers`方法
- 对于**update**的组件，他会将当前组件与该组件在上次更新时对应的Fiber节点比较（也就**Diff**算法:heavy_exclamation_mark: ，详见[《React核心原理2-diff》](..React%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86React%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%862-diff.md)），将比较的结果生成新Fiber点。调用`reconcileChildFibers`方法，会为Fiber节点带上`effectTag`属性。

不论走哪个逻辑，最终他会生成`新的子Fiber节点`并赋值给`workInProgress.child`，作为本`beginWork`返回值，并作为下次`performUnitOfWork`执行时`workInProgress`的传参。

### effectTag

它表示，Render阶段结束后，通知Render（渲染器）要执行的DOM操作类型。保存在`fiber.effectTag`上。
  
  ```js
  // DOM需要插入到页面中
  export const Placement = /*                */ 0b00000000000010;
  // DOM需要更新
  export const Update = /*                   */ 0b00000000000100;
  // DOM需要插入到页面中并更新
  export const PlacementAndUpdate = /*       */ 0b00000000000110;
  // DOM需要删除
  export const Deletion = /*                 */ 0b0000000000100
  ...
  ```

### 总结

`beginWork`的工作是传入`当前Fiber`节点，根据`fiber.tag`来创建其`子Fiber`节点。并为Fiber节点带上`effectTag`属性。

<img src='./pictures/beginWork.png'/>

## "归"阶段 - completeWork

`completeWork`也是针对不同`fiber.tag(组件类型，类组件、函数组件...）`调用不同的处理逻辑。

```js
function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      return null;
    case ClassComponent: {
      // ...省略
      return null;
    }
    case HostRoot: {
      // ...省略
      updateHostContainer(workInProgress);
      return null;
    }
    case HostComponent: {
      // ...省略
      return null;
    }
  // ...省略
```

### HostComponen如何处理

我们重点关注页面渲染所必须的`HostComponent`（即原生DOM组件对应的Fiber节点）

和`beginWork`一样，根据`current === null ?`判断是`mount`还是`update`。

- `update`时：Fiber节点已经存在对应`DOM节点`，所以不需要生成DOM节点。主要工作是`updateHostComponent`调用处理`props`，比如：
  - onClick、onChange等回调函数的注册
  - 处理style prop
  - 处理DANGEROUSLY_SET_INNER_HTML prop
  - 处理children prop
  
  ```js
  if (current !== null && workInProgress.stateNode != null) {
    // update的情况
    updateHostComponent(
      current,
      workInProgress,
      type,
      newProps,
      rootContainerInstance,
    );
  }
  ```

  在`updateHostComponent`内部，被处理完的props会被赋值给`workInProgress.updateQueue`，并最终会在`commit阶段`被渲染在页面上。
- `mount`时：主要有以下三个逻辑
  - 为Fiber节点生成对应的`DOM节点`
  - 将子孙DOM节点插入刚生成的DOM节点中
  - 与update逻辑中的`updateHostComponent`类似的处理props的过程

### `effectList`

> `effectTag`表示`Fiber`节点在`commit阶段`要执行的**Dom操作**。

作为DOM操作的依据，commit阶段需要找到所有有effectTag的Fiber节点并依次执行effectTag对应操作。难道需要在commit阶段再**遍历**一次Fiber树寻找effectTag !== null的Fiber节点么？

这显然是很低效的。

为了**高效**的找到有effectTag的节点，在completeWork的上层函数`completeUnitOfWork`中，每个执行完completeWork且存在`effectTag`的Fiber节点会被保存在一条被称为`effectList`的**单向链表**中。最终形成一条以rootFiber.firstEffect为起点的单向链表。

```js
                       nextEffect         nextEffect
rootFiber.firstEffect -----------> fiber -----------> fiber
```

这样，在`commit阶段`只需要遍历`effectList`就能执行所有`effect`了。

### 总结

completeWork的目的就是为了`创建对应的dom节点`插入对应的`父级节点`的dom节点, 为其添加`副作用`标识。

<img src='./pictures/completeWork.png'/>

# commit阶段

在`rootFiber.firstEffect`上保存了一条`需要执行副作用`的Fiber节点的单向链表effectList，这些Fiber节点的`updateQueue`中保存了变化的props。

一些`副作用`对应的DOM操作、一些生命周期钩子（componentDidXXX）、某些hook（useEffect）都在commit阶段执行

commit阶段的主要工作（即Renderer的工作流程）分为三部分：

- `before mutation`阶段（执行DOM操作前）
- `mutation`阶段（执行DOM操作）
- `layout`阶段（执行DOM操作后）

另外，

- 在before mutation之前：主要做一些变量赋值，状态重置的工作。
- 在layout阶段之后：
  1. useEffect相关处理
  2. 性能追踪相关
  3. 执行同步任务, 比如在 componentDidMount 中执行 setState 创建的更新会在这里被同步执行, useLayoutEffect、useEffect的回调方法也会在这里被执行

## before mutation阶段（执行DOM操作前）

在before mutation阶段，会遍历`effectList`（保存effectTag的单向链表），并调用`commitBeforeMutationEffects`函数，依次执行：

1. 处理DOM节点渲染/删除后的 autoFocus、blur逻辑
2. 调用`getSnapshotBeforeUpdate`生命周期钩子
   > 从Reactv16开始，`componentWillXXX`钩子前增加了`UNSAFE_`前缀。但提供了替代的生命周期钩子 `getSnapshotBeforeUpdate`。
3. 调度`useEffect`
   ```
   // 调度useEffect
   if ((effectTag & Passive) !== NoEffect) {
     if (!rootDoesHavePassiveEffects) {
       rootDoesHavePassiveEffects = true;
       scheduleCallback(NormalSchedulerPriority, () => {
         // 触发useEffect
         flushPassiveEffects();
         return null;
       });
     }
   }
   ```
   `scheduleCallback`方法由`Scheduler`模块提供，用于以某个**优先级异步调度一个回调函数**。异步调度主要是防止同步执行时阻塞浏览器渲染。

## mutation阶段（执行DOM操作）

mutation阶段会遍历 `effectList`，依次执行`commitMutationEffects`。该方法的主要工作为根据`effectTag`调用不同的处理函数`处理Fiber`，执行DOM操作。

对每个`Fiber`节点执行如下三个操作：

- 根据`ContentReset effectTag`重置文字节点
- 更新`ref`
- 根据`effectTag`分别处理，其中effectTag包括(`Placement` | `Update` | `Deletion` | `Hydrating`等)

### Placement effect

含有`Placement effectTag`，意味着该Fiber节点对应的DOM节点需要**插入**到页面中。调用的方法为`commitPlacement`。

该方法所做的工作分为三步：

1. 获取父级DOM节点。其中finishedWork为传入的Fiber节点。

   ```js
   const parentFiber = getHostParentFiber(finishedWork);
   // 父级DOM节点
   const parentStateNode = parentFiber.stateNode;
   ```

2. 获取Fiber节点的DOM兄弟节点

   ```js
   const before = getHostSibling(finishedWork);
   ```

3. 根据DOM兄弟节点是否存在决定调用`parentNode.insertBefore`或`parentNode.appendChild`执行DOM插入操作。

### Update effect

含有`Update effectTag`，意味着该Fiber节点需要**更新**。调用的方法为`commitWork`，他会根据Fiber.tag分别处理。

### Deletion effect

含有`Deletion effectTag`，意味着该Fiber节点对应的DOM节点需要从页面中**删除**。调用的方法为`commitDeletion`。

该方法会执行如下操作：

1. 递归调用`Fiber节点`及其子孙Fiber节点中fiber.tag为`ClassComponent`的`componentWillUnmount`生命周期钩子，从页面**移除**Fiber节点对应DOM节点
2. 解绑ref
3. 调度`useEffect`的销毁函数

## layout阶段（执行DOM操作后）

layout阶段也会遍历 `effectList`，依次执行`commitLayoutEffects`。该方法的主要工作为根据`effectTag`调用不同的处理函数`处理Fiber`并更新`ref`。

`commitLayoutEffects`一共做了两件事：

1. `commitLayoutEffectOnFiber`（调用生命周期钩子和hook相关操作）
   - 对于`ClassComponent`，他会通过`current === null?`区分是`mount`还是`update`，调用`componentDidMount`或`componentDidUpdate`。
   触发状态更新的`this.setState`如果赋值了**第二个参数回调函数**，也会在此时调用。

       ```js
       this.setState({ xxx: 1 }, () => {
         console.log("i am update~");
       });
       ```

    - 对于`FunctionComponent`及`相关类型`，他会调用`useLayoutEffect hook`的回调函数，调度`useEffect`的销毁与回调函数
        > `相关类型`指特殊处理后的FunctionComponent，比如ForwardRef、React.memo包裹的FunctionComponent
2. `commitAttachRef`（赋值 ref）: **获取DOM实例，更新ref**

另外，在`layout`阶段，**workInProgress Fiber树在commit阶段完成渲染后会变为current Fiber树**。
