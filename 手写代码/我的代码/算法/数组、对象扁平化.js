/**
 * 数组扁平化
 * @param {*} arr 
 */
function flatten_1(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten_1(arr[i]))
        }
        else {
            result.push(arr[i])
        }
    }
    return result;
}

function flatten_2(arr) {
    return arr.toString().split(',').map(function(item){
        return +item;// 字符串转数字，split返回的是一个字符串数组
    })
}

function flatten_3(arr) {
    while (arr.some(item => Array.isArray(item))) { //some() 方法用于检测数组中的元素是否满足指定条件
        arr = [].concat(...arr);
    }
    return arr;
}

function flatten_4(arr) {
    return arr.flat(Infinity); //使用 Infinity 作为深度，展开任意深度的嵌套数组
}

var arr = [1, [2, [3, 4]]];
console.log(flatten_4(arr));




/**
 * 对象扁平化
 * @param {*} obj 
 */
function flatObject(obj,string) {
    for(item in obj){
        let str;
        if(string == ''){
            str = item
        }else{
            str = string + '.'+item;
        }
        if(Object.prototype.toString.call(obj[item]) == '[object Object]'){
            flatObject(obj[item],str);
        }else{
            console.log(str + '=' + obj[item]);
        }
    }
}


var test = {
    bar:'a',
    foo:{
        a:'a',
        b:'b'
    },
    arr:[1,2,3]
}
/* 要求输出形式
bar = 'a'
foo.a = 'a'
foo.b = 'b'
arr = 1,2,3
*/
flatObject(test,'');