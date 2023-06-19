Array.prototype.myReduce = (callback, initialValue) => {
    // 设置初始值
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    // 从数组的第一个元素开始迭代
  for (let i = initialValue !== undefined ? 0 : 1; i < this.length; i++) {
    // 调用回调函数
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
}