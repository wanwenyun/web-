- [文字换行](#文字换行)
- [单行文本溢出显示省略号](#单行文本溢出显示省略号)
- [多行文本溢出显示省略号](#多行文本溢出显示省略号)
- [flex弹性布局](#flex弹性布局)
  - [flex容器属性](#flex容器属性)
  - [项目属性](#项目属性)

### 文字换行
* `overflow-wrap(word-wrap)`通用换行控制是否保留单词
* `word-break` 针对多字节文本文字 中文句子也是单词
* `white-space` 空白处是否换行
  
### 单行文本溢出显示省略号

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: no-wrap;
```

### 多行文本溢出显示省略号
```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
```

### flex弹性布局
#### flex容器属性
- `flex-direction`：属性决定主轴的方向（即项目的排列方向），默认row水平方向。
  1. row（默认值）：主轴为水平方向，起点在左端。
  2. row-reverse：主轴为水平方向，起点在右端。
  3. column：主轴为垂直方向，起点在上沿。
  4. column-reverse：主轴为垂直方向，起点在下沿。
- `flex-wrap`：是否换行
  - nowrap（默认）：不换行
  - wrap：换行，第一行在上方。
  - wrap-reverse：换行，第一行在下方。
- `justify-content`：属性定义了项目在主轴上的对齐方式
  - flex-start（默认值）：左对齐
  - flex-end：右对齐
  - center： 居中
  - space-between：两端对齐，项目之间的间隔都相等。
  - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
- `align-items`：属性定义项目在交叉轴上如何对齐
  - flex-start：交叉轴的起点对齐。
  - flex-end：交叉轴的终点对齐。
  - center：交叉轴的中点对齐。
  - baseline: 项目的第一行文字的基线对齐。
  - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
- `align-content`：属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
  1. flex-start：与交叉轴的起点对齐。
  2. flex-end：与交叉轴的终点对齐。
  3. center：与交叉轴的中点对齐。
  4. space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
  5. space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  6. stretch（默认值）：轴线占满整个交叉轴。
#### 项目属性
- `order`：属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- `flex-grow`：属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
- `flex-shrink`：属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- `flex-basis`：属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。它的默认值为auto，即项目的本来大小
- `flex`：属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto
- `align-self`：属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。