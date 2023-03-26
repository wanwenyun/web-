

[toc]

# React学习小笔记

***

## React.memo()

### 使用场景

`React.memo()`是一个高阶函数，它与 React.PureComponent类似，但是一个针对的是函数组件而非一个类。

### 类组件

现在有一个显示时间的组件,每一秒都会重新渲染一次，对于`Child`组件我们肯定不希望也跟着渲染，所有需要用到`PureComponent`

父组件：

```jsx
import React  from 'react';

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date : new Date()
        }
    }

    componentDidMount(){
        setInterval(()=>{
            this.setState({
                date:new Date()
            })
        },1000)
    }

    render(){
        return (
            <div>
                <Child seconds={1}/>
                <div>{this.state.date.toString()}</div>
            </div>
        )
    }
}
```

子组件：继承了React.PureComponent

```jsx
class Child extends React.PureComponent {
    render(){
        console.log('I am rendering');
        return (
            <div>I am update every {this.props.seconds} seconds</div>
        )
    }
}
```

而在React Hooks中新出了一个React.memo()可以满足创建纯函数而不是一个类的需求

```jsx
function Child({seconds}){
    console.log('I am rendering');
    return (
        <div>I am update every {seconds} seconds</div>
    )
};
export default React.memo(Child)
```

React.memo()可接受2个参数，第一个参数为纯函数的组件，第二个参数用于对比props控制是否刷新，与shouldComponentUpdate()功能类似。以下继续举例：

```jsx
import React from "react";

function Child({seconds}){
    console.log('I am rendering');
    return (
        <div>I am update every {seconds} seconds</div>
    )
};

function areEqual(prevProps, nextProps) {
    if(prevProps.seconds===nextProps.seconds){
        return true
    }else {
        return false
    }

}
export default React.memo(Child,areEqual)
```

***

## React的useState

```jsx
import React, { useState } from 'react'

function HookCounter() {

  const initialCount: number = 0
  const [count, setCount] = useState(initialCount)

  //当你的 state 值依赖上一个状态值时，就会用到 previous state。就是这里的prevCount
  const increment5 = () => {
    for (let i = 0; i < 5; i++) {
      setCount(prevCount => prevCount + 1)
    }
  }

  // 注意到如果要使用 previous state，则需要通过 function 的方式传入 value 再返回变化后的新 value，将 + 1 -1 的功能也修改一下
  return (
    <div>
      Count: {count}
      <button onClick={() => {
        setCount(initialCount)
      }}>Reset</button>
      <button onClick={() => {
        setCount(prevCount => prevCount + 1)
      }}> + 1 </button>
      <button onClick={() => {
        setCount(prevCount => prevCount - 1)
      }}> - 1 </button>
      <button onClick={increment5}> + 5 </button>
    </div>
  )
}

export default HookCounter


// 小结
// 使用 previousState 时，要使用 setter function 的方式，传参给 setState 方法。来确保拿到的是准确的 previous state。
// 在重新渲染中，useState 返回的第一个值将始终是更新后最新的 state。
```



### 总结

- 可以在函数式组件中使用 state
- 在类组件中，**state 是一个对象**，但是 useState 中，*state可以不是对象，可以是任何类型*
- useState 返回2个元素的数组
  - 第一个是 state 的当前值
  - 第二个是 state 的 setter 方法，调用时会触发 rerender
    - 若当前的 state 依赖 previous state，可以传入一个函数到 state 的 setter 方法中，入参为 previous state，返回新的 state
- 对于对象和数组，注意 state 中不会自动补全旧的变量，需要使用展开运算符自己手动补充

---

## React的useEffect

### 生命周期中写逻辑的问题

react 中旧的生命周期可能会有副作用，比如页面的 title 要展示点击次数时，代码如下：

```jsx
componentDidMount() {
  document.title = `${this.state.count} times`
}
componentDidUpdate() {
  document.title = `${this.state.count} times`
}
```

在 componentDidMount 和 componentDidUpdate 中都写了同样的代码，我们不能在组件的生命周期中挂载一次，这就导致了代码重复的问题。

```jsx
componentDidMount() {
  document.title = `${this.state.count} times`
  this.interval = setInterval(this.tick, 1000)
}
componentDidUpdate() {
  document.title = `${this.state.count} times`
}
componentWillUnmount() {
  clearInterval(this.interval)
}
```

我们看到2个问题

1. 代码重复。设置标题的代码重复了1遍
2. 代码分散。逻辑看起来就分散在了组件生命周期的各个地方

因此，我们需要更好的方法解决。

### useEffect 解决的问题

- EffectHook 用于函数式组件中副作用，执行一些相关的操作，解决上述的问题
- 可以认为是 componentDidMount, componentDidUpdate, componentWillUnmount 的替代品

接下来学习如何使用 useEffect。

### useEffect After Render 的使用

举个例子，通过一个点击按钮，修改页面 title 的例子来说明

* Class 组件的写法示例

```jsx
import React, { Component } from 'react'

class ClassCounter extends Component {

  state = {
    count: 0
  }

  componentDidMount() {
    document.title = `${this.state.count} times`
  }
  componentDidUpdate() {
    document.title = `${this.state.count} times`
  }

  render() {
    return (
      <div>
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>
          Clicked {this.state.count} times
        </button>

      </div>
    )
  }
}

export default ClassCounter
```

* 使用 useEffect 改写上述示例

```jsx
import React, { useState, useEffect } from 'react'

function HookCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `${count} times`
  })

  return (
    <div>
      <button onClick={() => {
        setCount(prevCount => prevCount + 1)
      }} >Clicked {count} times</button>
    </div>
  )
}

export default HookCounter

```

* 优点：

可以看到 useEffect 的第一个入参是一个匿名函数，它会在每次 render 后调用。在第一次 render 和后续的更新 render 都会被调用。

另外，useEffect 写在函数式组件内，这样就可以直接拿到 props 和 state 的值，不用写 this 之类的代码。

### 有条件地执行useEffect

上一节了解到 useEffect 会在每次 render 后执行里面的函数，这可能会有一些性能问题，接下来就讲一讲如何有条件地执行 useEffect 中的匿名函数。

在上一节的示例上进行扩展一个输入 name 的功能，通过判断只执行 count 变化带来的逻辑。

* Class 组件的写法示例

```jsx
import React, { Component } from 'react'

interface stateType {
  count: number
  name: string
}

class ClassCounter extends Component {

  state = {
    count: 0,
    name: '',
  }

  componentDidMount() {
    document.title = `${this.state.count} times`
  }

  componentDidUpdate(prevProps: any, prevState: stateType) {
    if (prevState.count !== this.state.count) {
      console.log('Update title')
      document.title = `${this.state.count} times`
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => {
            this.setState({
              name: e.target.value
            })
          }}
        />
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>
          Clicked {this.state.count} times
        </button>
      </div>
    )
  }
}

export default ClassCounter
```

为了更好的性能，注意代码中判断了 prevState

* ### useEffect 的写法

```jsx
import React, { useState, useEffect } from 'react'

function HookCounter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    console.log('useEffect - update title')
    document.title = `You clicked ${count} times`
  }, [count])

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <button onClick={() => {
        setCount(prevCount => prevCount + 1)
      }} >Clicked {count} times</button>
    </div>
  )
}

export default HookCounter
```

* 注意到 useEffect 的第二个参数 `[count]`，这个参数是一个数组，元素是要被观察的 state 或 props，只有指定的这个变量发生变化时，才会触发 useEffect 中的第一个参数匿名函数的执行。这有利于性能的保证。

### 只执行1次useEffect

本节通过一个记录鼠标坐标的示例研究一下如何只执行一次useEffect

* 记录鼠标位置示例 Class 写法

