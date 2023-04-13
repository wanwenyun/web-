- [概览](#概览)
- [Fiber架构](#fiber架构)
- [Scheduler调度器的原理与实现](#scheduler调度器的原理与实现)

# 概览

`Concurrent` 模式是一组 React 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整。由于有以下三部分底层架构的支持，才使得Concurrent模式得以实现：

- **Fiber架构**：意义在于，他将单个组件作为工作单元，使以组件为粒度的“异步可中断的更新”成为可能。
- **Scheduler调度器**：当我们配合`时间切片`，就能根据宿主环境性能，为每个工作单元分配一个可运行时间，实现**异步可中断的更新**。
  
  于是，`scheduler`（调度器）产生了。
- **lane模型**：用于控制不同`优先级`之间的关系与行为。

从源码层面讲，Concurrent Mode是一套可控的**多优先级更新架构**。以下是基于Concurrent Mode的新功能。

- `batchedUpdates`：合并多个“更新”的优化方式，以优先级为依据对更新进行合并的
- `Suspense`：可以在组件请求数据时展示一个`pending`状态。请求成功后渲染数据。本质上讲Suspense内的组件子树比组件树的其他部分拥有更低的优先级。
- `useDeferredValue`：返回一个延迟响应的值，该值可能“延后”的最长时间为`timeoutMs`。

   ```js
   const deferredValue = useDeferredValue(value, { timeoutMs: 2000 });
   ```
   在useDeferredValue内部会调用useState并触发一次更新。

   这次更新的优先级很低，所以当前如果有正在进行中的更新，不会受useDeferredValue产生的更新影响。所以useDeferredValue能够返回延迟的值。

# Fiber架构

详见[《React核心原理1-基础知识(React15、fiber架构)》](./React%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%861-%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86(React15%E3%80%81fiber%E6%9E%B6%E6%9E%84).md)

# Scheduler调度器的原理与实现

Scheduler包含两个功能

- 时间切片
- 优先级调度

