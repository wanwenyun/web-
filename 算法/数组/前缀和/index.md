**前缀和**技巧适用于快速、频繁地计算一个**索引区间内的元素之和**。

前缀和主要适用的场景是原始数组不会被修改的情况下，频繁查询某个区间的**累加和**。

核心代码如下：
```js
var NumArray = function(nums) {
    this.preSum = new Array(nums.length + 1).fill(0);
    for(let i = 1; i < nums.length; i++) {
        this.preSum[i] = this.preSum[i - 1] + nums[i - 1];
    }
};

NumArray.prototype.sumRange = function(left, right) {
    return this.preSum[right + 1] - this.preSum[left];
};
```

<img src="./preSum.png" width=80%>