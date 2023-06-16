在NodeJS中，中间件主要是指封装http请求细节处理的方法。我们都知道在http请求中往往会涉及很多动作, 如下:
- IP筛选
- 查询字符串传递
- 请求体解析
- cookie信息处理
- 权限校验
- 日志记录
- 会话管理中间件(session)
- gzip压缩中间件(如compress)
- 错误处理


```js
// 定义几个中间间函数
const m1 = (req, res, next) => {
  console.log('m1 run')
  next()
  console.log('m1 run end')
}

const m2 = (req, res, next) => {
  console.log('m2 run')
  next()
  console.log('m2 run end')
}

const m3 = (req, res, next) => {
  console.log('m3 run')
  next()
  console.log('m3 run end')
}

// 中间件集合
const middlewares = [m1, m2, m3]

function useApp (req, res) {
  const next = () => {
    // 获取第一个中间件
    const middleware = middlewares.shift()
    if (middleware) {
      middleware(req, res, next)
    }
  }
  next()
}

// 第一次请求流进入
useApp()
```