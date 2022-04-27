/**
 * 双重循环
 */
function unique(array) {
    var res = [];// res用来存储结果
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
        for (var j = 0, resLen = res.length; j < resLen; j++ ) {
            if (array[i] === res[j]) {
                break;
            }
        }
        // 如果array[i]是唯一的，那么执行完循环，j等于resLen
        if (j === resLen) {
            res.push(array[i])
        }
    }
    return res;
}

/**
 * indexOf()-返回某个指定的字符串值在字符串中首次出现的位置
 */
function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    }
    return res;
}

/**
 * 排序后去重
 */
function unique(array) {
    var res = [];
    var sortedArray = array.sort();
    var seen;
    for (var i = 0, len = sortedArray.length; i < len; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        seen = sortedArray[i];
    }
    return res;
}

/**
 * 用filter使用indexOf（）的方法：
 */
function unique(array) {
    var res = array.filter(function(item, index, array){
        return array.indexOf(item) === index;//返回当前item在数组中第一次出现的位置等于当前位置的元素。
    })
    return res;
}

/**
 * Set
 */
var unique = (a) => [...new Set(a)];

var array = [1, 1, '1'];
