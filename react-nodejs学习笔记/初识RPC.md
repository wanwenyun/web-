# 什么是rpc？和http又有什么关系？
**先说`HTTP`**

明确 HTTP 是一个协议，是一个超文本传输协议。它基于 `TCP/IP` 来传输文本、图片、视频、音频等。

说白了，http本质上是规定了一种`客户端（浏览器）`和`服务端（服务器）`之间的`通信格式`。


**RPC又是什么呢？**

HTTP和RPC其实是两个维度的东西， HTTP指的是通信协议。

而`RPC`是远程调用，其对应的是本地调用。RPC的通信可以用HTTP协议，也可以自定义协议，是不做约束的。

举个例子：
本来没有拆分服务都是本地调用的时候方法是这样写的：
```js
public String getSth(String str) {
     return yesService.get(str);
}
```
如果 yesSerivce 被拆分出去，此时需要远程调用了，如果用 HTTP 方式，可能就是：
```js
public String getSth(String str) {
    RequestParam param = new RequestParam();
    ......
    return HttpClient.get(url, param,.....);
}
```
此时需要关心远程服务的地址，还需要组装请求等等，而如果采用 RPC 调用那就是：
```js
public String getSth(String str) {
    // 看起来和之前调用没差？哈哈没唬你，
    // 具体的实现已经搬到另一个服务上了，这里只有接口。
    // 看完下面就知道了。
     return yesService.get(str);  
}
```
所以说 RPC 其实就是用来屏蔽远程调用网络相关的细节，使得远程调用和本地调用使用一致，让开发的效率更高。

**为什么需要RPC**

RPC 调用是因为服务的拆分，或者本身公司内部的多个服务之间的通信。

服务的拆分独立部署，那服务间的调用就必然需要网络通信，用 WebClient 调用当然可行，但是比较麻烦。

我们想即使服务被拆分了但是使用起来还是和之前本地调用一样方便。

所以就出现了 RPC 框架，来屏蔽这些底层调用细节，使得我们编码上还是和之前本地调用相差不多。

并且 HTTP 协议比较的冗余，RPC 都是内部调用所以不需要太考虑通用性，只要公司内部保持格式统一即可。所以可以做各种定制化的协议来使得通信更高效。





---
参考文档：
1. https://www.jianshu.com/p/fe5ccfc5d7bd
2. https://www.jianshu.com/p/d5410243d579