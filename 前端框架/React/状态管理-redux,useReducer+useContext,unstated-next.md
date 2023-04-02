- [redux](#redux)
- [useReducer+useContext](#usereducerusecontext)
  - [例子：](#例子)
- [unstated-next](#unstated-next)
  - [使用](#使用)
  - [源码](#源码)
- [Recoil](#recoil)

# redux

# useReducer+useContext

**实现原理：**

1. 用 useContext 实现“获取全局数据”
2. 用 useReducer 实现“修改全局数据”

**实现思路：**

1. 用React.createContext()定义一个全局数据对象；
2. 在父组件中用 useReducer 定义全局变量xx和负责抛出修改事件的dispatch；
3. 在父组件之外，定义负责具体修改全局变量的处理函数reducer，根据修改xx事件类型和参数，执行修改xx的值；
4. 在父组件中用 `<XxxContext.Provider value={\{Xxx, dispathch\}}>` 标签把 全局共享数据和负责抛出修改xx的dispatch 暴露给子组件；
5. 在子组件中用 useContext 获取全局变量；
6. 在子组件中用 xxContext.dispatch 去抛出修改xx的事件，携带修改事件类型和参数；

## 例子：

共享对象 代码如下：

```  js
import React from 'react';
const CountContext = React.createContext();
export default CountContext;
```

父组件代码如下：

```js
import React, { useReducer } from 'react';
import CountContext from './CountContext';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

const initialCount = 0; //定义count的默认值

//修改count事件处理函数，根据修改参数进行处理
function reducer(state, action) {
//注意这里先判断事件类型，然后结合携带的参数param 来最终修改count
switch (action.type) {
    case 'add':
        return state + action.param;
    case 'sub':
        return state - action.param;
    case 'reset':
        return initialCount;
    default:
        console.log('what?');
        return state;
}
}

function ParentComponent() {
  //定义全局变量count，以及负责抛出修改事件的dispatch
  const [count, dispatch] = useReducer(reducer, initialCount);

  //请注意：value={{count,dispatch} 是整个代码的核心，把将count、dispatch暴露给所有子组件
  return <CountContext.Provider value={{count,dispatch}}>
    <div>
        ParentComponent - count={count}
        <ComponentA />
        <ComponentB />
    </div>
  </CountContext.Provider>
}

export default ParentComponent;
```

子组件A 代码如下：

```js
import React,{ useState, useContext } from 'react';
import CountContext from './CountContext';

function CopmpoentA() {
  const [param,setParam] = useState(1);
  //引入全局共享对象，获取全局变量count，以及修改count对应的dispatch
  const countContext = useContext(CountContext);

  const inputChangeHandler = (eve) => {
    setParam(eve.target.value);
  }

  const doHandler = () => {
    //若想修改全局count，先获取count对应的修改抛出事件对象dispatch，然后通过dispatch将修改内容抛出
    //抛出的修改内容为：{type:'add',param:xxx}，即告诉count的修改事件处理函数，本次修改的类型为add，参数是param
    //这里的add和param完全是根据自己实际需求自己定义的
    countContext.dispatch({type:'add',param:Number(param)});
  }

  const resetHandler = () => {
    countContext.dispatch({type:'reset'});
  }

  return <div>
        ComponentA - count={countContext.count}
        <input type='number' value={param} onChange={inputChangeHandler} />
        <button onClick={doHandler}>add {param}</button>
        <button onClick={resetHandler}>reset</button>
    </div>
}

export default CopmpoentA;
```

# unstated-next

`unstated-next`这个库只做了一件事情：

提供 createContainer 将自定义 Hooks 封装为一个数据对象，提供 Provider 注入与 useContainer 获取 Store 这两个方法。

在store中保存两个内容：

1. states
2. 可以修改states的方法.

## 使用

```js
import React, { useState } from "react"
import { createContainer } from "unstated-next"
import { render } from "react-dom"
 
function useCounter(initialState = 0) {
  let [count, setCount] = useState(initialState)
  let decrement = () => setCount(count - 1)
  let increment = () => setCount(count + 1)
  return { count, decrement, increment }
}
 
let Counter = createContainer(useCounter)
 
function CounterDisplay() {
  let counter = Counter.useContainer()
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <span>{counter.count}</span>
      <button onClick={counter.increment}>+</button>
    </div>
  )
}
 
function App() {
  return (
    <Counter.Provider>
      <CounterDisplay />
      <Counter.Provider initialState={2}>
        <div>
          <div>
            <CounterDisplay />
          </div>
        </div>
      </Counter.Provider>
    </Counter.Provider>
  )
}
 
render(<App />, document.getElementById("root"))
```

## 源码



```js
export function createContainer(useHook) {
  let Context = React.createContext(null);

  function Provider(props) {
    let value = useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  function useContainer() {
    let value = React.useContext(Context); // 用 useContext 实现“获取全局数据”
    if (value === null) {
      throw new Error("Component must be wrapped with <Container.Provider>");
    }
    return value;
  }

  return { Provider, useContainer };
}
```

# Recoil

https://recoiljs.org/docs/introduction/getting-started