/*
 * @lc app=leetcode.cn id=204 lang=javascript
 *
 * [204] 计数质数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 * 素数筛选法
 * 首先从 2 开始，我们知道 2 是一个素数，那么 2 × 2 = 4, 3 × 2 = 6, 4 × 2 = 8… 都不可能是素数了。
 * 然后我们发现 3 也是素数，那么 3 × 2 = 6, 3 × 3 = 9, 3 × 4 = 12… 也都不可能是素数了。
 */
var countPrimes = function(n) {
    // 布尔数组，初始时所有下标对应的值都为 true
    let isPrime = new Array(n).fill(true);
    // 从下标为 2 的数开始枚举
    for (let i = 2; i < n; i++) {
      // 若该下标对应的数为素数，则将其倍数的下标对应的值全部变为 false
      if (isPrime[i]) {
        for (let j = 2 * i; j < n; j += i) {
          isPrime[j] = false;
        }
      }
    }
    // 遍历一遍布尔数组，数出素数的个数
    let count = 0;
    for (let i = 2; i < n; i++) {
      if (isPrime[i]) {
        count++;
      }
    }
    return count;
};
console.log(countPrimes(10));
// @lc code=end

