`unstated-next`这个库只做了一件事情：

提供 createContainer 将自定义 Hooks 封装为一个数据对象，提供 Provider 注入与 useContainer 获取 Store 这两个方法。

源码

```js
export function createContainer(useHook) {
  let Context = React.createContext(null);

  function Provider(props) {
    let value = useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  function useContainer() {
    let value = React.useContext(Context);
    if (value === null) {
      throw new Error("Component must be wrapped with <Container.Provider>");
    }
    return value;
  }

  return { Provider, useContainer };
}
```