```jsx
import React, { Component } from 'react'

class RunEffectsOnlyOnce extends Component {
  state = {
    x: 0,
    y: 0
  }

  logMousePos = (e: MouseEvent) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.logMousePos)
  }

  render() {
    return (
      <div>
        Y - {this.state.y}, X - {this.state.x}
      </div>
    )
  }
}

export default RunEffectsOnlyOnce
```

**这里只在 componentDidMount 中做了事件绑定，只执行了一次事件绑定**

* ### useEffect 中记录鼠标坐标

上述效果改造为函数式组件

```jsx
import React, { useState, useEffect } from 'react'

function RunEffectsOnlyOnce() {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const logMousePos = (e: MouseEvent) => {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    console.log('addEventListener')
    document.addEventListener('mousemove', logMousePos)
  }, [])

  return (
    <div>
      Y - {y}, X - {x}
    </div>
  )
}

export default RunEffectsOnlyOnce
```

**注意到 useEffect 方法的第二个参数传入一个空数组，有效的避免了多次调用的问题**

> 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
>
> 如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值。尽管传入 [] 作为第二个参数更接近大家更熟悉的 `componentDidMount` 和 `componentWillUnmount` 思维模式，但我们有更好的方式来避免过于频繁的重复调用 effect。除此之外，请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 `useEffect`，因此会使得额外操作很方便。

### 需要清除的 Effect

本节研究如何实现 willUnmount 这个生命周期，实现组件销毁时，清除 effect 逻辑。

在上一个demo中增加一个逻辑，点击按钮展示或隐藏鼠标的坐标组件。

共三个文件，结构如下

