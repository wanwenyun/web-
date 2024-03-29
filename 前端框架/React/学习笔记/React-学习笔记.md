- [怎么理解React的副作用？](#怎么理解react的副作用)
- [了解useCallback、useMemo、React.memo的使用时机](#了解usecallbackusememoreactmemo的使用时机)
- [React.useRef](#reactuseref)
- [react ref属性 和 Refs](#react-ref属性-和-refs)
- [react 生命周期 和hooks](#react-生命周期-和hooks)
- [reack-hooks](#reack-hooks)
  - [*useState*](#usestate)
  - [*useEffect*](#useeffect)
  - [*useContext*](#usecontext)
    - [基本使用方法：](#基本使用方法)
    - [父组件同时传递多个共享数据值给1个子组件：](#父组件同时传递多个共享数据值给1个子组件)
    - [为什么不使用Redux？](#为什么不使用redux)
  - [*useReducer*](#usereducer)
    - [基础用法：](#基础用法)
    - [使用useContext和useReducer实现操作全局共享数据](#使用usecontext和usereducer实现操作全局共享数据)
  - [*useCallback、useMemo*](#usecallbackusememo)
  - [*useRef*](#useref)
  - [*useImperativeHandle*](#useimperativehandle)
  - [*useLayoutEffect*](#uselayouteffect)
  - [*useDebugValue*](#usedebugvalue)
- [自定义hook和CF(common function)的区别](#自定义hook和cfcommon-function的区别)
- [有状态组件、无状态组件](#有状态组件无状态组件)
- [react-redux在类组件中的使用（比较老的用法，但是公司老旧项目会有）](#react-redux在类组件中的使用比较老的用法但是公司老旧项目会有)
- [React 类组件和函数组件的区别](#react-类组件和函数组件的区别)
- [React错误边界](#react错误边界)
- [context](#context)
- [React 性能优化手段](#react-性能优化手段)
- [React事件绑定原理](#react事件绑定原理)
- [React 虚拟dom渲染原理 和 Diff 原理](#react-虚拟dom渲染原理-和-diff-原理)
- [React 的 render 异常处理机制](#react-的-render-异常处理机制)

React篇（建议可以从第5点的reack-hooks学习大全开始看）

# 怎么理解React的副作用？
副作用（Side effect）指一个function做了和本身运算返回值无关的事。比如：修改了全局变量、修改了入参、console.log()等等

比较经典的`ajax操作`、`修改dom`都是副作用.

# 了解useCallback、useMemo、React.memo的使用时机

>学习地址： https://juejin.cn/post/7010278471473594404、https://juejin.cn/post/6844904001998176263

# React.useRef

**基础用法：**`const valueRef = useRef(value);`

**useRef特性：**

* 组件重新渲染（在组件的整个生命周期内），useRef的引用仍*不会改变*；

* useRef的改变不会让组件重新渲染（render）；

* useRef能够获取到`dom`；

```js
import { useRef,useEffect } from "react";
export default function App() {
    const ref = useRef() // 和dom节点绑在一起，不需要初始值
    useEffect(()=>{
        console.log(ref.current); // 打印结果：<div>ref获取dom</div>
    },[])
    return (
        <div>
            <div ref={ref}>ref获取dom</div>
        </div>
    )
}
```

`useRef`和`createRef`两者都可以去获取dom，但是createRef在组件每次渲染都会重新调用一次createRef，而useRef并不会。

**使用场景：**

1. 保持分页状态，将pageNo和pageSize可以存在useRef里

   在分页的table里面做了些操作（比如说添加），然后添加完，当要refresh这个组件时不想从第一页开始继续查看，这时候可以从useRef里取到重渲染前的页码。

>学习地址：[https://www.jb51.net/article/209497.html](https://www.jb51.net/article/209497.html) 、[https://codeantenna.com/a/rxsWJmuOgR](https://codeantenna.com/a/rxsWJmuOgR)

# react ref属性 和 Refs

# react 生命周期 和hooks

旧生命周期：

![img](./picture/React-学习笔记.assets/e12b2e35c8444f19b795b27e38f4c149~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0-20220412124530318.awebp)

新生命周期：（v16.3）

![截屏2022-04-12 下午12.02.50](./picture/React-学习笔记.assets/1.png)


废弃了`componentWillMount componentWillReceiveProps componentWillUpdate` 这三个生命周期钩子函数。

并为他们取了别名`UNSAFE_componentWillMount UNSAFE_componentWillReceiveProps UNSAFE_componentWillUpdate`。

|  class组件   | hooks组件  |  作用  |
|  ----  | ----  | ----  |
| constructor  | useState |  初始化state  |
| getDerivedStateFormProps  | useState返回的更新state的函数 |  更新state  |
| shouldComponentUpdate  | useMemo |  指定的state发生改变时才更新组件  |
| render  | 无 |  渲染dom，返回reactDom（不能在render中执行setState，否则会触发死循环导致内存崩溃）  |
| getSnapshotBeforeUpdate  | useRef |  访问Dom  |
| componentDidMount  | useEffect |  组件挂载后执行  |
| componentDidUpdate  | useEffect |  组件更新后执行  |
| componentWillUnmount  | useEffect里面返回的函数 |  卸载之前执行  |


>参考链接 [https://juejin.cn/post/6914112105964634119](https://juejin.cn/post/6914112105964634119)



# reack-hooks
> 学习地址 https://github.com/puxiao/react-hook-tutorial
**Hooks规则、特性：**
* Hooks只能运行在函数组件中，不能运行在类组件中。只能运行在函数组件的“内部顶层中”。

    Hooks不能运行在if/for等其他函数的代码体内，不允许被if/for等包裹住。
    
    可以在React的函数组件中调用Hooks，可以在自定义Hooks中调用其他Hooks。

* Hooks函数必须为纯函数

    所谓纯函数就是函数内部不能修改可能影响执行结果的任意参数，确保每次执行的代码结果都是一样的

* 尽管函数组件拥有了类组件多大多数的相似特性，但有一点除外：函数组件中没有类组件中“自定义state”的特性，因此你无法在函数组件中使用“this.state.xx”这样的代码

    没有不代表功能的缺失，恰恰相反，因为当你充分了解Hooks之后，你会发现函数组件内部自定义数据状态功能远远超出类组件

* hooks可以实现全局共享数据，代替Redux。

**hooks优势：**
hooks的出现可以解决一些类组件的缺点，比如：
1. 复杂且不容易理解的“this”
2. 类组件组件数据状态逻辑不能重用。
通过自定义Hook，可以数据状态逻辑从组件中抽离出去，这样同一个Hook可以被多个组件使用，解决组件数据状态逻辑并不能重用的问题。
3. 组件之间传值过程复杂、复杂场景下代码难以组织在一起。
通过React内置的`useState()、useEffect()`函数分别可以降低state复杂度和可维护性、将多个生命周期函数关联成一个处理函数。

## *useState*
useState能够解决类组件 所有自定义变量只能存储在this.state 的问题。

类组件定义state：
```js
constructor(props) {
    super(props);
    this.state = {
      name:'wanwan',
      age:18
    }
}
```
函数组件使用useState：（基本使用方法）
```js
// state为简单类型
const [name,setName] = useState('wanwan');
const [age,setAge] = useState(18);

//state为object
const [person, setPerson] = useState({name:'wanwan',age:18});
//修改person的age属性的正确姿势
setPerson({...person,age:18});
```

需要注意，类组件中setState赋值过程是异步的，同样在Hook中 setXxx 赋值也是`异步的`。例如：
```js
function Component() {
  const initCount = 0;
  const [count, setCount] = useState(initCount);
  const change = (value) => {
    for(let i=0; i<3; i++){
        setCount(value+1);
    }
  }

  return <div>
    {count}
    <button onClick={() => {change(initCount)}}>init</button>
  </div>
}
export default Component;
```
通过for循环，执行了3次setCount(count+1)，那么你觉得count会 +3 吗？

答案是：肯定不会。无论for循环执行几次，最终实际结果都将是仅仅执行一次 +1。


虽然执行了3次setCount(count+1)，可是每一次修改后的count并不是立即生效的。当第2次和第3次执行时获取到count的值和第1次获取到的count值是一样的，所以最终其实相当于仅执行了1次。

解决方法：`不直接赋值，而是采用“箭头函数返回值的形式”赋值。`
```js
const change = (value) => {
    for(let i=0; i<3; i++){
        setCount(prevData => prevData+1);
    }
  }
```

state最好避免使用复杂类型的值：
1. 对于简单类型的值，例如String、Number 新旧值一样的情况下是不会引起重新渲染的；
2. 对于复杂类型的值，即使新旧值 “看上去是一样的” 也会引起`重新渲染`。除非新旧值指向同一个对象，或者可以说成新旧值分别是同一个对象的引用；


## *useEffect*
他的作用是“勾住”函数组件中某些生命周期函数。例如`componentDidMount`(组件被挂载完成后)、`componentDidUpdate`(组件重新渲染完成后)、`componentWillUnmount`(组件即将被卸载前)

useState可以修改数据，数据变更会触发组件重新渲染，上面3个就是和组件渲染关联最紧密的生命周期函数。

`useEffect(effect,[deps])`函数可以传入2个参数，第1个参数为我们定义的执行函数、第2个参数是依赖关系(可选参数)。若一个函数组件中定义了多个useEffect，那么他们实际执行顺序是按照在代码中定义的先后顺序来执行的。
使用方式:
```js
useEffect(() => {
    //此处编写 组件挂载之后和组件重新渲染之后执行的代码
    ...

    return () => {
        //此处编写 组件即将被卸载前执行的代码
        ...
    }
},[deps])
```
1. effect 函数主体内容中的代码，就是组件挂载之后和组件重新渲染之后你需要执行的代码；
2. effect 函数 return 出去的返回函数主体内容中的代码，就是组件即将被卸载前你需要执行的代码；
3. 第2个参数 [deps]，为可选参数，若有值则向React表明该useEffect是依赖哪些变量发生改变而触发的；

`effect`补充说明
1. 若你不需要在组件卸载前执行任何代码，那么可以忽略不写 effect 中的 return相关代码；

`[deps]`补充说明：
1. 若缺省，则组件挂载、组件重新渲染、组件即将被卸载前，每一次都会触发该useEffect；
2. 若传值，则必须为数组，数组的内容是函数组件中通过useState自定义的变量或者是父组件传值过来的props中的变量，告诉React只有数组内的变量发生变化时才会触发useEffect；
3. 若传值，但是传的是`空数组[]`，则表示该useEffect里的内容仅会在“挂载完成后和组件即将被卸载前”执行一次；



useEffect还可以用来解决类组件某些执行代码被分散在不同的生命周期函数中的问题。

例如：
举例1：若某类组件中有变量a，默认值为0，当组件第一次被挂载后或组件重新渲染后，将网页标题显示为a的值。

在类组件中：
```js
//为了更加清楚看到每次渲染，我们在网页标题中 a 的后面再增加一个随机数字
componentDidMount(){
    document.title = `${this.state.a} - ${Math.floor(Math.random()*100)}`;
}
componentDidUpdate(){
    document.title = `${this.state.a} - ${Math.floor(Math.random()*100)}`;
}
```
相同的代码需要在componentDidMount、componentDidUpdate中写两次。

在函数组件中使用useEffect：
```js
import React, { useState,useEffect} from 'react';

function Component() {
  const [a, setA] = useState(0);//定义变量a，并且默认值为0
  useEffect(() => {
      //无论是第一次挂载还是以后每次组件更新，修改网页标题的执行代码只需要在这里写一次即可
      document.title = `${a} - ${Math.floor(Math.random()*100)}`;
  })
  const clickAbtHandler = (eve) =>{
      setA(a+1);
  }
  return <div>
      {a}
      <button onClick={clickAbtHandler}>a+1</button>
    </div>
}

export default Component;
```
参考链接： [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

## *useContext*
它的作用是“勾住”获取由React.createContext()创建、<XxxContext.Provider>添加设置的共享数据value值。useContext可以替代<XxxContext.Consumer>标签，简化获取共享数据的代码。

我们知道，原本不同级别的组件之间传递属性值，必须逐层传递，即使中间层的组件不需要这些数据。

在旧版的react中，可以通过以下方式进行数据传递：[参考链接](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext)

1. 在组件顶层或单独的模块中，由React.createContext()创建一个共享数据对象；
2. 在父组件中添加共享数据对象的引用，通过且只能通过`<XxxContext.provider value={{xxx}}></XxxContext.provider>`的形式将数据传递给子组件。
3. 若某一层的子组件需要用到共享数据对象的数据，则可通过`<XxxContext.Consumer></XxxContext.Consumer>`获取到数据；
4. 在类组件中除了`<XxxContext.Consumer>`标签，还有另外一种获取共享数据方式：`static xxx = XxxContext`; 但是这种形式在函数组件中无法使用。

**`useContext`是`<XxxContext.Consumer>`的替代品，可以大量简化获取共享数据值的代码。**

### 基本使用方法：
```js
import GlobalContext from './global-context'; //引入共享数据对象

function Component(){
  const global = useContext(GlobalContext); //在函数组件中声明一个变量来代表该共享数据对象的value值
  //若想获取共享数据对象中的属性xxx的值，直接使用global.xxx即可
  return <div>
    {global.xxx}
  </div>
}
```
需要注意的是，这里执行的依然是`单向数据流`，只可以获取global.xx，不可以直接更改global.xx。

### 父组件同时传递多个共享数据值给1个子组件：
```js
  import React, { useContext } from 'react';

  const UserContext = React.createContext();
  const NewsContext = React.createContext();

  function AppComponent() {
    return (
      <UserContext.Provider value={{name:'puxiao'}}>
          <NewsContext.Provider value={{title:'Hello React Hook.'}}>
              <ChildComponent />
          </NewsContext.Provider>
      </UserContext.Provider>
    )
  }

  function ChildComponent(){
    const user = useContext(UserContext);
    const news = useContext(NewsContext);
    return <div>
      {user.name} - {news.title}
    </div>
  }

  export default AppComponent;
```
1. 父组件同时要实现传递2个共享数据对象value值，需要使用<XxxContext.Provider value={obj}>标签进行2次嵌套。
2. 子组件使用了useContext，他可以自由随意使用父组件传递过来的共享数据value，并不需要多次嵌套获取。


### 为什么不使用Redux？
在Hook出现以前，React主要负责视图层的渲染，并不负责组件数据状态管理，所以才有了第三方Redux模块，专门来负责React的数据管理。

但是自从有了Hook后，使用React Hook 进行函数组件开发，实现数据状态管理变得切实可行。只要根据实际项目需求，使用useContext以及下一章节要学习的useReducer，一定程度上是可以满足常见需求的。

`但useContext不能完全替代redux`，因为Context不支持只订阅Context中局部的value，只要context valve一变，所有依赖了此Context的组件就全部render。

## *useReducer*
useReducer是useState的升级版(实际上应该是原始版)，可以实现复杂逻辑修改，而不是像useState那样只是直接赋值修改。

当state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等场景下，更适合用useReducer。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。

### 基础用法：

`const [state, dispatch] = useReducer(reducer, initialArg, init);`

```js
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}
const initialState = {count: 0};
function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init); // 惰性初始化:将 init 函数作为 useReducer 的第三个参数传入，这样初始 state 将被设置为 init(initialArg)
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

### 使用useContext和useReducer实现操作全局共享数据
> 参考链接：https://github.com/puxiao/react-hook-tutorial/blob/master/09%20useReducer%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95.md

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


在运营活动的项目中（qcact-base）也是采用了这样的方式来实现状态管理，父组件将dispatch包装在相应的方法内并暴露给子组件，当子组件执行了父组件提供的方法，就会触发相应的dispatch。

所以，`使用 useReducer + useContext 可以完全替代redux`。

> Recoil、dobux状态管理工具. .
## *useCallback、useMemo*
`useCallback`他的作用是“勾住”组件属性中某些处理函数，创建这些函数对应在react原型链上的变量引用。useCallback第2个参数是处理函数中的依赖变量，只有当依赖变量发生改变时才会重新修改并创建新的一份处理函数。
```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
在a和b的变量值不变的情况下，memoizedCallback的引用不变。即：useCallback的第一个入参函数会被缓存，从而达到渲染性能优化的目的。

`useMemo`他的作用是“减少组件重新渲染时不必要的函数计算”。
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
在a和b的变量值不变的情况下，memoizedValue的值不变。即：useMemo函数的第一个入参函数不会被执行，从而达到节省计算量的目的。

> https://juejin.cn/post/6844904001998176263

## *useRef*
他的作用是“勾住”某些组件挂载完成或重新渲染完成后才拥有的某些对象，并返回该对象的引用。且保证该引用在组件整个生命周期内`固定不变`，都能准确找到我们要找的对象。

`某些对象`主要分为3种：
1. JSX组件转换后对应的真实DOM对象
    
    useRef只能“勾住”小写开头的类似原生标签的组件，自定义组件（大写开头的）无法使用useRef。
2. 在useEffect中创建的变量
3. 子组件内自定义的函数(方法)

    由于需要结合useImperativeHandle才可以实现

*<u>主动修改 useRef变量的.current 的值并不会触发组件重新渲染</u>*

接下来具体说说useRef关联对象的2种用法：
1. 针对 JSX组件，通过属性 ref={xxxRef} 进行关联。
2. 针对 useEffect中的变量，通过 xxxRef.current 进行关联。
```js
//先定义一个xxRef引用变量，用于“勾住”某些组件挂载完成或重新渲染完成后才拥有的某些对象
const xxRef = useRef(null);
//针对 JSX组件，通过属性 ref={xxxRef} 进行关联
<xxx ref={xxRef} />
//针对 useEffect中的变量，通过 xxxRef.current 进行关联
useEffect(() => {
    xxRef.current = xxxxxx;
},[]);
```

适用场景：
1. 自动获得输入框的输入焦点

    思路：需要使用useRef “勾住”这个输入框，当它被挂载到网页后，通过操作原生html的方法，将焦点赋予该输入框上。
    ```js
    import React,{useEffect,useRef} from 'react'

    function Component() {
      //先定义一个inputRef引用变量，用于“勾住”挂载网页后的输入框
      const inputRef = useRef(null);

      useEffect(() => {
        //inputRef.current就是挂载到网页后的那个输入框，一个真实DOM，因此可以调用html中的   方法focus()
        inputRef.current.focus();
      },[]);

      return <div>
          {/* 通过 ref 属性将 inputRef与该输入框进行“挂钩” */}
          <input type='text' ref={inputRef} />
        </div>
    }
    export default Component
    ```
    注意：1. 在给组件设置 ref 属性时，只需传入 inputRef，千万不要传入 inputRef.current。2. 在“勾住”渲染后的真实DOM输入框后，能且只能调用原生html中该标签拥有的方法。
2. 可以用useRef控制只想在组件生命周期内只想执行一次的操作
    ```js
    const myCComponent:React.FC = () => {
      const updateRef = React.useRef(false);

      // other operations 后，updateRef.current = true 

      React.useEffect(() => {
        if(!updateRef.current){
          // doSomething
        }
      }, [])
    }
    ```
  3. 利用useRef获取最新state
  ```js
  const addHandle = () => {
        setCount(count + 1);
        setTimeout(() => {
            console.log(`count is : ${count}`);
        }, 1000);
  }
  ```
  如果点击三次，输出结果是：0，1，2
  ```js
  const useCurrentValue = (val) => {
    const ref = useRef(val);
    useEffect(() => {
        ref.current = val;
    }, [val]);
    return ref
  }

  export default (props = {}) => {
      const [count, setCount] = useState(0);

      const countRef3 = useCurrentValue(count);
      const addHandle = () => {
          setCount(count + 1);
          setTimeout(() => {
              console.log(`countRef3.current is: ${countRef3. current}`);
          }, 1000);
      }

      return (
          <div>
              <h2>function component</h2>
              <p>count is {count}</p>
              <button onClick={addHandle}>add</button>
          </div>
      );
  }
  ```
  这样改造之后，点击三次之后输出是：3，3，3

useRef使用场景总结：
1. 如果需要对渲染后的DOM节点进行操作，必须使用useRef。（可以用于获取并存放组件的 dom 节点, 以便直接对 dom 节点进行原生的事件操作）
2. 如果需要对渲染后才会存在的变量对象进行某些操作，建议使用useRef。
3. 利用useRef存放想要持久化( instant )的数据, 该数据不和 react 组件树的渲染绑定。
4. 利用 useRef 解决由于 hooks 函数式组件产生闭包时无法获取最新 state 的问题。

用**React.forwardRef()**来获取子组件内的原生标签组件
```js
import React from 'react'

const ChildComponent = React.forwardRef((props,ref) => {
  //子组件通过将第2个参数ref 添加到内部真正的“小写开头的类似原生标签的组件”中 
  return <button ref={ref}>{props.label}</button>
});

/* 上面的子组件直接在父组件内定义了，如果子组件是单独的.js文件，则可以通过
   export default React.forwardRef(ChildComponent) 这种形式  */

function Forward() {
  const ref = React.useRef();//父组件定义一个ref
  const clickHandle = () =>{
    console.log(ref.current);//父组件获得渲染后子组件中对应的DOM节点引用
  }
  return (
    <div>
        {/* 父组件通过给子组件添加属性 ref={ref} 将ref作为参数传递给子组件 */}
        <ChildComponent label='child bt' ref={ref} />
        <button onClick={clickHandle} >get child bt ref</button>
    </div>
  )
}
export default Forward;
```

**useRef和createRef的区别**

useRef像一个变量，类似于this，就像一个盒子，可以存放任何东西。createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用(值不变)。


## *useImperativeHandle*
它的作用是“勾住”子组件中某些函数(方法)供父组件调用。本质上是子组件将自己内部的函数(方法)通过useImperativeHandle添加到父组件中useRef定义的对象中。

先回顾一下之前学到的：
1. react属于`单向`数据流，父组件可以通过属性传值，将父组件内的函数(方法)传递给子组件，实现子组件调用父组件内函数的目的。
2. `useRef` 可以“勾住”某些本组件挂载完成或重新渲染完成后才拥有的某些对象。
3. `React.forwardRef` 可以“勾住”某些子组件挂载完成或重新渲染完成后才拥有的某些对象。
上面无论哪种情况，由于勾住的对象都是渲染后的原生html对象，父组件只能通过ref调用该原生html对象的函数(方法)。

使用方法：

`useImperativeHandle(ref,create,[deps])函数前2个参数为必填项，第3个参数为可选项。`
1. `ref`：父组件通过useRef定义的引用变量；
2. `create`：子组件要附加给ref的对象，该对象中的属性即子组件想要暴露给父组件的函数(方法)；
3. `[deps]`：选参数，为函数的依赖变量

实现过程：
1. 子组件内部先定义一个 xxx 函数
2. 通过useImperativeHandle函数，将 xxx函数包装成一个对象，并将该对象添加到父组件内部定义的ref中。
3. 若 xxx 函数中使用到了子组件内部定义的变量，则还需要将该变量作为 依赖变量 成为useImperativeHandle第3个参数，上面示例中则选择忽略了第3个参数。
4. 若父组件需要调用子组件内的 xxx函数，则通过：res.current.xxx()。
5. 请注意，该子组件在导出时必须被 React.forwardRef()包裹住才可以。

例子：若某子组件的需求为：
1. 有变量count，默认值为0
2. 有一个函数 addCount，该函数体内部执行 count+1
3. 有一个按钮，点击按钮执行 addCount 函数

父组件的需求为：
1. 父组件内使用上述子组件
2. 父组件内有一个按钮，点击执行上述子组件内定义的函数 addCount

子组件的代码:
```js
import React,{useState,useImperativeHandle} from 'react'

function ChildComponent(props,ref) {
  const [count,setCount] =  useState(0); //子组件定义内部变量count
  //子组件定义内部函数 addCount
  const addCount = () => {
    setCount(count + 1);
  }
  //子组件通过useImperativeHandle函数，将addCount函数添加到父组件中的ref.current中
  useImperativeHandle(ref,() => ({addCount}));
  return (
    <div>
        {count}
        <button onClick={addCount}>child</button>
    </div>
  )
}

//子组件导出时需要被React.forwardRef包裹，否则无法接收 ref这个参数
export default React.forwardRef(ChildComponent);
```
父组件的代码：
```js
import React,{useRef} from 'react'
import ChildComponent from './childComponent'

function Imperative() {
  const childRef = useRef(null); //父组件定义一个对子组件的引用

  const clickHandle = () => {
    childRef.current.addCount(); //父组件调用子组件内部 addCount函数
  }

  return (
    <div>
        {/* 父组件通过给子组件添加 ref 属性，将childRef传递给子组件，
            子组件获得该引用即可将内部函数添加到childRef中 */}
        <ChildComponent ref={childRef} />
        <button onClick={clickHandle}>child component do somting</button>
    </div>
  )
}

export default Imperative;
```

## *useLayoutEffect*
他的作用是“勾住”挂载(componentDidMount)或重新渲染完成(componentDidUpdate)这2个组件生命周期函数。useLayoutEffect使用方法、所传参数和useEffect完全相同。

useLayoutEffect永远要比useEffect先触发完成。

大部分情况都可以用useEffect来代替。

## *useDebugValue*




# 自定义hook和CF(common function)的区别
hook本身就是个函数，那它和普通的函数有什么区别？

什么时候我应该抽hook；什么时候应该放util里，当个通用函数合适？

1. 调用时机不同和调用方法不同。
在FC里使用的时候，自定义hook和CF都通过import作为FC(Function Component)的一部分，但调用时机不同。hook（因为必须写在顶部），在每次渲染的时候都会调用；但通用函数则需要手动调用。
2. 命名方式不同。
hook必须useXXX命名，CF就很灵活了。
3. 能使用的工具不同。
**hook中可以使用其他hook，比如useEffect， useState；但CF不行，CF只能处理没有hook的逻辑。**
4. 使用场景不同。
**CF可以被用在任何地方，但hook只能被用在FC(组件)或者其他hook中。**


# 有状态组件、无状态组件


# react-redux在类组件中的使用（比较老的用法，但是公司老旧项目会有）

> 学习地址：https://github.com/Wscats/react-tutorial/tree/master/react/redux


# React 类组件和函数组件的区别
1. 形式上：
类组件：用es6 class语法去写一个组件
```js
import React from 'react'
class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <h1>welcome, {this.props.name}</h1>
  }
}

export default Welcome
```
函数组件：用 JavaScript 函数创建组件
```js
import React from 'react'
const Welcome = (props) => {
  return <h1>welcome, {props.name}</h1>
}
export default Welcome
```
2. 状态管理和生命周期函数

    函数组件：又称`无状态组件`，函数组件是一个纯函数，所以不能在组件中使用 setState()。同时也不能使用生命周期函数。

    但react16.8 版本中添加了 hooks，使得我们可以在函数组件中使用 useState 钩子去管理 state，使用 useEffect 钩子去使用生命周期函数。

3. 调用方式

    函数组件：调用则是执行函数即可
    类组件：需要将组件进行实例化，然后调用实例对象的render方法

4. 获取渲染的值



# React错误边界

# context

# React 性能优化手段

# React事件绑定原理

# React 虚拟dom渲染原理 和 Diff 原理
> 参考链接：https://km.woa.com/articles/show/511997

# React 的 render 异常处理机制
> 参考链接：https://km.woa.com/articles/show/539330