/*
 * @lc app=leetcode.cn id=876 lang=javascript
 *
 * [876] 链表的中间结点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 * 思路1：快慢指针遍历，直到快指针到达最后
 * 使用两个指针变量，刚开始都位于链表的第 1 个结点，一个永远一次只走 1 步，一个永远一次只走 2 步，一个在前，一个在后，同时走。这样当快指针走完的时候，慢指针就来到了链表的中间位置。
 * 思路2: 遍历列表，记录链表长度，进而计算链表中间结点的下标（注意偶数结点的时候，得到的是中间的第二个结点），然后再遍历一次，来到所要求结点的位置。
 */
var middleNode = function(head) {
    // 思路1
    const slow = fast = head;
    while (fast && fast.next) {//快慢指针遍历，直到快指针到达最后
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;

    // 思路2
    // let len = 0;
    // let tmp = head;
    // while (tmp !== null) {
    //     len++;
    //     tmp = tmp.next;
    // }
    // const mid = Math.floor(len / 2);
    // console.log(mid)
    // let res = head;
    // for(let i = 0; i < mid; i++) {
    //     res = res.next;
    // }
    // return res;
};
// @lc code=end

