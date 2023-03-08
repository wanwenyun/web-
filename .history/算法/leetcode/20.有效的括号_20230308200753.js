/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 * 解题思路：栈
 */
var isValid = function(s) {
    let res = [];
    let map = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    for(c of s){
        if(c === '(' || c === '{' || c === '['){
            res.push(c);
        } else {
            if(res.length > 0) {
                let tmp = res.pop();
                if(map[c] !== tmp) return false;
            }
            return false;

        }
    }
    return !!(res.length === 0)
};
// @lc code=end

console.log(isValid("()"));
