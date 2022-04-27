/**
* 全排列：输入一个数字n，输出从1到n的所有排列，如输入3，输出123、132、213、231、312、321
* 解法：递归，先固定一个数，剩下的再进行全排列
*/
function fullPermutation(n) {
	if(n == 1)
		return 1;
	var arr = new Array(n);
	for(let i = 0 ; i < n ; i++) // 生成数组
		arr[i] = i+1;

	permutation(arr);
}

function permutation(arr) {
	var 
}