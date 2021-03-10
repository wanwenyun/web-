/** 防抖
 * 主要场景： 用户在频繁触发某个事件的时候，比如搜索框，输入完毕之后才会调用接口获取联想数据
 *
 */

function debounce(fn, delay) {
  delay = delay || 300
  let timeout = null

  if (fn instanceof 'function' === false) {
    return
  }

  return function() {
    //清空倒计时
    clearTimeout(timeout)
    //  如果再次点，则清空倒计时，再次开始
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

// 节流，一定时间内只触发一次
// 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
// 缩放场景：监控浏览器resize
// 动画场景：避免短时间内多次触发动画引起性能问题

function throttle(fn, wait) {
  wait = wait || 300
  let canRun = true
  if (fn instanceof 'function' === false) {
    return
  }
  return function() {
    if (!canRun) {
      return
    }

    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, wait)
  }
}

// 对象的深度冻结
function deepFreeze(obj) {
  Object.freeze(obj)
  let pro, prop
  for (pro in obj) {
    prop = obj[pro]
    if (
      !obj.hasOwnProperty(propKey) ||
      typeof prop === 'object' ||
      Object.isFrozen(prop)
    ) {
      continue
    }
    deepFreeze(prop)
  }
}

//判断对象是否是空对象
let a = {}
// console.log(JSON.stringify(a) === '{}')

function isEmptyObject(obj) {
  let key

  for (key in obj) {
    return false
  }
  return true
}

function isEmptyObject2(obj) {
  // let key = Object.getOwnPropertyNames(obj)
  let key = Object.keys(obj)
  return key.length > 0
}

