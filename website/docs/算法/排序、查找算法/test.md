```javascript
var binarySearch = function (nums, target) {
    let len = nums.length;
    let left = 0, right = len - 1;
    while(left <= right) {
        let mid = Math.round(left + (right - left) / 2);
        if(nums[mid] === target) return mid;
        if(nums[mid] < target) left = mid + 1;
        if(nums[mid] > target) right = mid - 1;
    }
    return false
}

let arr = [2,5,9,10,19,24,31,44,48,66];
console.log(binarySearch(arr, 19))
```