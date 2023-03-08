/*
 * @lc app=leetcode.cn id=921 lang=javascript
 *
 * [921] 使括号有效的最少添加
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function(s) {
    let res = 0;
    let needRight = 0; // 需要')'的个数
    for(c of s) {
        if(c === '(') {
            needRight++
        } else {
            needRight--;
            if(needRight < 0) {
                needRight = 0;
                // 在左边插入'('
                res++;
            }
        }
    }
    return res + needRight;
};
// @lc code=end

