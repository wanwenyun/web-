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
 *  思路：快慢指针：两个指针，p1,p2。p1每次走一步，p2每次走两步。
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let p1 = head, p2 = head;
    while(p2 != null && p2.next != null){
        p1 = p1.next;
        p2 = p2.next.next;
    }
    return p1;
};
// @lc code=end

