function getArrayDepth(arr) {
    const depths = []
    arr.forEach( ele => {
      let depth = 0
      if (Array.isArray(ele)) { // 判断是否是数组，如果是就递归，深度加1
        depth = getArrayDepth(ele)
      }
      depths.push(depth) // 将数组第一层每个元素的深度push进去
    })
    return 1 + max(depths)
  }
   
  function max(arr) { // 获取最大深度
    return arr.reduce( (accu, curr) => {
      if (curr > accu) return curr
      return accu
    })
  }

  var arr = [1, 2, 3, 4, 5, [6], [[7,[2,1]], [8]]];

  console.log(getArrayDepth(arr));