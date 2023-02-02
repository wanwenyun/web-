/*
 * @lc app=leetcode.cn id=1456 lang=javascript
 *
 * [1456] 定长子串中元音的最大数目
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u'])

    let left = 0, right = 0;
    let res = 0;

    while(right < k) {
        vowels.has(s[right]) && res++;
        right++;
    }

    let max = res;

    while (right < s.length) { // 固定窗口大小，不断向后移动
        vowels.has(s[right]) && res++;
        vowels.has(s[left]) && res--;
        max = Math.max(max, res);
        left++;
        right++;
    }
    return max;
};
// @lc code=end

