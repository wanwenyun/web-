有关括号问题，有以下性质：

1. 一个`「合法」`括号组合的左括号数量一定**等于**右括号数量，这个很好理解。

2. 对于一个`「合法」`的括号字符串组合 p，必然对于任何 `0 <= i < len(p)` 都有：子串 `p[0..i]` 中左括号的数量都**大于或等于**右括号的数量。