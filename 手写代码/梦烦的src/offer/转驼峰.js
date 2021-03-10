//TODO: 转化为驼峰命名
var s1 = "get-element-by-id"

// 转化为 getElementById

function transform(str) {
  return str.replace(/-\w/g, function (s) {
    return s.slice(1).toUpperCase()
  })
}
