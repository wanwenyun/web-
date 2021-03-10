/**
* 反转整数：
* 给定一个 32 位有符号整数，将整数中的数字进行反转，
* 当颠倒后的整数溢出时，返回 0。当尾数为0时候需要进行舍去，
* 
* 思路：整数转数组，然后再反转。
* 注意点：1. 负数 2. 末尾0 3. 颠倒后整数溢出
*/

function reverseInteger(n) {
	var res;
	if(n < 0){
		n = n.toString().split('-')[1]; // 将负号切分出来，并将提取数组部分
		n = '-'+[...n].reverse().join(''); // 先让n解构成数组，然后反转，然后再连接成字符串
		n = +n; // 字符串转number,这一步就去零了
	}else{
		n = [...n].reverse().join('');
		n= +n;
	}

	if(n >= Math.pow(2, 31) - 1 || n <= Math.pow(-2, 31) + 1){	//判断溢出,pow(2,31)表示2的31次方
		return 0;
	}

	return n;
}

console.log(reverseInteger(-1230));