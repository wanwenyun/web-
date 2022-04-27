/**
* url参数匹配，输出参数键值对
*/
function urlMatch(url) {
	if(url.indexOf('?')>-1){
		var params = url.split('?')[1].split('&');
		var result = [];
		for(item of params){
			result.push({
				key: item.split('=')[0],
				value: item.split('=')[1]
			})
		}
		return result;
	}else{
		return false;
	}
} 

var url = 'http://witmax.cn/index.php?key0=0&key1=1&key2=2&key2=4';
console.log(urlMatch(url));