![img](https://user-gold-cdn.xitu.io/2020/5/11/17202eb0923d6f0a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

* App.tsx

```jsx
import React from 'react'

import './App.css'

import MouseContainer from './components/MouseContainer'

const App = () => {
  return (
    <div className="App">
      <MouseContainer />
    </div>
  )
}

export default App
```

* MouseContainer.tsx

```jsx
import React, { useState } from 'react'

import RunEffectsOnlyOnce from './RunEffectsOnlyOnce'

function MouseContainer() {
  const [display, setDisplay] = useState(true)
  return (
    <div>
      <button onClick={() => setDisplay(!display)}>Toggle display</button>
      {display && <RunEffectsOnlyOnce />}
    </div>
  )
}

export default MouseContainer
```

* MousePos

```jsx
import React, { useState, useEffect } from 'react'

function RunEffectsOnlyOnce() {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const logMousePos = (e: MouseEvent) => {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    console.log('addEventListener')
    document.addEventListener('mousemove', logMousePos)
  }, [])

  return (
    <div>
      Y - {y}, X - {x}
    </div>
  )
}

export default RunEffectsOnlyOnce
```

执行后发现隐藏了位置组件后，有一个错误警告。这是因为没有正确卸载子组件导致的。mousemove 事件依然被监听着和执行。并且可能会导致内存泄露。

![img](https://user-gold-cdn.xitu.io/2020/5/11/17202e9352ff78a9?imageslim)

* ### componentWillUnmount

因此要在卸载组件时，确保所有的监听和订阅都已经被移除。若是在 Class 组件中，可以如下代码

```jsx
componentWillUnmount() {
  document.removeEventListener('mousemove', this.logMousePos)
}
```

但是在 useEffect 该如何写呢？

```jsx
  useEffect(() => {
    console.log('addEventListener')
    document.addEventListener('mousemove', logMousePos)
    return () => {
      document.removeEventListener('mousemove', logMousePos)
    }
  }, [])
```

在 useEffect 的第一个参数中添加一个 return 匿名函数，这个匿名函数将在组件卸载的时候执行，因此我们在这里移除监听就好了。

如果需要一些在组件卸载时清除功能的代码，就写在 useEffect 第一个参数的返回匿名函数中吧。

### useEffect 中依赖错误导致的 bug

useEffect 的依赖(第二个参数)错误导致的问题。

以每秒 +1 的计数器为示例

* Class组件示例

11Counter.tsx

```jsx
/**
 * 每秒 +1 的计数器
 */

import React, { Component } from 'react'

class Counter extends Component {

  state = {
    count: 0
  }

  timer: number | undefined

  tick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  componentDidMount() {
    this.timer = window.setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }


  render() {
    return (
      <div>
        <span>{this.state.count}</span>
      </div>
    )
  }
}

export default Counter
```

执行没有问题，效果如下：

![img](https://user-gold-cdn.xitu.io/2020/5/11/17202e9387fe2a60?imageslim)

* hooks示例

App.tsx

```jsx
import React from 'react'

import './App.css'

import IntervalCounter from './components/11Counter'
import IntervalCounterHooks from './components/11IntervalCouterHooks'

const App = () => {
  return (
    <div className="App">
      <IntervalCounter />
      <IntervalCounterHooks />
    </div>
  )
}

export default App
```

IntervalCounterHooks.tsx

```jsx
import React, { useState, useEffect } from 'react'

function IntervalCouterHooks() {

  const [count, setCount] = useState(0)

  const tick = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    const interval = setInterval(tick, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      {count}
    </div>
  )
}

export default IntervalCouterHooks
```

但是计数器没有正常工作，效果如下

![img](https://user-gold-cdn.xitu.io/2020/5/11/17202e93883638d9?imageslim)

传入空的依赖数组 `[]`，意味着该 hook 只在组件挂载时运行一次，并非重新渲染时。但如此会有问题，在 `setInterval` `的回调中，count` 的值不会发生变化。因为当 effect 执行时，我们会创建一个闭包，并将 `count` 的值被保存在该闭包当中，且初值为 0。每隔一秒，回调就会执行 `setCount(0 + 1)`，因此，`count` 永远不会超过 1。

 * 解法一：这里我们不能将 useEffect 的第二个参数设置为空数组，而是 `[count]`。

   指定 `[count]` 作为依赖列表就能修复这个 Bug，但会导致每次改变发生时定时器都被重置。事实上，每个 `setInterval` 在被清除前（类似于 setTimeout）都会调用一次。但这并不是我们想要的。要解决这个问题，我们可以使用 setState 的函数式更新形式。它允许我们指定 state 该如何改变而不用引用当前 state，即下面的解法二

* 解法二：

  将

  ```jsx
  setCount(count + 1)
  ```

  改为

  ```jsx
  setCount((preCount) =>  preCount + 1)
  ```

  useEffect 的依赖数组里依然使用空数组。这里设置了 count 的值是和上一个值有关，也解决了问题。此时，`setInterval` 的回调依旧每秒调用一次，但每次 setCount 内部的回调取到的 `count` 是最新值（在回调中变量命名为 c）。

### 多个 useEffect

如果代码中有多个业务逻辑，可以将他们写在不同的 useEffect 中，并且可以写多个 useState 和他们匹配分组使用，会让业务逻辑更加清晰。

### Fetch Data with Effect Hook

本节讲述使用 useEffect 来获取数据，本文使用 axios 库示例。

[jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/) 网站提供了示例的请求，返回了一些 json 数据。

```jsx
import React, { useState, useEffect } from 'react'

import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function FetchData() {

  const [posts, setPosts] = useState<postType[]>([])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      const data: postType[] = res.data
      console.log(data)
      setPosts(data)
    }).catch((rej) => {
      console.log(rej)
    })
  }, [])

  return (
    <div>
      <ul>
        {
          posts.map((item) => (
            <li
              key={item.id}
            >
              {item.title}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default FetchData

```

这里注意 ts 在 useState 中的写法。

```jsx
const [posts, setPosts] = useState<postType[]>([])
```

注意 useEffect 第二个依赖参数传入空数组，保证了 useEffect 只执行一次。

* ### 输入id获取不同数据

```jsx
import React, { useState, useEffect } from 'react'

import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function FetchData() {
  const [post, setPost] = useState<postType>()
  const [id, setId] = useState('1')

  useEffect(() => {
    if (id) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
        const data: postType = res.data
        console.log(data)
        setPost(data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [id])  // id改变就会触发useEffect

  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value)
        }}
      />
      <div>
        {
          post && post.title
        }
      </div>
    </div>
  )
}

export default FetchData
```

![img](https://user-gold-cdn.xitu.io/2020/5/11/17202e9389c221dc?imageslim)

### button 点击触发 effect

监听按钮点击触发变化，执行 effect 方法

```jsx
import React, { useState, useEffect } from 'react'

import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function FetchData() {
  const [post, setPost] = useState<postType>()
  const [id, setId] = useState('1')
  const [idFromBtnClick, setIdFromBtnClick] = useState('1')

  useEffect(() => {
    if (idFromBtnClick) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${idFromBtnClick}`).then((res) => {
        const data: postType = res.data
        console.log(data)
        setPost(data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [idFromBtnClick])

  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value)
        }}
      />
      <button
        onClick={() => {
          setIdFromBtnClick(id)
        }}
      >Fetch Post</button>
      <div>
        {
          post && post.title
        }
      </div>
    </div>
  )
}

export default FetchData
```

![img](https://user-gold-cdn.xitu.io/2020/5/11/17202e9392011ad4?imageslim)

### 小结

本章从为什么使用 useEffect 开始说起，用户解决代码重复代码分散的问题，useEffect 可以更好的组织代码。

useEffect api 的用法，第一个参数为匿名函数，作为 effect 要执行的内容。第二个参数为数组，用于观察改变的 props 或 state 进行有条件的触发 effect，或者传入空数组，让 effect 只执行一次。useEffect 返回一个匿名函数，在组件销毁是执行，可以有效避免内存泄露的风险。

---

## React的useContext

#### 什么是Context API

考虑这样一种场景，如果组件树结构如下，现在想从根节点传递一个 userName 的属性到叶子节点 A D F，通过 props 的方式传递，会不可避免的传递通过 B C E，即使这些组件也没有使用这个 userName 属性。

![img](https://user-gold-cdn.xitu.io/2020/5/11/17202eed8258da00?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如果这样的嵌套树形结构有5层或10层，那么将是灾难式的开发维护体验。如果能不经过中间的节点直接到达需要的地方就可以避免这种问题，这时 Context api 就是来解决这个问题的。

Context api 是在组件树中传递数据但不用每层都经过的一种 api。下面我们一起看看 Context Hook 的使用方法。

#### 使用Context

我们举个例子重点看下最右边的分支，C E F，从根节点传递一个变量 username 到 F 节点。

我们先创建好 App, ComponentC, ComponentE, ComponentF, 如下

* App.tsx

```jsx
import React from 'react'

import './App.css'

import ComponentC from './components/16ComponentC'

const App = () => {
  return (
    <div className="App">
      <ComponentC />
    </div>
  )
}

export default App
```

ComponentC.tsx

```jsx
import React from 'react'

import ComponentE from './16ComponentE'

function ComponentC() {
  return (
    <div>
      <ComponentE />
    </div>
  )
}

export default ComponentC
```

ComponentE.tsx

```jsx
import React from 'react'

import ComponentF from './16ComponentF'

function ComponentE() {
  return (
    <div>
      <ComponentF />
    </div>
  )
}

export default ComponentE
```

ComponentF.tsx

```jsx
import React from 'react'

function ComponentF() {
  return (
    <div>
      ComponentF
    </div>
  )
}

export default ComponentF
```

![img](https://user-gold-cdn.xitu.io/2020/5/11/17202eed83485b44?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 创建context

在根节点 App.tsx 中使用 `createContext()` 来创建一个 context

```jsx
const UserContext = React.createContext('')
```

>创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。
>
>只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。这有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。

##### 提供 Provider

在根节点中使用 Provider 包裹子节点，将 context 提供给子节点

```jsx
<UserContext.Provider value={'chuanshi'}>
  <ComponentC />
</UserContext.Provider>
```

此时 App.tsx 的完整代码为

```jsx
import React from 'react'

import './App.css'

import ComponentC from './components/16ComponentC'

export const UserContext = React.createContext('')

const App = () => {
  return (
    <div className="App">
      <UserContext.Provider value={'chuanshi'}>
        <ComponentC />
      </UserContext.Provider>
    </div>
  )
}

export default App
```

##### 在使用的节点处消费 Context

* import context 对象

```jsx
import { UserContext } from '../App'
```

* 使用 Consumer 进行消费

```jsx
<UserContext.Consumer>
  {
    (user) => (
      <div>
        User context value {user}
      </div>
    )
  }
</UserContext.Consumer>
```

>
>
>这里，React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context。
>
>这需要函数作为子元素（function as a child）这种做法。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。
>
>

完整的 ComponentF.tsx 代码如下

```jsx
import React from 'react'

import { UserContext } from '../App'

function ComponentF() {
  return (
    <div>
      <UserContext.Consumer>
        {
          (user) => (
            <div>
              User context value {user}
            </div>
          )
        }
      </UserContext.Consumer>
    </div>
  )
}

export default ComponentF
```

效果如下：

![img](https://user-gold-cdn.xitu.io/2020/5/11/17202eed9e94c4d7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 多个Context情况

我们在 App.tsx 中再增加一个 Context

```jsx
import React from 'react'

import './App.css'

import ComponentC from './components/16ComponentC'

export const UserContext = React.createContext('')
export const ChannelContext = React.createContext('')

const App = () => {
  return (
    <div className="App">
      <UserContext.Provider value={'chuanshi'}>
        <ChannelContext.Provider value={'code volution'}>
          <ComponentC />
        </ChannelContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App
```

接下来在 component F 中消费它们

```jsx
import React from 'react'

import { UserContext, ChannelContext } from '../App'

function ComponentF() {
  return (
    <div>
      <UserContext.Consumer>
        {
          (user) => (
            <ChannelContext.Consumer>
              {
                (channel) => (
                  <div>
                    User context value {user}, channel value {channel}
                  </div>
                )
              }
            </ChannelContext.Consumer>

          )
        }
      </UserContext.Consumer>
    </div>
  )
}

export default ComponentF
```

页面展示如下：

![img](https://user-gold-cdn.xitu.io/2020/5/11/17202eed84d8178e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

虽然代码运行没有问题，但是美观性和可读性都不太好，如果使用多个 Context，有个更好的方法，就是使用 Context hook 来解决消费多个 Context 的代码优雅问题。

### useContext

举个例子，我们在上述的 demo 中的 component E 中通过 `useContext` 使用根节点创建的 Context。分为以下步骤

1. 从 react 对象中 import `useContext` 这个 hook api
2. import 根节点创建的 Context 对象（可以导入多个）
3. 执行 `useContext()` 方法，将 Context 传入

ComponentE 完整代码:

```jsx
import React, { useContext } from 'react'

import ComponentF from './16ComponentF'
import {UserContext, ChannelContext} from '../App'

function ComponentE() {
  const user = useContext(UserContext)
  const channel = useContext(ChannelContext)
  return (
    <div>
      <ComponentF />
      --- <br/>
      {user} - {channel}
    </div>
  )
}

export default ComponentE
```

页面展示如下：

![img](https://user-gold-cdn.xitu.io/2020/5/11/17202eed851c6f89?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

其实关键代码为：

```jsx
const value = useContext(MyContext)
```

>
>
>useContext 方法接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。
>
>当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 `MyContext` provider 的 context `value` 值。**即使祖先使用 `React.memo` 或 `shouldComponentUpdate`**，也会在组件本身使用 `useContext` 时重新渲染。
>
>可以理解为，`useContext(MyContext)` 相当于 class 组件中的 `static contextType = MyContext` 或者 `<MyContext.Consumer>`。
>
>`useContext(MyContext)` 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 `<MyContext.Provider>` 来为下层组件提供 context。
>
>

---

## React的useReducer

`useReducer` 是一个用于状态管理的 hook api。是 `useState` 的替代方案。

那么 `useReducer` 和 `useState` 的区别是什么呢？答案是`useState` 是使用 `useReducer` 构建的。

#### reducer

```jsx
useState - state
useEffect - side effects
useContext - context API
useReducer - reducers
```

可以看到 useReducer 一定也与 reducer 有关

#### simple state & action

* 我们来看一个计数器的例子，来学习 simple state & action

1. import useReducer api

2. 声明 reducer function 和 initialState

3. 调用执行 reducer

   * CounterOne.tsx

   ```jsx
   import React, { useReducer } from 'react'
   
   const initialState = 0
   const reducer = (state: number, action: string) => {
     switch (action) {
       case 'increment':
         return state + 1
       case 'decrement':
         return state - 1
       case 'reset':
         return initialState
       default:
         return state
     }
   }
   
   function CounterOne() {
     const [count, dispatch] = useReducer(reducer, initialState)
     return (
       <div>
         <div>Count - {count}</div>
         <button
           onClick={() => dispatch('increment')}
         >Increment</button>
         <button
           onClick={() => dispatch('decrement')}
         >Decrement</button>
         <button
           onClick={() => dispatch('reset')}
         >Reset</button>
       </div>
     )
   }
   
   export default CounterOne
   ```

   * App.tsx

   ```jsx
   import React from 'react'
   
   import './App.css'
   
   import CounterOne from './components/19CounterOne'
   
   const App = () => {
     return (
       <div className="App">
         <CounterOne />
       </div>
     )
   }
   
   export default App
   ```

   页面展示如下：

   ![img](https://user-gold-cdn.xitu.io/2020/5/13/1720cfa8bf044b74?imageslim)

reducer function 的2个参数，分别为当前 state 和 action， 并根据不同的 action 返回不同的新的 state。

useReducer 返回了一个数组，2个元素分别为 state 和 dispatch 方法。其中 state 在我们的例子中就是当前的 count 值，dispatch 方法接受一个参数，执行对应的 action。dispatch 执行后，对应的 state 会改变，组件会 rerender，来展示最新的状态。

这就是使用 simple state 和 simple action 的例子，本例中 state 是一个 number 类型，action 也是简单的 string 类型，这和 Redux 的模式稍有不同。接下来我们看一个稍复杂的例子。

#### complex state & action

下面我们看第二个例子。将使用对象作为 state 和 action 的值，这就比较类似 Redux 的模式了。

* CounterTwo.tsx

```jsx
import React, { useReducer } from 'react'

const initialState = {
  firstCounter: 0
}
const reducer = (
  state: {
    firstCounter: number
  },
  action: {
    type: string
  }
) => {
  switch (action.type) {
    case 'increment':
      return {
        firstCounter: state.firstCounter + 1
      }
    case 'decrement':
      return {
        firstCounter: state.firstCounter - 1
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function CounterTwo() {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <div>Count - {count.firstCounter}</div>
      <button
        onClick={() => dispatch({ type: 'increment' })}
      >Increment</button>
      <button
        onClick={() => dispatch({ type: 'decrement' })}
      >Decrement</button>
      <button
        onClick={() => dispatch({ type: 'reset' })}
      >Reset</button>
    </div>
  )
}

export default CounterTwo
```

* App.tsx

```jsx
import React from 'react'

import './App.css'

import CounterTwo from './components/20CountTwo'

const App = () => {
  return (
    <div className="App">
      <CounterTwo />
    </div>
  )
}

export default App
```

与上一节的示例效果相同。现在，我们已经将 state 和 action 都改写为对象了，那么这样写有什么好处呢？

其一的好处是 action 现在是一个对象了，可以有多个属性决定 action 的效果。例如我们再添加一个 +5 的逻辑。

* CounterTwo.tsx

```jsx
import React, { useReducer } from 'react'

const initialState = {
  firstCounter: 0
}
const reducer = (
  state: {
    firstCounter: number
  },
  action: {
    type: string
    value: number
  }
) => {
  switch (action.type) {
    case 'increment':
      return {
        firstCounter: state.firstCounter + action.value
      }
    case 'decrement':
      return {
        firstCounter: state.firstCounter - action.value
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function CounterTwo() {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <div>Count - {count.firstCounter}</div>
      <button
        onClick={() => dispatch({
          type: 'increment',
          value: 1
        })}
      >Increment</button>
      <button
        onClick={() => dispatch({
          type: 'decrement',
          value: 1
        })}
      >Decrement</button>
      <button
        onClick={() => dispatch({
          type: 'increment',
          value: 5
        })}
      >Increment 5</button>
      <button
        onClick={() => dispatch({
          type: 'decrement',
          value: 5
        })}
      >Decrement 5</button>
      <button
        onClick={() => dispatch({ type: 'reset', value: 0})}
      >Reset</button>
    </div>
  )
}

export default CounterTwo
```

![img](https://user-gold-cdn.xitu.io/2020/5/13/1720cfa8ccd6c5ee?imageslim)

第二个好处是 state 作为一个对象，就可以添加更多的 state 属性，例如我们在增加一个计数器2，代码如下

```jsx
import React, { useReducer } from 'react'

const initialState = {
  firstCounter: 0,
  secondCounter: 10,
}
const reducer = (
  state: {
    firstCounter: number
    secondCounter: number
  },
  action: {
    type: string
    value: number
  }
) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        firstCounter: state.firstCounter + action.value
      }
    case 'decrement':
      return {
        ...state,
        firstCounter: state.firstCounter - action.value
      }
    case 'increment2':
      return {
        ...state,
        secondCounter: state.secondCounter + action.value
      }
    case 'decrement2':
      return {
        ...state,
        secondCounter: state.secondCounter - action.value
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function CounterTwo() {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <div>First Count - {count.firstCounter}</div>
      <div>Second Count - {count.secondCounter}</div>
      <button
        onClick={() => dispatch({
          type: 'increment',
          value: 1
        })}
      >Increment</button>
      <button
        onClick={() => dispatch({
          type: 'decrement',
          value: 1
        })}
      >Decrement</button>
      <button
        onClick={() => dispatch({
          type: 'increment',
          value: 5
        })}
      >Increment 5</button>
      <button
        onClick={() => dispatch({
          type: 'decrement',
          value: 5
        })}
      >Decrement 5</button>
      <div>
        <button
          onClick={() => dispatch({
            type: 'increment2',
            value: 1
          })}
        >Increment second</button>
        <button
          onClick={() => dispatch({
            type: 'decrement2',
            value: 1
          })}
        >Decrement second</button>
      </div>
      <button
        onClick={() => dispatch({ type: 'reset', value: 0 })}
      >Reset</button>
    </div>
  )
}

export default CounterTwo
```

![img](https://user-gold-cdn.xitu.io/2020/5/13/1720cfa8c1cceb39?imageslim)

#### multiple useReducers

如果有多个 state，但 state 变化的方式又是相同的时候，可以多次使用 useReducer。

* CounterThree.tsx

```jsx
import React, { useReducer } from 'react'

const initialState = 0
const reducer = (state: number, action: string) => {
  switch (action) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    case 'reset':
      return initialState
    default:
      return state
  }
}

function CounterThree() {
  const [count, dispatch] = useReducer(reducer, initialState)
  const [countTwo, dispatchTwo] = useReducer(reducer, initialState)
  return (
    <div>
      <div>Count - {count}</div>
      <button
        onClick={() => dispatch('increment')}
      >Increment</button>
      <button
        onClick={() => dispatch('decrement')}
      >Decrement</button>
      <button
        onClick={() => dispatch('reset')}
      >Reset</button>

      <br/>

      <div>CountTwo - {countTwo}</div>
      <button
        onClick={() => dispatchTwo('increment')}
      >Increment</button>
      <button
        onClick={() => dispatchTwo('decrement')}
      >Decrement</button>
      <button
        onClick={() => dispatchTwo('reset')}
      >Reset</button>
    </div>
  )
}

export default CounterThree
```

![img](https://user-gold-cdn.xitu.io/2020/5/13/1720cfa8c2f16910?imageslim)

这个例子中使用了多个 useReducer，但共用了一个 reducer function。这有效的避免了合并对象的麻烦（可以对比上一节使用展开运算法合并 state）。也提高了代码的复用性。



#### useReducer with useContext

截止目前我们已经学习了在组件内使用 useReducer 进行状态管理。如果在某些场景想再组件之间分享 state，进行全局的 state 管理时，我们可以使用 useReducer 加 useContext。

考虑这样一个场景，有3个子组件A, B, C，要在子组件内控制同一个计数器，常规的写法是将 counter 的方法写到父组件上，然后通过 props 的方式将 counter 方法和 state 传给子组件，子组件中调用通过 props 传入的 counter 方法，就会改变父组件中的 state，同时也能改变作为 props 传递给子组件的 app 中的 state。如下图：

![img](https://user-gold-cdn.xitu.io/2020/5/13/1720cfa8c5efb591?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

看起来没什么问题，但是如果组件嵌套比较深的时候，这将非常糟糕，要一层一层将 counter 方法作为 props 传递给子组件。这时就要使用 useContext 加 useReducer 了。

要完成这个需求分为 2 步

1. 使用 useReducer 在根节点创建一个 counter 方法
2. 通过 useContext 为子组件提供和消费 context

* App.tsx

```jsx
import React, { useReducer } from 'react'
import './App.css'
import A from './components/22A'
import B from './components/22B'
import C from './components/22C'

interface CountContextType {
  countState: number
  countDispatch: (action: string) => void
}

export const CountContext = React.createContext({} as CountContextType)

const initialState = 0
const reducer = (state: number, action: string) => {
  switch (action) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    case 'reset':
      return initialState
    default:
      return state
  }
}

const App = () => {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <CountContext.Provider
      value={{
        countState: count,
        countDispatch: dispatch,
      }}
    >
      <div className="App">
        Count - {count}
        <A />
        <B />
        <C />
      </div>
    </CountContext.Provider>
  )
}

export default App
```

* A.tsx

```jsx
import React, { useContext } from 'react'
import { CountContext } from '../App'

function A() {
  const countContext = useContext(CountContext)
  return (
    <div>
      A - {countContext.countState}
      <button
        onClick={() => countContext.countDispatch('increment')}
      >Increment</button>
      <button
        onClick={() => countContext.countDispatch('decrement')}
      >Decrement</button>
      <button
        onClick={() => countContext.countDispatch('reset')}
      >Reset</button>
    </div>
  )
}

export default A
```

* B.tsx

```jsx
import React from 'react'
import D from './22D'

function B() {
  return (
    <div>
      <D />
    </div>
  )
}

export default B
```

* C.tsx

```jsx
import React from 'react'
import E from './22E'

function C() {
  return (
    <div>
      <E />
    </div>
  )
}

export default C
```

* D.tsx

```jsx
import React, { useContext } from 'react'
import { CountContext } from '../App'

function D() {
  const countContext = useContext(CountContext)
  return (
    <div>
      D - {countContext.countState}
      <button
        onClick={() => countContext.countDispatch('increment')}
      >Increment</button>
      <button
        onClick={() => countContext.countDispatch('decrement')}
      >Decrement</button>
      <button
        onClick={() => countContext.countDispatch('reset')}
      >Reset</button>
    </div>
  )
}

export default D
```

* E.tsx

```jsx
import React from 'react'

import F from './22F'

function E() {
  return (
    <div>
      <F />
    </div>
  )
}

export default E
```

* F.tsx

```jsx
import React, { useContext } from 'react'
import { CountContext } from '../App'

function F() {
  const countContext = useContext(CountContext)
  return (
    <div>
      F - {countContext.countState}
      <button
        onClick={() => countContext.countDispatch('increment')}
      >Increment</button>
      <button
        onClick={() => countContext.countDispatch('decrement')}
      >Decrement</button>
      <button
        onClick={() => countContext.countDispatch('reset')}
      >Reset</button>
    </div>
  )
}

export default F
```

![img](https://user-gold-cdn.xitu.io/2020/5/13/1720cfa8eb039642?imageslim)

在 App.tsx 中，我们使用 useReducer 创建了一个 counter，声明了初始值，创建了 reducer 函数，useReducer 返回了状态 count 和 dispatch 方法。

为了能让其他组件访问到 count 和 dispatch，我们通过 React.createContext 创建了 CountContext，并用 `<CountContext.Provider>` 包裹根节点。将 count 和 dispatch 作为 value 传给 Provider。

在子节点中，我们使用 useContext 获取到 count 和 dispatch 方法，通过调用 dispatch 实现对 count 的改变。

### Fetching Data with useReducer

之前我们已经在 useEffect 的章节中学习掌握了如何请求数据，当时是使用了 useEffect 和 useState，现在我们再来看看如何使用 useReducer 去请求远程数据。

接下来我们做这样一个小需求：

1. 页面载入时请求数据
2. 请求数据中展示 loading 状态
3. 请求返回后移除 loading 样式，展示请求的数据；若请求失败，也移除 loading 展示错误提示

我们将分别使用 useState 和 useReducer 来实现，并对比其中的区别。

#### useState 实现请求

* App.tsx

```jsx
import React from 'react'
import './App.css'

import DataFetchingOne from './components/23DataFetchingOne'

const App = () => {
  return (
    <div className="App">
      <DataFetchingOne />
    </div>
  )
}

export default App
```

* DataFetchingOne.tsx

```jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function DataFetchingOne() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [post, setPost] = useState({} as postType)

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      setLoading(false)
      setPost(res.data)
      setError('')
    }).catch(() => {
      setLoading(false)
      setPost({} as postType)
      setError('something went wrong')
    })
  }, [])

  return (
    <div>
      {
        loading
          ? 'Loading...'
          : post.title
      }
      {
        error
          ? error
          : null
      }
    </div>
  )
}

