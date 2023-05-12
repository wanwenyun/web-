- [useState与useReducer](#usestate与usereducer)
- [useEffct与useLayoutEffect](#useeffct与uselayouteffect)
- [useRef](#useref)
  - [介绍](#介绍)
  - [ref的工作流程](#ref的工作流程)
- [useImperativeHandle](#useimperativehandle)
- [useMemo与useCallBack](#usememo与usecallback)

# useState与useReducer

本质来说，`useState`只是预置了`reducer`的`useReducer`。

# useEffct与useLayoutEffect

- `useEffect`属于异步执行，并不会等待 DOM 真正渲染后执行（**commit阶段，before mutation阶段（执行DOM操作前）**），

- `useLayoutEffect`则会真正渲染后才触发（**commit阶段，layout阶段（执行DOM操作后）**）；可以获取更新后的 state；

`useEffect`异步执行的优点是，**react渲染组件**不必等待useEffect函数执完毕，造成阻塞。
例如，下面的代码，组件就会渲染两次。
```js
import ReactDom from "react-dom";
import React, {useEffect, useLayoutEffect, useState} from  "react";
const App = () => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (value === 0) {
            setValue(10 + Math.random() * 200);
        }
    }, [value]);
    console.log("render", value);
    return (
        <div onClick={() => setValue(0)}>
            value: {value}
        </div>
    );
};
ReactDom.render(
    <App />,
    document.getElementById("root")
);
```

当你点击div时，会出现短暂的闪烁，屏幕上会先出现0，然后出现useEffect中设定数字，但是使用useLayoutEffect则不会出现闪烁的情况，屏幕上会直接显示设定的字。

# useRef

## 介绍

`ref`是reference（引用）的缩写。在React中，我们习惯用ref保存`DOM`。

事实上，任何需要被"引用"的数据都可以保存在ref中，useRef的出现将这种思想进一步发扬光大。

ref作为一种数据结构，有三种类型:

- string：不推荐使用
- function
- {currents: any}

与其他Hook一样，对于`mount`与`update`，useRef对应两个不同dispatcher。

```
function mountRef<T>(initialValue: T): {|current: T|} {
  // 获取当前useRef hook
  const hook = mountWorkInProgressHook();
  // 创建ref
  const ref = {current: initialValue};
  hook.memoizedState = ref;
  return ref;
}

function updateRef<T>(initialValue: T): {|current: T|} {
  // 获取当前useRef hook
  const hook = updateWorkInProgressHook();
  // 返回保存的数据
  return hook.memoizedState;
}
```

useRef仅仅是返回一个包含`current属性`的对象。

## ref的工作流程

在React中，HostComponent、ClassComponent、ForwardRef可以赋值`ref`属性。ref是用来获取真实dom元素或者是组件实例的属性。

```js
// HostComponent
<div ref={domRef}></div>
// ClassComponent / ForwardRef
<App ref={cpnRef} />
```

我们知道`HostComponent`在`commit`阶段的`mutation`阶段执行`DOM`操作。

所以，对应`ref`的更新也是发生在`mutation`阶段。

再进一步，mutation阶段执行DOM操作的依据为effectTag。

所以，对于HostComponent、ClassComponent如果包含ref操作，那么也会赋值相应的effectTag。

```js
// ...
export const Placement = /*                    */ 0b0000000000000010;
export const Update = /*                       */ 0b0000000000000100;
export const Deletion = /*                     */ 0b0000000000001000;
export const Ref = /*                          */ 0b0000000010000000;
// ...
```

所以，ref的工作流程可以分为两部分：

1. `render`阶段为含有`ref`属性的`fiber`添加`Ref effectTag`
   组件对应fiber被赋值Ref effectTag需要满足的条件：:
   - 对于`mount`，`workInProgress.ref !== null`，即存在ref属性
   - 对于`update`，`current.ref !== workInProgress.ref`，即ref属性改变
2. `commit`阶段为包含`Ref effectTag`的`fiber`执行对应操作

# useImperativeHandle

子组件利用`useImperativeHandle`可以让父组件输出任意数据。


# useMemo与useCallBack
