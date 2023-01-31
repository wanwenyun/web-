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
// 解法一： 链表
var getIntersectionNode = function(headA, headB) {
    const list = new Set();
    let temp = headA;
    while(temp !== null) { // 将链表A存入Set中
        list.add(temp);
        temp = temp.next;
    }

    temp = headB;
    while(temp !== null) { // 遍历链表B
        if(list.has(temp)){
            return temp;
        }
        temp = temp.next;
    }
    return null;
};
// @lc code=end

