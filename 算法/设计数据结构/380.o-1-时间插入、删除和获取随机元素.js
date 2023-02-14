/*
 * @lc app=leetcode.cn id=380 lang=javascript
 *
 * [380] O(1) 时间插入、删除和获取随机元素
 * 解题思路参考链接：https://leetcode.cn/problems/insert-delete-getrandom-o1/solutions/290445/tu-jie-chang-shu-shi-jian-cha-ru-shan-chu-he-huo-q/?languageTags=javascript
 * 重点在于：想实现题目要求的 O(1) 时间的删除，只能在数组末尾进行删除操作。具体做法就是把要删除的元素和末尾的元素换个位置，然后再从数组末尾删除。
 * /

// @lc code=start

var RandomizedSet = function() {
    this.array = [];
    this.map = new Map();

    this.swap = function(a, b){
        const temp = this.array[b];
        this.array[b] = this.array[a];
        this.array[a] = temp;
    }
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if(this.map.has(val)) {return false;}
    this.array.push(val);
    this.map.set(val, this.array.length - 1);
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if(!this.map.has(val)) {return false;}
    const index = this.map.get(val);
    const lastNum = this.array[this.array.length - 1];
    // 把要删除的元素和末尾的元素换个位置
    if (index < this.array.length - 1) {
        this.swap(index, this.array.length - 1);
        // // 在map中记录array末尾元素交换位置后的信息
        this.map.set(lastNum, index);
        // this.map.set(this.array[index], index);
    }
    // 在map中删除目标元素
    this.map.delete(val);
    // 在数组中删除元素
    this.array.pop();

    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const len = this.array.length;

    if (len === 0) return false;

    let randomIndex = Math.floor(Math.random() * len);
    return this.array[randomIndex];
};


/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// @lc code=end

