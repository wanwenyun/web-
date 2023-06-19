var addStrings = function(num1, num2) {
    let arr1 = num1.split(''), arr2 = num2.split('');
    let addOne = 0; // 标记进位
    let res = '' ; 
    console.log('arr1, arr2',arr1, arr2);
    while(arr1.length > 0 || arr2.length > 0) {
        let tmpa = arr1.pop(), tmpb = arr2.pop();
        let a = tmpa ? Number(tmpa) : 0;
        let b = tmpb ? Number(tmpb) : 0;
        console.log('a,b:',a,b);
        let sum = a + b + addOne;
        console.log('sum',sum);
        addOne = sum >= 10 ? 1 : 0;
        res = sum.toString().split('').pop() + res;
        console.log('res',res);
    }
    res = addOne > 0 ? '1' + res : res;
    return res;
};

console.log(addStrings("1", "9"))