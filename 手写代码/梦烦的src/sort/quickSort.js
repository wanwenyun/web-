
function quickSort(arr, start, end) {
  let i = start, j = end, base = arr[end]
  if (start >= end) {
    return
  }

  while (i < j) {
    while (i < end && i < j && arr[i] <= base) {
      i++
    }
    while (j > start && i < j && arr[j] >= base) {
      j--
    }
    if (i < j) {
      let t = arr[i]
      arr[i] = arr[j]
      arr[j] = t
    }
  }
  let t = arr[i]
  arr[i] = base
  arr[end] = t
  quickSort(arr, start, i - 1)
  quickSort(arr, i + 1, end)
}

let arr = [49, 38, 65, 97, 76, 13, 27]
quickSort(arr, 0, arr.length - 1)
console.log(arr)


