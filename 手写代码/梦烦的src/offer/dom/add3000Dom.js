// TODO: 添加30000个li节点， 并设置监听函数

// https://juejin.im/post/58f558efac502e006c3e5c97

function add3000Li(total) {
  const ndContainer = document.getElementById('list')

  if(!ndContainer) {
    return
  }

  const batchSize =  4 // 每次插入的节点数
  const batchCount = total / batchSize // 需要处理的次数
  let batchDone = 0 // 已处理的次数

  function appendItems() {
    const fragment = document.createDocumentFragment()
    for(let i=0; i< batchSize;i++) {
      const ndItem = document.createElement('li')
      ndItem.innerText = (batchSize * batchDone) + i + 1
      fragment.appendChild(ndItem)
    }

    ndContainer.appendChild(fragment)

    batchDone++
    doBatchAppend()
  }

  // 利用 requestAnimationFrame 更新 DOM
  function doBatchAppend() {
    if(batchDone < batchCount) {
      window.requestAnimationFrame(appendItems)
    }
  }

  doBatchAppend()

  ndContainer.addEventListener('click', function(e) {
    const target = e.target
    if(target.tagName === 'LI') {
      console.log(target.innerText)
    }
  })

}

