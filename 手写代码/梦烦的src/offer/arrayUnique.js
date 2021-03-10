/**
 * 数组去重
 * @param arr
 * @returns {any[]}
 */

function unique_set(arr) {
	if (!Array.isArray(arr)) {
		return
	}
	return Array.from(new Set(arr))
}

//[ 1, 'true', true, 15, false, undefined, null, NaN, 'NaN', 0, 'a', {}, {} ]
/**
 * 数组有序
 * @param arr
 */
function unique_arr(arr) {
	if (!Array.isArray(arr)) {
		return
	}
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i] === arr[j]) {
				arr.splice(j, 1)
			}
		}
	}
	return arr
}

//[ 1, 'true', true, 15,false, undefined,null,NaN, NaN,'NaN', 0, 'a', {}, {} ]

/**
 * 利用indexOf去重 / includes
 * @param arr
 * @returns {*}
 */
function unique_arr2(arr) {
	if (!Array.isArray(arr)) {
		console.log('type error')
		return
	}
	let arr_u = []
	for (let i = 0; i < arr.length; i++) {
		// if(arr_u.indexOf(arr[i]) === -1) {
		// 	arr_u.push(arr[i])
		// }
		if (!arr_u.includes(arr[i])) {
			arr_u.push(arr[i])
		}
	}
	return arr_u
}

/**
 * 排完序 再去重
 * @param arr
 */
function unique_sort(arr) {
	if (!Array.isArray(arr)) {
		return
	}
	arr = arr.sort()
	let arr_u = [arr[0]]
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] !== arr[i - 1]) {
			arr_u.push(arr[i])
		}
	}
}


/**
 *
 * 利用filter
 */

function unique_filter(arr) {
	if (!Array.isArray(arr)) {
		return
	}
	return arr.filter((item, index, arr) => arr.indexOf(item, 0) === index)
}

/**
 *
 * reduce  参数： callback(accumulator, cur,curIndex)  , cailback 第一个参数的初始值
 */
function unique_reduce(arr) {
	if (!Array.isArray(arr)) {
		return
	}
	return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], [])
}


let arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];

console.log(unique_filter(arr))
