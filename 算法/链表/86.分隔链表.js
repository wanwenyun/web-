/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * 
 * 思路：新建两个链表，一个用来存放小于x的节点，一个用来存放大于x的节点
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    // 存放小于 x 的链表的虚拟头结点
    const dummy1 = new ListNode(-1);
    // 存放大于等于 x 的链表的虚拟头结点
    const dummy2 = new ListNode(-1);

    let p1 = dummy1, p2 = dummy2;
    while(head) {
        if(head.val < x) {
            p1.next = head;
            p1 = p1.next;
        }else {
            p2.next = head;
            p2 = p2.next;
        }
        head = head.next;
    }
    // 遍历结束后，我们将 p2 的 next 指针置空，这是因为当前节点复用的是原链表的节点，而其 next 指针可能指向一个小于 xx 的节点，我们需要切断这个引用。
    p2.next = null;
    p1.next = dummy2.next;
    return dummy1.next;
};
// @lc code=end

