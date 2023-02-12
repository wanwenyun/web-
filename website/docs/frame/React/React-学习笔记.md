React 篇（建议可以从第四点的 reack-hooks 学习大全开始看）

# 了解 useCallback、useMemo、React.memo 的使用时机

> 学习地址： <https://juejin.cn/post/7010278471473594404、https://juejin.cn/post/6844904001998176263>

# React.useRef

**基础用法：**`const valueRef = useRef(value);`

**useRef 特性：**

- 组件重新渲染（在组件的整个生命周期内），useRef 的引用仍*不会改变*；

- useRef 的改变不会让组件重新渲染（render）；

- useRef 能够获取到`dom`；
