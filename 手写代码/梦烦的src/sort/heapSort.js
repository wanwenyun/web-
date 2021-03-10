function heapSort(array) {
  buildHeap(array)
  let i = array.length - 1

  while (i > 0) {
    let temp = array[i]
    array[i] = array[0]
    array[0] = temp
    adjustDown(array, 0, i)
    i--
  }
}

function buildHeap(array) {
  let len = array.length
  let i = Math.floor((array.length - 2) / 2)
  while (i >= 0) {
    adjustDown(array, i, len)
    i--
  }
}

function adjustDown(array, index, len) {
  let child = 2 * index + 1
  let p = index

  if (child < len - 1 && array[child] < array[child + 1]) {
    child++
  }

  while (child < len && array[p] < array[child]) {
    let temp = array[p]
    array[p] = array[child]
    array[child] = temp

    p = child
    child = 2 * p + 1
    if (child < len - 1 && array[child] < array[child + 1]) {
      child++
    }
  }
}

function minK(array, k) {
  if (k >= array.length) return array
  let minK = array.slice(0, k)
  buildHeap(minK)
  for (let i = k; i < array.length; i++) {
    if (minK[0] > array[i]) {
      minK[0] = array[i]
      adjustDown(minK, 0, k)
    }
  }
}

function minK_while(array, k) {
  let i = 0, j = array.length - 1, p = Infinity
  while (p !== k - 1) {
    p = partition(array, i, j)
    if (p < k - 1) {
      i = p + 1
    }

    if (p > k - 1) {
      j = p - 1
    }
  }
}

function partition(array, start, end) {
  let i = start, j = end
  let base = array[end]
  while (i < j) {
    while (i < end && i < j && array[i] <= base) {
      i++
    }
    while (j >= start && i < j && array[j] >= base) {
      j--
    }
    if (i < j) {
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  let temp = array[i]
  array[i] = array[end]
  array[end] = temp
  return i
}

let arr = [49, 38, 65, 97, 76, 13, 27]
minK_while(arr, 3)
let  k =1
while (k<=arr.length) {
  let arr = [49, 38, 65, 97, 76, 13, 27]
  minK_while(arr, k)
  console.log(arr)
  console.log(arr[k-1])
  k++
}


