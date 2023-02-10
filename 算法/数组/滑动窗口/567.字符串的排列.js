/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 */

// 两个字符串进行比较的情况
// 关键点在窗口收缩时机：当窗口的大小，大于等于s1的长度时，便收缩窗口。

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    const need = {}; // 用来记录t中字符出现次数，方便后续的判断
    const window = {}; // 记录「窗口」中的相应字符的出现次数。
    for (let a of s1) {
        need[a] = (need[a] || 0) + 1;//统计t中字符频数
    }

    let left = 0, right = 0;
    let valid = 0; // valid 变量表示窗口中满足 need 条件的字符个数

    while (right < s2.length) {
        // c 是将移入窗口的字符
        let c = s2[right];
        // 增大窗口
        right++;
        // 进行窗口内数据的一系列更新
        if(need[c]) {
            window[c] = (window[c] || 0) + 1;
            if(window[c] === need[c]) {
                valid++;
            }
        }

        /*** debug 输出的位置 ***/
        console.log(`window: [${left}, ${right})\n`);
        
        // 判断左侧窗口是否要收缩
        while (right - left >= s1.length) { // 当窗口的大小，大于等于s1的长度时
            if(valid === Object.keys(need).length) {
                return true;
            }
            // d 是将移出窗口的字符
            let d = s2[left];
            // 缩小窗口
            left++;
            // 进行窗口内数据的一系列更新
            if (need[d]) { //如果d在需要的字符中 更新window中字符数
                if (window[d] == need[d]) {//如果当前窗口和需要的字符数量一致时，字符种类-1
                    valid--;
                }
                window[d]--;
            }
        }
    }
    return false;
};
// @lc code=end

