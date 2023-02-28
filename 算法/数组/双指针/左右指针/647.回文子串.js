/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 * 解法1：左右指针 + 中心扩展法
 */
var countSubstrings = function(s) {
    let res = 0;
    var helper = function(left, right) {
        while(left >=0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
            res++;
        }
    }

    for (var i = 0; i < s.length; i++){
        // s长度为奇数的情况
        helper(i, i);
        // s长度为奇数的情况
        helper(i, i+1);
    }

    return res;
};

// @lc code=end