export default DataFetchingOne
```

![img](https://user-gold-cdn.xitu.io/2020/5/13/1720cfa8f0448577?imageslim)

注意到在这个实现中，我们使用了3个useState去控制 loading, post 和 error，接下来看看如何使用 useReducer 实现。

#### useReducer 实现请求

```jsx
import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

type stateType = {
  loading: boolean
  error: string
  post?: postType | {}
}

type actionType = {
  type: 'FETCH_SUCCESS' | 'FETCH_ERROR'
  payload?: postType | {}
}

const initialState = {
  loading: true,
  error: '',
  post: {},
}

const reducer = (state: stateType, action: actionType) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        error: '',
        post: action.payload,
      }
    case 'FETCH_ERROR':
      return {
        loading: false,
        error: 'something went wrong',
        post: {},
      }
    default:
      return state
  }
}

function DataFetchingTwo() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: res.data,
      })
    }).catch(() => {
      dispatch({
        type: 'FETCH_ERROR'
      })
    })
  }, [])

  return (
    <div>
      {
        state.loading
          ? 'Loading...'
          // @ts-ignore
          : state.post.title
      }
      {
        state.error
          ? state.error
          : null
      }
    </div>
  )
}

export default DataFetchingTwo
```

可以看到，我们将 state 集合在了一起，在同一个对象，修改 state 的逻辑也聚合在了一起，即 reducer 函数中的 switch 部分。

至此你可能会好奇，什么时候该用 useState 什么时候该用 useReducer，我们继续往下看。

#### useState vs useReducer

* 如果 state 的类型为 Number, String, Boolean 建议使用 useState，如果 state 的类型 为 Object 或 Array，建议使用 useReducer

* 如果 state 变化非常多，也是建议使用 useReducer，集中管理 state 变化，便于维护

* 如果 state 关联变化，建议使用 useReducer

* 业务逻辑如果很复杂，也建议使用 useReducer

* 如果 state 只想用在 组件内部，建议使用 useState，如果想维护全局 state 建议使用 useReducer

#### 小结

本章主要讲述了 useReducer 的使用方法。从 JavaScript 中的 reduce api 开始，对比说明了什么是 useReducer。

学习了 useReducer 的简单状态的使用，复杂状态的使用，以及多个 useReducer 的使用。

掌握了组件嵌套多层时使用 useContext 加 useReducer 完成子组件修改全局state的方法，代码更优雅，可维护性更高。

通过对比 useState，学习了如何使用 useEffect 加 useReducer 请求数据，并控制 loading 状态的显示隐藏。

最后对比了 useState 和 useReducer，并给出了使用建议。

---

## React的useMemo

第一个例子：

没使用useMemo可能带来的问题，举例：

* 父组件

```js
function App() {
  const [name, setName] = useState('名称')
  const [content,setContent] = useState('内容')
  return (
      <>
        <button onClick={() => setName(new Date().getTime())}>name</button>
        <button onClick={() => setContent(new Date().getTime())}>content</button>
        <Button name={name}>{content}</Button>
      </>
  )
}

