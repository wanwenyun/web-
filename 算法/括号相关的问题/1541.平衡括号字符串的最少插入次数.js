/*
 * @lc app=leetcode.cn id=1541 lang=javascript
 *
 * [1541] 平衡括号字符串的最少插入次数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function(s) {
    let res = 0;
    let needRight = 0; // 需要')'的个数
    for(c of s) {
        if(c === '(') {
            needRight += 2;
            if(needRight % 2 === 1) { // ')'多了一个
                needRight--;
                res++;
            }
        } else {
            needRight--;
            if(needRight === -1) { // ')'多了一个
                needRight = 1; // 再加一个')'
                res++; // 插入一个'('
            }
        }
    }
    return res + needRight;
};
// @lc code=end

