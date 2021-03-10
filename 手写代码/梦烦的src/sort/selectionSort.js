// 选择排序

/**
 * 遍历选择当前最小额放到前面
 */
function selectionSort(arr) {
	let currentMin,temp
	for (let i = 0; i < arr.length; i++) {
		currentMin = i
		for (let j=i+1;j < arr.length;j++) {
			if(arr[j] < arr[currentMin]) {
				currentMin = j
			}
		}
		temp = arr[i]
		arr[i] =arr[currentMin]
		arr[currentMin] = temp
	}
}

let arr = [49,38,65,97,76,13,27,27,27]
selectionSort(arr)
console.log(arr)
