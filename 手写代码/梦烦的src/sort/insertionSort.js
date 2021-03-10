// 直接插入排序

/***
 * 假定前面序列有序，从前往后扫描，如果比前面数小，就依次交换，直至前面保持有序
 * @param arr
 */
function insertionSort(arr) {
	let current
	for (i = 1; i < arr.length;i++) {
		current= arr[i]
		let j = i-1;
		while (j >= 0 && current<arr[j]) {
			let temp = arr[j+1]
			arr[j+1] = arr[j]
			arr[j] = temp
			j--
		}
	}
}

let arr = [49,38,65,97,76,13,27,27,27]
insertionSort(arr)
console.log(arr)