```

* 子组件

```js
function Button({ name, children }) {
  function changeName(name) {
    console.log('11')
    return name + '改变name的方法'
  }

  const otherName =  changeName(name)
  return (
      <>
        <div>{otherName}</div>
        <div>{children}</div>
      </>

  )
}
```

* 当我们点击父组件的按钮的时候，子组件的name和children都会发生变化。

* 不管我们是改变name或者content的值，我们发现 changeName的方法都会被调用。

* 是不是意味着我们本来只想修改content的值，但是由于name并没有发生变化，所以无需执行对应的changeName方法。但是发现他却执行了。 这是不是就意味着性能的损耗，做了无用功。

***

下面我们使用useMemo进行优化：

* 优化后的子组件

```js
function Button({ name, children }) {
  function changeName(name) {
    console.log('11')
    return name + '改变name的方法'
  }

const otherName =  useMemo(()=>changeName(name),[name])
  return (
      <>
        <div>{otherName}</div>
        <div>{children}</div>
      </>

  )
}

export default Button
```

* 这个时候我们点击改变content值的按钮，发现changeName并没有被调用。
  但是点击改变name值按钮的时候，changeName被调用了。
  所以我们可以使用useMemo方法避免无用方法的调用，当然一般我们changName里面可能会使用useState来改变state的值，那是不是就避免了组件的二次渲染，达到了优化性能的目的。

---

第二个例子：

### 计数器示例

创建2个计数器，并能区分当前是奇数或者偶数，为了模拟点击按钮时包含大量的计算逻辑影响性能，在判断偶数的方法中添加了没有用的计算逻辑，为了让性能差的明显。代码如下：

* Counter.tsx

```jsx
import React, { useState } from 'react'

