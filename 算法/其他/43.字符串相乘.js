/*
 * @lc app=leetcode.cn id=43 lang=javascript
 *
 * [43] 字符串相乘
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    let m = num1.length;
    let n = num2.length;

    // 结果最多为 m + n 位数
    let res = new Array(m + n).fill(0);
    for(let i = m-1 ; i >= 0 ; i--) {
        for(let j = n-1 ; j >= 0 ; j--) {
            // 按位相乘
            let mul = (num1[i] - '0') * (num2[j] - '0'); // -'0'操作的作用：将字符转数字
            // 乘积在 res 对应的索引位置
            let p1 = i + j;
            let p2 = i + j + 1;

            // 叠加到 res 上
            let sum = mul + res[p2];
            res[p2] = sum % 10;
            res[p1] += Math.floor(sum / 10);
        }
    }

    // 结果前缀可能存的 0（未使用的位）
    let i = 0;
    while (i < res.length && res[i] == 0)
        i++;
    let str = res.slice(i);
    console.log(res, str);
    return str.length === 0 ? '0' : str.join('');
};

console.log(multiply('0','0'));
// @lc code=end

