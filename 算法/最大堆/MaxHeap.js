/**
 * 最大堆
 */
function left(i) {
  return i * 2 + 1;
}

function right(i) {
  return i * 2 + 2;
}

function swap(A, i, j) {
  const t = A[i];
  A[i] = A[j];
  A[j] = t;
}

class Heap {
  constructor(arr) {
    this.data = [...arr];
    this.size = this.data.length;
  }

  /**
   * 重构堆
   */
  rebuildHeap() {
    const L = Math.floor(this.size / 2);
    for (let i = L - 1; i >= 0; i--) {
      this.maxHeapify(i);
    }
  }

  isHeap() {
    const L = Math.floor(this.size / 2);
    for (let i = L - 1; i >= 0; i++) {
      const l = this.data[left(i)] || Number.MIN_SAFE_INTEGER;
      const r = this.data[right(i)] || Number.MIN_SAFE_INTEGER;

      const max = Math.max(this.data[i], l, r);

      if (max !== this.data[i]) {
        return false;
      }
      return true;
    }
  }

  sort() {
    for (let i = this.size - 1; i > 0; i--) {
      swap(this.data, 0, i);
      this.size--;
      this.maxHeapify(0);
    }
  }

  insert(key) {
    this.data[this.size++] = key;
    if (this.isHeap()) {
      return;
    }
    this.rebuildHeap();
  }

  delete(index) {
    if (index >= this.size) {
      return;
    }
    this.data.splice(index, 1);
    this.size--;
    if (this.isHeap()) {
      return;
    }
    this.rebuildHeap();
  }

  /**
   * 堆的其他地方都满足性质
   * 唯独跟节点，重构堆性质
   * @param {*} i
   */
  maxHeapify(i) {
    let max = i;

    if (i >= this.size) {
      return;
    }

    // 求左右节点中较大的序号
    const l = left(i);
    const r = right(i);
    if (l < this.size && this.data[l] > this.data[max]) {
      max = l;
    }

    if (r < this.size && this.data[r] > this.data[max]) {
      max = r;
    }

    // 如果当前节点最大，已经是最大堆
    if (max === i) {
      return;
    }

    swap(this.data, i, max);

    // 递归向下继续执行
    return this.maxHeapify(max);
  }
}

module.exports = Heap;

let p = new Heap([4,2,6,8,1,5,7,3,9]);
p.rebuildHeap();
console.log(p);