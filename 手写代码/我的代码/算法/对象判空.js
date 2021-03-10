//判断对象是否是空对象
let a = {}


console.log(JSON.stringify(a) === '{}')


function isEmptyObject2(obj) {
  // let key = Object.getOwnPropertyNames(obj)
  let key = Object.keys(obj)
  return key.length > 0
}

