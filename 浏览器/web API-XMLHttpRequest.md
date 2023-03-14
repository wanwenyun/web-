

> web API: 浏览器提供的一套操作浏览器功能和页面元素的接口

# 前言

在 XMLHttpRequest 出现之前，如果服务器数据有更新，依然需要重新刷新整个页面。

而 XMLHttpRequest 提供了从 Web 服务器获取数据的能力，如果你想要更新某条数据，只需要通过 XMLHttpRequest 请求服务器提供的接口，就可以获取到服务器的数据，

然后再操作 DOM 来更新页面内容，整个过程只需要更新网页的一部分就可以了，

而不用像之前那样还得刷新整个页面，这样既有效率又不会打扰到用户。

# XMLHttpRequest 运作机制

`XMLHttpRequest`背后的实现机制，具体工作过程你可以参考下图：

<img src="./picture//webAPI//pic1.png" />

`XMLHttpRequest`使用方法如下：

```js

 function GetWebData(URL){
    /**
     * 1:新建XMLHttpRequest请求对象
     */
    let xhr = new XMLHttpRequest()

    /**
     * 2:注册相关事件回调处理函数 
     */
    xhr.onreadystatechange = function () {
        switch(xhr.readyState){
          case 0: //请求未初始化
            console.log("请求未初始化")
            break;
          case 1://OPENED
            console.log("OPENED")
            break;
          case 2://HEADERS_RECEIVED
            console.log("HEADERS_RECEIVED")
            break;
          case 3://LOADING  
            console.log("LOADING")
            break;
          case 4://DONE
            if(this.status == 200||this.status == 304){
                console.log(this.responseText);
                }
            console.log("DONE")
            break;
        }
    }

    xhr.ontimeout = function(e) { console.log('ontimeout') }
    xhr.onerror = function(e) { console.log('onerror') }

    /**
     * 3:打开请求,配置参数
     */
    xhr.open('Get', URL, true);//创建一个Get请求,采用异步
    xhr.timeout = 3000 //设置xhr请求的超时时间
    xhr.responseType = "text" //设置响应返回的数据格式
    xhr.setRequestHeader("X_TEST","time.geekbang")

    /**
     * 5:发送请求
     */
    xhr.send();
}
```

## 第一步：创建 XMLHttpRequest 对象

当执行到`let xhr = new XMLHttpRequest()`后，JavaScript 会创建一个 XMLHttpRequest 对象 `xhr`，用来执行实际的网络请求操作。

## 为 xhr 对象注册回调函数

因为网络请求比较耗时，所以要注册回调函数，这样后台任务执行完成之后就会通过调用回调函数来告诉其执行结果。

XMLHttpRequest 的回调函数主要有下面几种：
* `ontimeout`，用来监控超时请求，如果后台请求超时了，该函数会被调用
* `onerror`，用来监控出错信息，如果后台请求出错了，该函数会被调用；
* `onreadystatechange`，用来监控后台请求过程中的状态，比如可以监控到 HTTP 头加载完成的消息、HTTP 响应体消息以及数据加载完成的消息等。

## 配置基础的请求信息

首先要通过 open 接口配置一些基础的请求信息，包括请求的地址、请求方法（是 get 还是 post）和请求方式（同步还是异步请求）。

然后通过 xhr 内部属性类配置一些其他可选的请求信息，你可以参考文中示例代码，我们通过xhr.timeout = 3000来配置超时时间，也就是说如果请求超过 3000 毫秒还没有响应，那么这次请求就被判断为失败了。

## 第四步：发起请求

一切准备就绪之后，就可以调用xhr.send来发起网络请求了。你可以对照上面那张请求流程图，可以看到：

1. 渲染进程会将请求发送给网络进程，
2. 然后网络进程负责资源的下载，
3. 等网络进程接收到数据之后，就会利用 IPC 来通知渲染进程；
4. 渲染进程接收到消息之后，会将 xhr 的回调函数封装成任务并添加到消息队列中，
5. 等主线程循环系统执行到该任务的时候，就会根据相关的状态来调用对应的回调函数。

* 如果网络请求出错了，就会执行 xhr.onerror；
* 如果超时了，就会执行 xhr.ontimeout；
* 如果是正常的数据接收，就会执行 `onreadystatechange` 来反馈相应的状态。

# XMLHttpRequest 三个重要的属性:onreadystatechange, readyState, status

<img src="./picture/webAPI/pic2.png"/>

# XMLHttpRequest 使用过程中的“坑”

1. 跨域问题 (然如何解决跨域问题，相见[《安全-页面安全(跨域，网站攻击)》](../浏览器/安全-页面安全(跨域，网站攻击))章节)
2. HTTPS 混合内容的问题：是指 HTTPS 页面中包含了不符合 HTTPS 安全要求的内容，比如包含了 `HTTP` 资源，通过 HTTP 加载的图像、视频、样式表、脚本等，都属于混合内容。
   
   使用 XMLHttpRequest 请求时，浏览器认为这种请求可能是攻击者发起的，会阻止此类危险的请求。

   <img src="./picture/webAPI/pic3.png"/>

# axios
[参考链接](https://juejin.im/post/5b55c118f265da0f6f1aa354)

`axios`库，它是基于promise的http库，可运行在**浏览器端和node.js**中。他有很多优秀的特性，例如拦截请求和响应、取消请求、转换json、客户端防御CSRF等。

**请求拦截**
```js
axios.interceptors.request.use(    
    config => {        
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const token = store.state.token;        
        token && (config.headers.Authorization = token);        
        return config;    
    },    
    error => {        
        return Promise.error(error);    
})
```
**响应拦截**
```js
axios.interceptors.response.use(    
    response => {   
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },    
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {            
        if (error.response.status) {            
            switch (error.response.status) {                
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。         
                case 401:                    
                    ...
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面                
                case 403:
                     ...                  
                    break; 

                // 404请求不存在
                case 404:
                    ...
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    ...
            }
            return Promise.reject(error.response);
        }
    }    
});
```

**封装get方法**
我们通过定义一个get函数，get函数有两个参数，第一个参数表示我们要请求的url地址，第二个参数是我们要携带的请求参数。get函数返回一个promise对象，当axios其请求成功时resolve服务器返回 值，请求失败时reject错误值。最后通过export抛出get函数。
```js
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});}
```

**封装post方法**
原理同get基本一样，但post方法必须要使用对提交从参数对象进行`序列化`(将对象的状态信息转换为可以存储或传输的形式的过程)的操作。
```js
export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
```