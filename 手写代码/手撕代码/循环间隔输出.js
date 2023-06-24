/**
* 循环间隔1秒输出数组元素
*/
function delayedOutput (arr) {
	for (var i = 0; i < arr.length; i++) {
		setTimeout(console.log(arr[i]),10000);  // 这样写是不对的，结果是一起输出，并没有等待一秒
	}
}

function delayedOutput2(arr) { //使用闭包
	var i = 0;
	return (function a(){
		setTimeout(function(){
			console.log(arr[i++]);
			i < arr.length && a(i);
		},1000)
	})(i) // 如果外面不包裹一层()(i),那这个闭包被返回出去就不会被执行
}

var arr = [1,2,3,4,5,6,7];
delayedOutput2(arr);