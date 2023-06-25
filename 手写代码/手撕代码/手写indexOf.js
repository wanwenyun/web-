function myIndexOf(data, target, fromIndex) {
    let isArray = Array.isArray(data);
    let isString = Object.prototype.toString.call(data) == '[object String]';

    // 如果是数组
    if(isArray) { 
        let start = fromIndex ? fromIndex : 0;
        for(; start < data.length; start++) {
            if(data[start] === target) return start;
        }
        return -1;
    }

    // 如果是字符串
    if(isString) {
        let reg = new RegExp(`${target}`, 'g') // 为了支持lastIndex，自定义开始匹配位置，需要开启'g'，全局匹配
        reg.lastIndex = fromIndex ? fromIndex : 0; // 初始化开始搜索位置，lastIndex用来指定下一次匹配的起始索引。
        // 执行匹配
        let ret = reg.exec(data)
        return ret ? ret.index : -1;
    }
}

console.log(myIndexOf([3,4,1,4], 4, 2));