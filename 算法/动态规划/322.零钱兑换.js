/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 * // 解法一：带备忘录的递归（如果用暴力递归，会超时）
 * 1. 确定 base case，显然目标金额 amount 为 0 时算法返回 0，因为不需要任何硬币就已经凑出目标金额了。
 * 2. 确定「状态」，也就是原问题和子问题中会变化的变量。由于硬币数量无限，硬币的面额也是题目给定的，只有目标金额会不断地向 base case 靠近，所以唯一的「状态」就是目标金额 amount。
 * 3. 确定「选择」，也就是导致「状态」产生变化的行为。所有硬币的面值，就是你的「选择」。
 * 4. 明确 dp 函数/数组的定义。dp(n) 表示，输入一个目标金额 n，返回凑出目标金额 n 所需的最少硬币数量。
 */
var coinChange = function(coins, amount) {
    let memo = new Array(amount+1).fill(-99);
    return dp(coins, amount, memo);
};

// 定义：要凑出金额 n，至少要 dp(coins, n) 个硬币
var dp = function(coins, amount, memo) {
    let res = Infinity;

    // base case
    if(amount === 0) return 0;
    if(amount < 0 ) return -1;
    // 查备忘录，防止重复计算
    if (memo[amount] != -99)
        return memo[amount];

    // 做选择，选择需要硬币最少的那个结果
    for(let i=0; i<coins.length; i++) {
        // 计算子问题的结果
        let subProblem = dp(coins, amount - coins[i], memo);
        // 子问题无解则跳过
        if (subProblem == -1) continue;
        res = Math.min(res, 1 + subProblem);
    }
    // 把计算结果存入备忘录
    memo[amount] = (res === Infinity ? -1 : res);
    return res === Infinity ? -1 : res;
}
// @lc code=end

/**
 * 解法二：dp 数组的迭代解法
 * dp 数组的定义：当目标金额为 i 时，至少需要 dp[i] 枚硬币凑出。
 * 状态转移方程：dp[i] = Math.min(dp[i], dp[i-coin]+1);
 * @param {*} coins 
 * @param {*} amount 
 */
var coinChange2 = function(coins, amount) {
    let dp = new Array(amount+1).fill(Infinity);

    // base case
    dp[0] = 0;
    
    // 外层 for 循环在遍历所有状态的所有取值
    for(let i = 0 ; i < dp.length; i++) {
        for(let coin of coins) {
            // 子问题无解，跳过
            if (i - coin < 0) {
                continue;
            }
            dp[i] = Math.min(dp[i], dp[i-coin]+1); // 选择面值为coin的硬币
        }
    }
    return (dp[amount] == Infinity) ? -1 : dp[amount];
};

console.log(coinChange2([1,2,5], 11));