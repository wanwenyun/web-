/**
* 实现阶乘
* 方法：1. for循环 2. 递归
*/

// for循环
function factorial(n) {
	if(n <= 1) return 1;
	var res = 1;
	for (var i = 0; i < n; i++) {
		res = res * (i + 1);
	}
	return res;
}

// 递归
function factorial2(n){
	if (n <= 1) return 1;
	return n * factorial2(n - 1);
}

console.log(factorial2(1));