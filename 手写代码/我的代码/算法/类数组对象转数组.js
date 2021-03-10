/**
 * for循环遍历
 */
function transformsArrs(obj) {
    var arr = [];
    for(var i = 0 ; i < obj.length ; i++){
        arr.push(obj[i]);
    }
    return arr;
}

/**
 * Array.prototype.slice.call();
 */
function transformsArrs2(obj) {
    var arr = Array.prototype.slice.call(obj);// var argsArray = [].slice.call(arguments);
    return arr;
}

/**
 * Array.from()
 */
function transformsArrs3(obj) {
    var arr = Array.from(obj);
    return arr;
}


var obj = {
    0:42,
    1:52,
    2:63,
    length:3
}
console.log(transformsArrs3(obj));