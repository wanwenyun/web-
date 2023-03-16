/*
 * @lc app=leetcode.cn id=787 lang=javascript
 *
 * [787] K 站中转内最便宜的航班
 */

// @lc code=start
/**
 * @param {number} n 有n个城市
 * @param {number[][]} flights flights[i] = [fromi, toi, pricei]
 * @param {number} src 出发地
 * @param {number} dst 目的地
 * @param {number} k 最多经过多少站
 * @return {number}
 * 动态规划
 * dp(dst, k) 表示在k步之内，到达节点 dst 的最小路径权重
 * 状态转移方程：
 * dp(dst, k) = min(dp(s1, k - 1) + w1,  dp(s2, k - 1) + w2)
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    // 将中转站个数转化成边的条数
    k++;

};

// 定义在k步之内，到达节点 s 的最小路径权重
var dp = function(s, k) {
    // 从 src 到 src，一步都不用走
    if (s === src) {
        return 0;
    }
    // 如果步数用尽，就无解了
    if (k === 0) {
        return -1;
    }

    // 初始化为最大值，方便等会取最小值
    let res = Infinity;
 
    // ...
};

// @lc code=end

