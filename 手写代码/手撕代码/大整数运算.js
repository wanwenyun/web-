/** 
* 大整数相加
* 数组存储，按位相加
* 形参为string
*/
function bigNumAdd(a,b) {
	var a = a.split('');
	var b = b.split('');
	var res = [];
	var carry = 0; // 记录进位
	var len = Math.max(a.length,b.length);
	var i = len;
	while(i--){
		var sum = (+a[i - len + a.length] || 0) + (+b[i - len + b.length] || 0) + carry;
		carry = parseInt(sum / 10); // parseInt转1十进制，计算进位
		res.unshift(sum % 10); // 余数， 将元素添加到数组的开头
	}
	if (carry) res.unshift(carry);
    return res.join(''); // 数组转字符串
}

console.log(bigNumAdd('5554433','11223347777'));