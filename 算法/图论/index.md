图节点的逻辑结构如下：
```js
class Vertex {
    let id;
    Vertex[] neighbors;
}
```

如果图是有环的，需要`visited`辅助，图遍历框架如下：
```ts
// 记录被遍历过的节点
let visited: boolean[] = [];
// 记录从起点到当前节点的路径
let onPath: boolean[] = [];

/* 图遍历框架 */
var traverse = function<void>(graph, s) {
    if (visited[s]) return;
    // 经过节点 s，标记为已遍历
    visited[s] = true;
    // 做选择：标记节点 s 在路径上
    onPath[s] = true;
    for (let neighbor of graph.neighbors(s)) {
        traverse(graph, neighbor);
    }
    // 撤销选择：节点 s 离开路径
    onPath[s] = false;
}

```