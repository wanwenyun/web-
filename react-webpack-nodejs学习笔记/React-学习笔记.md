React篇（建议可以从第四点的reack-hooks学习大全开始看）

# 了解useCallback、useMemo、React.memo的使用时机

>学习地址： [https://juejin.cn/post/7010278471473594404](https://juejin.cn/post/7010278471473594404)

# React.useRef

**基础用法：**`const valueRef = useRef(value);`

**useRef特性：**

* 组件重新渲染（在组件的整个生命周期内），useRef的引用仍*不会改变*；

* useRef的改变不会让组件重新渲染（render）；

* useRef能够获取到dom；

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

useEffect可以用来解决类组件某些执行代码被分散在不同的生命周期函数中的问题。

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



# react-redux在类组件中的使用（比较老的用法，但是公司老旧项目会有）

> 学习地址：https://github.com/Wscats/react-tutorial/tree/master/react/redux


# dobux

> 官网链接： https://kcfe.github.io/dobux/

# React Diff 原理解析
> 参考链接：https://km.woa.com/articles/show/511997

# React 的 render 异常处理机制
> 参考链接：https://km.woa.com/articles/show/539330