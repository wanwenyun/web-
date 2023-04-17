function quickSort(arr) {
    let len = arr.length
    if(len < 2) return arr;
    
    let mid = Math.floor(len / 2);
    let value = arr[mid];
    arr.splice(mid,1); // 删除mid
    let left = [];
    let right = [];

    for(let i = 0; i < len - 1; i++) {
        if(arr[i] < value){
            left.push(arr[i]);
        }else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), value, ...quickSort(right)]
}

let arr = [2,5,44,19,24,66,48,9,10,31];
console.log(quickSort(arr))