/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 */

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 * 思路：左右指针
 */
var reverseString = function(s) {
    let left = 0, right = s.length - 1;
    while(left < right) {
        const c = s[left];
        s[left] = s[right];
        s[right] = c;
        left++;
        right--;
    }
    return s;
};
// @lc code=end

