// TODO: 深克隆， 解决循环引用， 不同类型的克隆
// https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1?utm_source=gold_browser_extension#heading-14

// 可遍历对象
const mapType =  '[object Map]'
const setType =  '[object Set]'
const arrayType = '[object Set]'
const objectType = '[object Object]'
const argsType =  '[object Arguments]'

// 不可遍历对象
const boolType = '[object Boolean]'
const numberType = '[object Number]'
const stringType = '[object String]'
const dateType = '[object Date]'
const errorType = '[object error]'
const regExpType = '[object RegExp]'
const symbolType = '[object Symbol]'
const funcType = '[object Function]'

const deepType = [mapType, setType, arrayType, objectType, argsType]

function getType(obj) {
  return Object.prototype.toString.call(obj)
}

function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target))
}

function cloneReg(target) {
  const reFlags = /\w*$/
  const result = new target.constructor(target.source, reFlags.exec(target))
  result.lastIndex = target.lastIndex
  return result
}

function cloneOtherType(target, type) {
  switch (type) {
    case boolType:
    case numberType:
    case stringType:
    case dateType:
    case errorType:
      return getInit(target)
    case regExpType:
      return cloneReg(target)
    case symbolType:
      return cloneSymbol(target)
    case funcType:
      return target
    default:
      return null
  }
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if(!isObject(target)) {
    return target
  }

  // 初始化
  const type = getType(target)

  let cloneTarget

  if(deepType.includes(type)) {
    cloneTarget = getInit(target, type)
  } else {
    return cloneOtherType(target, type)
  }

  // 防止循环引用
  if(map.get(target)) {
    return map.get(target)
  }

  map.set(target, cloneTarget)

  // set 克隆
  if(type === setType) {
    target.forEach(val => {
      cloneTarget.add(clone(val))
    })

    return cloneTarget
  }

  // map 克隆
  if(type === mapType) {
    target.forEach((val, key) => {
      cloneTarget.set(key, clone(val))
    })
    return cloneTarget
  }

  for(const key in target) {
    cloneTarget[key] = clone(target[key], map)
  }

  return  target
}

const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code秘密花园');
  },
  func2: function (a, b) {
    return a + b;
  }
};

console.log(clone(target))


