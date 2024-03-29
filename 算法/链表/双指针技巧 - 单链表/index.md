对于**单链表**来说，大部分技巧都属于快慢指针，以下几种算法题，它们都是通过一个 fast 快指针和一个 slow 慢指针配合完成任务。

1. LC21：合并两个有序链表 -- 双指针，虚拟头节点
2. LC86：链表的分解  -- 双指针，虚拟头节点
3. LC23：合并 k 个有序链表
4. 寻找单链表的倒数第 k 个节点，LC19：删除链表的倒数第 N 个结点 -- 快慢指针
5. LC：876寻找单链表的中点 -- 快慢指针，每当慢指针 slow 前进一步，快指针 fast 就前进两步
6. LC141：判断单链表是否包含环并找出环起点 -- 快慢指针，慢指针走1步，快指针走两步。如果 fast 最终和 slow 相遇，那肯定是 fast 超过了 slow 一圈，说明链表中含有环
7. LC160：判断两个单链表是否相交并找出交点 -- 