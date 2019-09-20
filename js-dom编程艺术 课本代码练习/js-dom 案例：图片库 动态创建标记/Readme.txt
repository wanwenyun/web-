针对js编程的四个重要思想：
1.平稳退化：如果浏览器不支持JS或者支持部分JS，它的正常功能不会受到影响
2.分离JavaScript
3.向后兼容
4.性能考虑
对图片库这个案例做了以下几点优化：
1.把事件处理函数移除文档：
<a href="images/coffee.jpeg" title="A cup of coffee" onclick="showPic(this);return false;">Coffee</a>
这段代码中间夹杂着js，所以要把这段话去除
	a.添加事件处理函数
	b.共享onload事件
2.向后兼容
3.确保可访问