function Counter() {
  const [counterOne, setCounterOne] = useState(0)
  const [counterTwo, setCounterTwo] = useState(0)

  const incrementOne = () => {
    setCounterOne(counterOne + 1)
  }

  const incrementTwo = () => {
    setCounterTwo(counterTwo + 1)
  }

  const isEven = () => {
    let i = 0
    while (i < 1000000000) i += 1
    return counterOne % 2 === 0
  }

  return (
    <div>
      <button
        onClick={incrementOne}
      >Count One = {counterOne}</button>
      <span>
        {
          isEven() ? 'even' : 'odd'
        }
      </span>
      <br />
      <button
        onClick={incrementTwo}
      >Count Two = {counterTwo}</button>
    </div>
  )
}

export default Counter
```

* App.tsx

```jsx
import React from 'react'
import './App.css'

import Counter from './components/27.Counter'

const App = () => {
  return (
    <div className="App">
      <Counter />
    </div>
  )
}

export default App
```

页面展示如下：

![img](https://user-gold-cdn.xitu.io/2020/5/18/1722810b8f2b8042?imageslim)

我们发现点击第一个按钮有较长的延迟，因为我们的判断偶数的逻辑中包含了大量的计算逻辑。但是，我们点击第二个按钮，也有较长的延迟！这很奇怪。

这是因为，每次 state 更新时，组件会 rerender，isEven 会被执行，这就是我们点击第二个按钮时，也会卡的原因。我们需要优化，告诉 React 不要有不必要的计算，特别是这种计算量复杂的。

在我们的示例中，我们要告诉 React，在点击第二个按钮时，不要执行 isEven 方法。这时就需要 useMemo hook 登场了。

### useMemo

与 useCallback 的用法类似。

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

>返回一个 memoized 值。 把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
>
>记住，传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。
>
>如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。
>
>**你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。** 将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的。

* 首先引入useMemo

```jsx
import React, { useState, useMemo } from 'react'
```

然后将 isEven 方法使用 useMemo 改写，返回值赋给 isEven

```jsx
const isEven = useMemo(() => {
  let i = 0
  while (i < 1000000000) i += 1
  return counterOne % 2 === 0
}, [counterOne])
```

最后记得修改 isEven 使用的地方，已经从*一个方法*变为了**一个变量**

```jsx
{
  isEven ? 'even' : 'odd'
}
```

完整代码如下

* Counter.tsx

```jsx
import React, { useState, useMemo } from 'react'

function Counter() {
  const [counterOne, setCounterOne] = useState(0)
  const [counterTwo, setCounterTwo] = useState(0)

  const incrementOne = () => {
    setCounterOne(counterOne + 1)
  }

  const incrementTwo = () => {
    setCounterTwo(counterTwo + 1)
  }

  const isEven = useMemo(() => {
    let i = 0
    while (i < 1000000000) i += 1
    return counterOne % 2 === 0
  }, [counterOne])

  return (
    <div>
      <button
        onClick={incrementOne}
      >Count One = {counterOne}</button>
      <span>
        {
          isEven ? 'even' : 'odd'
        }
      </span>
      <br />
      <button
        onClick={incrementTwo}
      >Count Two = {counterTwo}</button>
    </div>
  )
}

export default Counter
```

效果如下：

![img](https://user-gold-cdn.xitu.io/2020/5/18/1722810b9c48ecc9?imageslim)



我们看到点击第二个按钮时，不会有任何卡顿，这是因为使用了 useMemo 只依赖了 counterOne 变量，点击第二个按钮时，isEven 读取的是缓存值，不需要再重新计算是否为偶数。



### useMemo 与 useCallback 的区别

*useCallback 是缓存了函数自身，而 useMemo 是缓存了函数的返回值。*



---

##  React的useCallback

首先举个组件多次被复用的场景：

有如下的，组件树结构。ParentWrap 包含 Title 组件、2次使用 Count 组件、2次使用 Button 组件。

点击 Button，对应的 Count 分别会增加。

![img](https://user-gold-cdn.xitu.io/2020/5/18/17226e2be3884074?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

* App.tsx

```jsx
import React from 'react'
import './App.css'

import ParentComponent from './components/26ParentComponenet'

const App = () => {
  return (
    <div className="App">
      <ParentComponent />
    </div>
  )
}

export default App
```

* ParentComponent.tsx

```jsx
import React, { useState } from 'react'
import Title from './26Title'
import Count from './26Count'
import Button from './26Button'

function ParentComponenet() {
  const [age, setAge] = useState(29)
  const [salary, setSalary] = useState(50000)
  const incrementAge = () => {
    setAge(age + 1)
  }
  const incrementSalary = () => {
    setSalary(salary + 1000)
  }
  return (
    <div>
      <Title />
      <Count
        text="Age"
        count={age}
      />
      <Button
        handleClick={incrementAge}
      >Increment age</Button>
      <Count
        text="Salary"
        count={salary}
      />
      <Button
        handleClick={incrementSalary}
      >Increment salary</Button>
    </div>
  )
}

