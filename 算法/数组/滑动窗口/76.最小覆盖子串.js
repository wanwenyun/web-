/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */
// 两个字符串比较的情况，窗口大小不固定
/*
解题思路：https://labuladong.github.io/algo/di-ling-zh-bfe1b/wo-xie-le--f02cd/
用左右两个指针遍历s字符串，
当滑动窗口中的字符不能覆盖t中的字符时，右指针右移，扩大窗口，把右边的字符加入滑动窗口，
当滑动窗口中的字符能覆盖t中的字符时，不断左移左指针，缩小窗口，直到窗口中的字符刚好能覆盖t中的字符，这个时候再左移就不能覆盖t中的字符了，
然后再右移右指针，扩大窗口
...
如此循环，在指针移动的过程中，不断更新最小覆盖子串直至右指针移动至最右端，算法结束，返回结果。
*/

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    const need = {}; // 用来记录t中字符出现次数，方便后续的判断
    const window = {}; // 记录「窗口」中的相应字符的出现次数。
    for (let a of t) {
        need[a] = (need[a] || 0) + 1;//统计t中字符频数
    }

    let left = 0, 
        right = 0, 
        valid = 0; // valid 变量表示窗口中满足 need 条件的字符个数

    let res = ''
    
    while (right < s.length) {
        let c = s[right]; // c 是将移入窗口的字符
        // 增大窗口
        right++;
        // 进行窗口内数据的一系列更新
        if(need[c]) { //如果当前字符在need字符中 更新window中字符数
            window[c] = (window[c] || 0) + 1;
            if (window[c] == need[c]) {//如果当前窗口和需要的字符数量一致时，字符种类+1
                valid++;
            }
        }
        

        /*** debug 输出的位置 ***/
        console.log(`window: [${left}, ${right})\n`);
        
        // 判断左侧窗口是否要收缩
        while (valid == Object.keys(need).length) { //字符种类与需要的字符个数一致时，即窗口中的字符串包含了t中的所有字符，就收缩窗口
            const newRes = s.substring(left, right);
            if( !res || newRes.length < res.length ) res = newRes;

            // d 是将移出窗口的字符
            let d = s[left];
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
    //没有找到覆盖子串返回'' 否则返回覆盖子串
    return res;
};
// @lc code=end

