/*
 * @lc app=leetcode.cn id=1630 lang=javascript
 *
 * [1630] 等差子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number[]} l
 * @param {number[]} r
 * @return {boolean[]}
 * 利用Array.sort先对子数组进行排序，然后用循环去判断差额
 */
var checkArithmeticSubarrays = function(nums, l, r) {
    let m = l.length;
    let res = [];
    for(let i = 0; i < m; i++) {
        let arr = getArr(nums, l[i], r[i])
        let diff = arr[1] - arr[0];
        let tmp = true;
        for(let j = 1; j < arr.length - 1; j++) {
            if(diff !== arr[j+1] - arr[j]) tmp = false;
        }
        res.push(tmp);
    }
    return res;
};

// 获取子数组并排序
var getArr = (nums, start, end) => {
    return nums.slice(start, end+1).sort((a, b) => a - b);
}

console.log(checkArithmeticSubarrays([4,6,5,9,3,7], [0,0,2], [2,3,5]));
// @lc code=end