export default ParentComponenet
```

* Title.tsx

```jsx
import React from 'react'

function Title() {
  console.log('Rendering Title')
  return (
    <h2>useCallback</h2>
  )
}

export default Title
```

* Count.tsx

```jsx
import React from 'react'

function Count(props: {
  text: string
  count: number
}) {
  console.log(`Rendering ${props.text}`)
  return (
    <div>
      {props.text} - {props.count}
    </div>
  )
}

export default Count
```

* Button.tsx

```jsx
import React from 'react'

function Button(props: {
  handleClick: () => void
  children: string
}) {
  console.log('Rendering button', props.children)
  return (
    <button onClick={props.handleClick}>
      {props.children}
    </button>
  )
}

export default Button
```

页面展示效果：

![img](https://user-gold-cdn.xitu.io/2020/5/18/17226e2be38b1a98?imageslim)

每次点击，可以看到以下日志：

```
Rendering Title
Rendering Age
Rendering button Increment age
Rendering Salary
Rendering button Increment salary
```

每次状态改变都触发了所有组件的 rerender，这个示例比较简单，但是假如未来遇到20、30、甚至50个组件 rerender 的时候，就一定要考虑到性能问题了。下面讲讲在这个示例中怎么进行优化。



### 使用React.memo优化

在本例中，我们当然希望点击增加年龄的按钮时，只有关于年龄的 Count 和 Button 进行 rerender，而其他组件不发生 rerender，点击增加 salary 时也一样。如何才能做到呢？答案是 `React.memo`。

我们给 Title.tsx, Count.tsx, Button.tsx 添加 `React.memo()`，代码如下：

* Title.tsx

```jsx
import React from 'react'

function Title() {
  console.log('Rendering Title')
  return (
    <h2>useCallback</h2>
  )
}

export default React.memo(Title)
```

* Count.tsx

```jsx
import React from 'react'

function Count(props: {
  text: string
  count: number
}) {
  console.log(`Rendering ${props.text}`)
  return (
    <div>
      {props.text} - {props.count}
    </div>
  )
}

export default React.memo(Count)
```

* Button.tsx

```jsx
import React from 'react'

function Button(props: {
  handleClick: () => void
  children: string
}) {
  console.log('Rendering button', props.children)
  return (
    <button onClick={props.handleClick}>
      {props.children}
    </button>
  )
}

export default React.memo(Button)
```

效果如下：

![img](https://user-gold-cdn.xitu.io/2020/5/18/17226e2be462d40e?imageslim)

>React.memo 为高阶组件。它与 React.PureComponent 非常相似，但只适用于函数组件，而不适用 class 组件。

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

>如果你的函数组件在给定相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。
>
>React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染。
>
>默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。



```jsx
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

>此方法仅作为性能优化的方式而存在。但请不要依赖它来“阻止”渲染，因为这会产生 bug。

但是，使用了 React.memo 后，我们看到点击增加年龄的按钮时，日志变为了

```
Rendering Age
Rendering button Increment age
Rendering button Increment salary
```

依然有不相关的 rerender `Rendering button Increment salary`，我们来分析一下。

在 ParentComponenet.tsx 中，我们看到点击 Increment age 按钮时，导致了 state 变化，ParentComponenet 进行了 rerender。`<Title />` 没有传入属性，React.memo 判断出不需要 rerender，但是 Increment salary 按钮上的属性 incrementSalary 方法，实际上被重新创建了，导致了这个 Button 传入的 props 发生了变化，因此 React.memo 没有阻止 rerender。点击按钮 Increment salary 导致的相同的现象也是同理。那么如何解决呢？答案是使用**useCallback hook**。

### useCallback

#### 什么是useCallback

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

>返回一个 memoized 回调函数。
>
>把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

类比到我们的例子中，useCallback 会缓存我们的 `incrementSalary()` 如果 salary 没有变化，直接返回缓存的值，如果 salary 发生变化，也就是 useCallback 的依赖发生变化，那么一个新的方法将被返回。

这就可以帮助我们解决只依赖某个变量的子组件避免不必要的 render 问题。

#### 如何使用useCallback

步骤如下：

1. import useCallback
2. 调用 useCallback

我们将 ParentComponenet.tsx 中的 incrementAge 和 incrementSalary 使用 useCallback 改写如下：

```jsx
const incrementAge = useCallback(
  () => {
    setAge(age + 1)
  },
  [age],
)

const incrementSalary = useCallback(
  () => {
    setSalary(salary + 1000)
  },
  [salary],
)
```

![img](https://user-gold-cdn.xitu.io/2020/5/18/17226e2be53124b0?imageslim)

可以看到，已经达到了我们的目的，点击 Increment age 时，salary 的按钮组件也没有 rerender。至此，我们已经完成了所有的性能优化。





## React的useMemo和useCallback的区别

useCallback 是缓存了函数自身，而 useMemo 是缓存了函数的返回值。

---

## React的useRef

useRef hook，它可以让我们直接访问到组件中的的 Dom 节点。我们今天通过一个 input 输入框获取焦点的需求为例，来学习一下 useRef。

### 页面载入 input 获取焦点示例

* FocusInput.tsx

```jsx
import React, { useEffect, useRef} from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  return (
    <div>
      <input ref={inputRef} type="text" />
    </div>
  )
}

export default FocusInput
```

* App.tsx

```jsx
import React from 'react'
import './App.css'

import FocusInput from './components/28FocusInput'

const App = () => {
  return (
    <div className="App">
      <FocusInput />
    </div>
  )
}

export default App
```

页面展示效果：

![img](https://user-gold-cdn.xitu.io/2020/5/26/1724cb32ada4ffc2?imageslim)

注意与 TypeScript 结合使用时的方式，需要先声明好泛型

```jsx
const inputRef = useRef<HTMLInputElement>(null)
```

同时使用时需要判空

```jsx
inputRef.current && inputRef.current.focus()
```

>`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

### 下面是几个适合使用refs的情况

* 管理焦点，文本选择或媒体播放。

* 触发强制动画。

* 集成第三方 DOM 库。

举例：

### 可以停止的计时器示例

需求是页面上有一个每隔1秒自动加一的计时器，并且有个按钮，点击后计时器停止，先使用 Class 组件完成这样的需求

#### Class 组件示例

ClassTimer.tsx

```jsx
import React, { Component } from 'react'

export default class ClassTimer extends Component<{}, { timer: number }> {
  interval!: number
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      timer: 0
    }
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState(prevState => ({
        timer: prevState.timer + 1
      }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        Timer - {this.state.timer}
        <br/>
        <button
          onClick={() => {
            clearInterval(this.interval)
          }}
        >Clear Timer</button>
      </div>
    )
  }
}
```

App.tsx

```jsx
import React from 'react'
import './App.css'

import ClassTimer from './components/29ClassTimer'

const App = () => {
  return (
    <div className="App">
      <ClassTimer />
    </div>
  )
}

export default App
```

![img](https://user-gold-cdn.xitu.io/2020/5/26/1724cb32af5a1f01?imageslim)



#### Function 组件示例

HookTimer.tsx

```jsx
import React, { useState, useEffect, useRef } from 'react'

function HookTimer() {
  const [timer, setTimer] = useState(0)

  //  @ts-ignore
  const intervalRef = useRef(null) as { current: number }

  useEffect(() => {
    // window.setInterval的返回值是一个id ， 所以上面是as {current: number}
    intervalRef.current = window.setInterval(() => {
      setTimer(pre => pre + 1)
    }, 1000)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])
  return (
    <div>
      HookTimer - {timer}
      <br />
      <button
        onClick={() => {
          clearInterval(intervalRef.current)
        }}
      >Clear Hook Timer</button>
    </div>
  )
}

export default HookTimer
```

* App.tsx

```jsx
import React from 'react'
import './App.css'

import ClassTimer from './components/29ClassTimer'
import HookTimer from './components/29HookTimer'

const App = () => {
  return (
    <div className="App">
      <ClassTimer />
      <hr />
      <HookTimer />
    </div>
  )
}

export default App
```

页面展示：

![img](https://user-gold-cdn.xitu.io/2020/5/26/1724cb32af74dd3b?imageslim)

---

## React的custom Hook

截至目前，学习了官方的这么多 hooks api，我们也可以创造一些自己的 hooks，甚至官方也在鼓励开发者将组件逻辑抽象到自定义 hooks 中，方便复用。

自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

### useDocumentTitle 示例

#### function 普通写法

我们想创建一个计数器，计数器的值改变后，希望改变页面的 Title

* DocTitleOne.tsx

```jsx
import React, { useState, useEffect } from 'react'

function DocTitleOne() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `Count - ${count}`
  }, [count])
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Count - {count}</button>
    </div>
  )
}

