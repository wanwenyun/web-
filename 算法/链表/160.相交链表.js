/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    /* 使用额外空间的版本：用 Set 记录一个链表的所有节点，然后和另一条链表对比，
    const map = new Set();
    while(headA) {
        map.add(headA);
        headA = headA.next;
    }
    while(headB) {
        if(map.has(headB)) {
            return headB;
        }
        headB = headB.next;
    }
    return null;
    */
   
    // 不使用额外空间的版本：
    let p1 = headA, p2 = headB;
    while(p1 !== p2) {
        p1 === null ? p1 = headB : p1 = p1.next;
        p2 === null ? p2 = headA : p2 = p2.next;
    } 
    return p1;
};
// @lc code=end

