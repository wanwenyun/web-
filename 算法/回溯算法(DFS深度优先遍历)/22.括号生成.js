/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 * 1. 回溯
 * 2. 动态规划
 * 3. 栈
 * 
 * 括号问题的性质：
 * 1. 一个「合法」括号组合的左括号数量一定等于右括号数量。
 * 2. 对于一个「合法」的括号字符串组合 p，必然对于任何 0 <= i < len(p) 都有：子串 p[0..i] 中左括号的数量都大于或等于右括号的数量。
 */
/**
 * 回溯算法思路：
 * 题目等同于 => 现在有 2n 个位置，每个位置可以放置字符 ( 或者 )，组成的所有括号组合中，有多少个是合法的？
 * 
 * 组合类问题
 */
var generateParenthesis = function(n) {
    let res = [];
    let track = [];
    
    // 对于每个位置可以是左括号或者右括号两种选择
    var choices = ['(', ')'];

    // trcak中左括号数量为 left 个，右括号数量为 rgiht 个
    var backtrack = function(left, right) {
        // 若右括号多于左括号，说明不合法
        if (right > left) return;
        // 数量大于 n 肯定是不合法的
        if (left > n || right > n) return;
        // 当所有左右括号都等于n时，得到一个合法的括号组合
        if (left === n && right === n) {
            res.push(track.join(''));
            return;
        }


        // 放左括号'('
        track.push('(');
        backtrack(left+1, right);
        track.pop();
    
        // 放右括号')'
        track.push(')');
        backtrack(left, right+1);
        track.pop();
    }

    backtrack(0,0);
    return res;
};


// @lc code=end