export default DocTitleOne
```

* App.tsx

```jsx
import React from 'react'
import './App.css'

import DocTitleOne from './components/31DocTitleOne'

const App = () => {
  return (
    <div className="App">
      <DocTitleOne />
    </div>
  )
}

export default App
```

![img](https://user-gold-cdn.xitu.io/2020/5/27/17251f2e9fb82029?imageslim)

运行没有问题，接下来又有一个需求的增量，就是页面要在另一个组件中也能改变页面的 Title，接下来我们创建一个新的组件。

* DocTitleTwo.tsx

```jsx
import React, { useState, useEffect } from 'react'

function DocTitleTwo() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `Count - ${count}`
  }, [count])
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Count - {count}</button>
    </div>
  )
}

export default DocTitleTwo
```

* App.tsx

```jsx
import React from 'react'
import './App.css'

import DocTitleOne from './components/31DocTitleOne'
import DocTitleTwo from './components/31DocTitleTwo'

const App = () => {
  return (
    <div className="App">
      <DocTitleOne />
      <DocTitleTwo />
    </div>
  )
}

export default App
```

页面效果如下：

![img](https://user-gold-cdn.xitu.io/2020/5/27/17251f2e9fee1aa2?imageslim)

回顾代码，DocTitleTwo 显然重复了 DocTitleOne 的代码，设想一下如果有 10 个组件都要修改页面 title 的话，你肯定不想重复这些代码。这时就需要自定义 Hook 了。

这个示例中，我们可以创建一个自定义 Hook 来设置页面的 title。然后使用这个自定义 Hook 在不同的组件中。

#### 抽象出 useDocumentTitle hook

* useDocumentTitle.tsx

```jsx
import { useEffect } from 'react'

function useDocumentTitle(count: number) {
  useEffect(() => {
    document.title = `Count - ${count}`
  }, [count])
}

export default useDocumentTitle
```

* DocTitleOne.tsx

```jsx
import React, { useState } from 'react'
import useDocumentTitle from './hooks/useDocumentTitle'

function DocTitleOne() {
  const [count, setCount] = useState(0)
  useDocumentTitle(count)
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Count - {count}</button>
    </div>
  )
}

export default DocTitleOne
```

* DocTitleTwo.tsx

```jsx
import React, { useState } from 'react'
import useDocumentTitle from './hooks/useDocumentTitle'

function DocTitleTwo() {
  const [count, setCount] = useState(0)
  useDocumentTitle(count)
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Count - {count}</button>
    </div>
  )
}

export default DocTitleTwo
```

* App.tsx

```jsx
import React from 'react'
import './App.css'

import DocTitleOne from './components/31DocTitleOne'
import DocTitleTwo from './components/31DocTitleTwo'

const App = () => {
  return (
    <div className="App">
      <DocTitleOne />
      <DocTitleTwo />
    </div>
  )
}

export default App
```

页面效果如下：

![img](https://user-gold-cdn.xitu.io/2020/5/27/17251f2e9fee1aa2?imageslim)

在 DocTitleOne 中，引入了我们定义的 useDocumentTitle，传入了 count 这个状态的值。useDocumentTitle 中执行代码，将页面title 初始值设置为 0，然后继续渲染 DocTitleOne jsx 部分。点击按钮时，count 变为 1，触发了 DocTitleOne 的 rerender，useDocumentTitle 中入参也变为了 1，将页面 title 变为 1。



更多可参考https://juejin.cn/post/6844904169539633166



---

## react的两个包协作

react和vue不同的是，react使用两个包协同工作

- react包：负责组件或者虚拟dom
- react-dom包：负责将组件或者虚拟dom插入到根节点

---

## Ts中的?:

`?:`是指可选参数，可以理解为参数自动加上undefined（或不一定需要这个参数？）

```js
function echo(x: number, y?: number) {
    return x + (y || 0);
}
getval(1); // 1
getval(1, null); // error, 'null' is not assignable to 'number | undefined'
```

```js
interface IProListForm {
  enterpriseId: string | number;
  pageNum: number;
  pageSize: number;
  keyword?: string; // 可选属性
}
```



---



## Redux

作用：状态管理的工具，相当于vue中的vuex

具体代码参见chao/kuaishou/react_study/react-redux

基本使用：

1. store 存放数据的仓库

2. state 数据仓库中存储的数据 store.getState();

3. action 对象：

   

   ```js
   const action = {
     type: 'ADD_ONE',
     num: 1
   }
   ```

4. dispatch        store.dispatch(action) 唯一的可以更改当前state的方法，他返回值也是个action

5. reducer 是一个函数，返回一个新的state(但需要dispatch来更改)

```js
const reducer = (state = 10, action) => {
  switch(action.type){
    case 'ADD':
      return state + action.num;
    case 'SQUARE':
      return state * state;
    case 'GET':
      return action.num
    default: 
      return state;
  }
}

export default reducer;
```



## 代码不懂的记录

```jsx
export const withLog = (fn1, fn2) => {
    return (...args) => {
        fn1.apply(null, args);
        fn2.apply(null, args);
    };
}
```



## @autobind 快速绑定class中constructor外的methods

之前通常这样实现：

```jsx
<button onClick={ this.handleClick.bind(this) }></button>
```

或

```jsx
class InputControlES6 extends React.Component { 
  constructor(props) {
    super(props); 
    // Set up initial state
    this.state = {
      text: props.initialValue || 'placeholder' 
    };
    // Functions must be bound manually with ES6 classes
    this.handleChange = this.handleChange.bind(this); 
  } 
  handleChange(event) {
    this.setState({ 
      text: event.target.value
    });
  } 
  render() {
    return (
      <div>
        Type something:
        <input onChange={this.handleChange}
          value={this.state.text} />
      </div>
    );
  }
}
```

上面是在生命handleChange后，再在constructor里手动去绑定它。



### @autobind

可通过@autobind 快速绑定我们 class 中 constructor 外的 methods，

```shell
npm install autobind-decorator
```

```jsx
import autobind from 'autobind-decorator'
 
class Component {
  constructor(value) {
    this.value = value
  }
 
  @autobind
  method() {
    return this.value
  }
}
 
let component = new Component(42)
let method = component.method // .bind(component) isn't needed!
method() // returns 42
 
 
// Also usable on the class to bind all methods
@autobind
class Component { }
```

## React.FC<>

React.FC<>的在typescript使用的一个泛型，FC就是FunctionComponent的缩写，是函数组件，在这个泛型里面可以使用useState，个人觉得useState挺好用的，例子如下：

```jsx
const SampleModel: React.FC<{}> = () =>{   //React.FC<>为typescript使用的泛型
    const [createModalVisible, handleModalVisible] = useState<boolean>(false); 
    return{
    {/** 触发模态框**/}
    <Button style={{fontSize:'25px'}}  onClick={()=>handleModalVisible(true)} >样例</Button>
    {/** 模态框组件**/}
    <Model onCancel={() => handleModalVisible(false)} ModalVisible={createModalVisible} /> 
  }
```

