function bubbleSort(arr) {
	let flag = false
	for (let i=0;i<arr.length;i++) {
		let j = arr.length-1;
		flag = false
		while (j > i) {
			if(arr[j] < arr[j-1]) {
				let  temp = arr [j-1]
				arr[j-1] = arr[j]
				arr[j] = temp
				flag = true
			}
			j--
		}
		if(flag === false) {
			break
		}
	}
}
let arr = [49,38,65,97,76,13,27,27,27]
bubbleSort(arr)
console.log(arr)
