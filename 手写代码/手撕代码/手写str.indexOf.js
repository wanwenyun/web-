function myIndexOf(str, target, fromIndex) {
    let start = fromIndex ? fromIndex : 0;
    for(; start < str.length; start++) {
        if(str.charAt(start) === target) return start;
    }
    return -1;
}

console.log(myIndexOf('abcdrs', 'b', 2));