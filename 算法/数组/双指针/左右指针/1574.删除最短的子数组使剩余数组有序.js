/*
 * @lc app=leetcode.cn id=1574 lang=javascript
 *
 * [1574] 删除最短的子数组使剩余数组有序
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 * 双指针
 * 需要一个初始指向尾部的指针，将其不断地往前移动，直到指向的元素小于前一个元素为止
 */
var findLengthOfShortestSubarray = function(arr) {
    let len = arr.length
    let res = len;
    let left = 0;
    let right = len - 1;

    // 找左边界
    while (left < len - 1 && arr[left] <= arr[left + 1]) left++;
    if (left + 1 === len) {
        return 0;
      }
    // 找右边界
    while (right > 0 && arr[right - 1] <= arr[right]) right--;

    let i = 0,
    j = right;

    res = Math.min(len-1-left, right); // 初始状态，极端假设，去掉右边全部或者去掉左边全部

    while(i<=left && j <= len-1){
        if(arr[i] <= arr[j]){
            res = Math.min(res, j-i-1); // 去掉双指针中间的
            i++;
        }else{
            j++;
        }
    }
    return res;
};

console.log(findLengthOfShortestSubarray([1,2,3,10,4,2,3,5]));
// @lc code=end

