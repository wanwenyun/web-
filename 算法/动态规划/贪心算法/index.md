[贪心类型问题](https://labuladong.github.io/algo/di-er-zhan-a01c6/tan-xin-le-9bedf/)
贪心算法可以认为是动态规划算法的一个特例，相比动态规划，使用贪心算法需要满足更多的条件（**贪心选择性质**），但是效率比动态规划要高。

什么是贪心选择性质呢，简单说就是：每一步都做出一个**局部最优**的选择，最终的结果就是全局最优。

贪心算法适用场景：

1. `区间调度问题`：给你很多形如 [start, end] 的闭区间，请你设计一个算法，算出这些区间中最多有几个互不相交的区间。

    解题思路：选择最早结束的区间。
