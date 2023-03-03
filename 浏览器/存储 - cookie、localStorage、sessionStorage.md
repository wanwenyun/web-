- [Cookie，document.cookie](#cookiedocumentcookie)
  - [Cookie的属性](#cookie的属性)
- [LocalStorage，sessionStorage](#localstoragesessionstorage)
- [IndexedDB](#indexeddb)


[参考链接](https://zh.javascript.info/data-storage)

# Cookie，document.cookie
Cookie 是直接存储在浏览器中的一小串数据。它们是 HTTP 协议的一部分，由 [RFC 6265](https://www.rfc-editor.org/rfc/rfc6265) 规范定义。

Cookie 通常是由 Web 服务器使用响应 `Set-Cookie` HTTP-header 设置的。然后浏览器使用 Cookie HTTP-header 将它们自动添加到（几乎）每个对相同域的请求中。

Cookie的常见用处之一是身份验证：
1. 登录后，服务器在响应中使用 `Set-Cookie` HTTP-header 来设置具有唯一“会话标识符（session identifier）”的 cookie。
2. 下次当请求被发送到同一个域时，浏览器会使用 Cookie HTTP-header 通过网络发送 `cookie`。
3. 所以服务器知道是谁发起了请求。


可以用 `document.cookie` 属性从浏览器访问 cookie。

## Cookie的属性


# LocalStorage，sessionStorage

# IndexedDB