/**
 * sort（）
 * 缺陷：每个元素出现在各个位置的概率并不相同，差别很大
 * 原因：Chrome v8中，使用了插入和快速排序处理sort方法，在插入排序中，当待排序元素跟有序元素进行比较时，一旦确定了位置，就不会再跟位置前面的有序元素进行比较，所以就乱序的不彻底。
 */
function shuffle(arr) {
    return arr.sort(() => (Math.random() - 0.5))
}
// Math.random()是令系统随机选取大于等于 0.0 且小于 1.0 的伪随机 double 值
/**
 * 洗牌算法：
 * 先从数组末尾开始，选取最后一个元素，与数组中随机一个位置的元素交换位置；
 * 然后在已经排好的最后一个元素以外的位置中，随机产生一个位置，让该位置元素与倒数第二个元素进行交换； 
 * 以此类推，打乱整个数组的顺序。
 */
function shuffle(arr) {
    let length = arr.length,
        r      = length,
        rand   = 0;

    while (r) {
        rand = Math.floor(Math.random() * r--);
        [arr[r], arr[rand]] = [arr[rand], arr[r]];
    }
    return arr;
}