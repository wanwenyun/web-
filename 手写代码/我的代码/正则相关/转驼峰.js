/**
* {
    a_b:{} 
    a_c:[]
  }
  转为：
  {
    aB:{}
    aC:[]
  }
  思路：
  1. 递归
  2. 正则替换/-\w/g
*/
function isObject(obj) {
	return Object.prototype.toString.call(obj) == '[object Object]';
}

function isArray(arr) {
	return Object.prototype.toString.call(arr) == '[object Array]';
}

function rename(str) {
	return str.replace(/-\w/g, (s) => {return s.slice(1).toUpperCase();});
}


function transform(json) {
	if(isObject(json)){
		var tmp = {}
		Object.keys(json).forEach(key => {
			tmp[rename(key)] = transform(json[key]); // 因为属性的值有可能是个Object，所以要递归处理
		})
		return tmp;
	}else if(isArray(json)){
		return json.map(e=>{transform(e)});// map()方法返回一个新数组,数组中的元素为原始数组元素调用函数处理后的值。
	}
	else{
		return json;
	}
}

let test = {
  'a-b':{
    'a-b-a':"ss",
    'a-b-b':{
      'a-b-b-a' :'1'
    },
    'a-b-c':[{'a-b-c-c':1},[{'a-b-c-c-c-c':1}]]
  }
}
console.log(transform(test));