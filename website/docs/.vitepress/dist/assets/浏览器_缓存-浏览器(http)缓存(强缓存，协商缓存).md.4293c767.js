import{_ as e}from"./chunks/pic9.c7fe7b05.js";import{_ as t,o,c as a,V as i}from"./chunks/framework.75331a37.js";const l="/assets/pic2.f3ab2ddb.png",r="/assets/pic1.b128f2f7.png",c="/assets/pic10.1dba92b2.png",s="/assets/pic4.4f432b1a.png",d="/assets/pic5.e4bbba53.png",p="/assets/pic6.4e8bd15a.png",n="/assets/pic7.ae29f079.png",E=JSON.parse('{"title":"前言 - Web缓存知识体系","description":"","frontmatter":{},"headers":[],"relativePath":"浏览器/缓存-浏览器(http)缓存(强缓存，协商缓存).md","filePath":"浏览器/缓存-浏览器(http)缓存(强缓存，协商缓存).md"}'),h={name:"浏览器/缓存-浏览器(http)缓存(强缓存，协商缓存).md"},g=i('<ul><li><a href="#前言---web缓存知识体系">前言 - Web缓存知识体系</a><ul><li><a href="#缓存位置">缓存位置</a></li><li><a href="#浏览器缓存过程">浏览器缓存过程</a></li><li><a href="#缓存机制">缓存机制</a></li></ul></li><li><a href="#强缓存">强缓存</a><ul><li><a href="#http-头expires">http 头：Expires</a></li><li><a href="#http-头cache-control">http 头：Cache-Control</a></li></ul></li><li><a href="#协商缓存">协商缓存</a><ul><li><a href="#协商缓存过程相关状态码304200">协商缓存过程(相关状态码：304/200)</a></li><li><a href="#http-头last-modifiedif-modified-sincehttp-10">http 头：Last-Modified／If-Modified-since(http 1.0)</a></li><li><a href="#http-头etagif-none-matchhttp-11">http 头：Etag/If-None-match(http 1.1)</a></li></ul></li><li><a href="#总结-强缓存和协商缓存">总结 强缓存和协商缓存</a></li><li><a href="#启发式缓存阶段">启发式缓存阶段</a></li><li><a href="#用户行为对浏览器缓存的影响">用户行为对浏览器缓存的影响</a></li></ul><h1 id="前言-web缓存知识体系" tabindex="-1">前言 - Web缓存知识体系 <a class="header-anchor" href="#前言-web缓存知识体系" aria-label="Permalink to &quot;前言 - Web缓存知识体系&quot;">​</a></h1><p>Web缓存知识体系，如下图: <img src="'+l+'"></p><p>其实缓存有很多种，包括：浏览器缓存，DNS缓存，CDN缓存等等。</p><p>从输入域名到返回结果，经历的每一步，都可能有缓存。如果有缓存，就不会进行下一步，直到达到全球只有13台的跟域名服务器； <img src="'+e+'"></p><p>今天主要介绍的就是浏览器缓存 在本文主要介绍<code>浏览器</code>中的缓存:</p><img src="'+r+'"><blockquote><p><a href="https://www.jianshu.com/p/54cc04190252" target="_blank" rel="noreferrer">参考链接</a></p></blockquote><h2 id="缓存位置" tabindex="-1">缓存位置 <a class="header-anchor" href="#缓存位置" aria-label="Permalink to &quot;缓存位置&quot;">​</a></h2><p>从缓存位置上来说分为四种，并且各自有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络。</p><ul><li><code>Service Worker</code>：运行在浏览器背后的独立线程，一般可以用来实现缓存功能。必须使用 HTTPS 协议来保障安全。</li><li><code>Memory Cache</code>：内存缓存读取高效，但缓存持续性很短，会随着进程的释放而释放。且内存空间有限。 当我们访问过页面以后，再次刷新页面，可以发现很多数据都来自于内存缓存。 内存缓存在缓存资源时并不关心返回资源的HTTP缓存头Cache-Control是什么值，同时资源的匹配也并非仅仅是对URL做匹配，还可能会对Content-Type，CORS等其他特征做校验。</li><li><code>Disk Cache</code>：存储在硬盘中的缓存，胜在容量和存储时效性上。 它会根据<code>·HTTP Herder 中的字段</code>判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据。</li><li><code>Push Cache</code>：当以上三种缓存都没有命中时，它才会被使用。它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂，在Chrome浏览器中只有5分钟左右，同时它也并非严格执行HTTP头中的缓存指令。</li></ul><p>如果以上四种缓存都没有命中的话，那么只能发起请求来获取资源了。</p><p><strong>通常浏览器缓存策略分为两种：<code>强缓存</code>和<code>协商缓存</code>，并且缓存策略都是通过设置 HTTP Header 来实现的。</strong></p><h2 id="浏览器缓存过程" tabindex="-1">浏览器缓存过程 <a class="header-anchor" href="#浏览器缓存过程" aria-label="Permalink to &quot;浏览器缓存过程&quot;">​</a></h2><ul><li><p>浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中</p></li><li><p>浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识</p></li></ul><img src="'+c+'" width="80%/"><blockquote><p><a href="https://time.geekbang.org/column/article/116588?utm_term=zeusQYFJN&amp;utm_source=app&amp;utm_medium=geektime&amp;utm_campaign=216-end&amp;utm_content=v8zhuanlankaipianci0316" target="_blank" rel="noreferrer">参考链接</a></p></blockquote><h2 id="缓存机制" tabindex="-1">缓存机制 <a class="header-anchor" href="#缓存机制" aria-label="Permalink to &quot;缓存机制&quot;">​</a></h2><ul><li><p><code>强缓存</code>优先于<code>协商缓存</code>进行，</p></li><li><p>若强制缓存(相关http头：<code>Expires和Cache-Control</code>)生效则直接使用缓存，</p></li><li><p>若强缓存不生效则进行协商缓存(相关http头：<code>Last-Modified / If-Modified-Since</code>和<code>Etag / If-None-Match</code>)，</p></li><li><p>协商缓存由服务器决定是否使用缓存，</p></li><li><p>若协商缓存失效，那么代表该请求的缓存失效，返回200，重新返回<strong>资源和缓存标识</strong>，再存入浏览器缓存中；</p></li><li><p>生效则返回<code>304</code>和<code>not modified</code>，继续使用缓存。</p></li></ul><h1 id="强缓存" tabindex="-1">强缓存 <a class="header-anchor" href="#强缓存" aria-label="Permalink to &quot;强缓存&quot;">​</a></h1><p>当请求命中<strong>强制缓存</strong>时，浏览器不会将本次请求发往服务器，而是直接从缓存中读取内容，在Chrome中打开控制台，在network中显示的是<code>memory cache</code>或者是<code>disk cache</code>。 <img src="'+s+'"></p><p>强缓存可以通过设置两种<strong>HTTP Header</strong>实现：<code>Expires(1.0)</code>和<code>Cache-Control(1.1)</code>。</p><h2 id="http-头-expires" tabindex="-1">http 头：Expires <a class="header-anchor" href="#http-头-expires" aria-label="Permalink to &quot;http 头：Expires&quot;">​</a></h2><p><code>Expires</code>是一个<strong>绝对</strong>时间，是缓存过期时间。用以表达在这个时间点之前发起请求可以直接从浏览器中读取数据，而无需重新发起请求。值为一个时间戳。</p><p>缺点： Expires 是 HTTP/1 的产物，<strong>受限于本地时间</strong>，如果修改了本地时间，可能会造成缓存失效。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Expires: Wed, 22 Oct 2018 08:41:00 GMT // 表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。</span></span></code></pre></div><h2 id="http-头-cache-control" tabindex="-1">http 头：Cache-Control <a class="header-anchor" href="#http-头-cache-control" aria-label="Permalink to &quot;http 头：Cache-Control&quot;">​</a></h2><p><code>Cache-Control</code>的<strong>优先级比Expires的优先级高</strong>。是HTTP/1.1产物。该字段表示资源缓存最大有效时间，在该时间内，客户端不需要向服务器发送请求。</p><p>Cache-Control解决了Expires在浏览器中，时间被手动更改导致缓存判断错误的问题。</p><p>常见指令如下(完整列表参考<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control" target="_blank" rel="noreferrer">MDN</a>)：</p><ul><li>private(默认值)：客户端可以缓存，代理服务器不能缓存</li><li>public：客户端和代理服务器都可缓存</li><li>no-cache：在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)</li><li>max-age：设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)</li><li>no-store：缓存不应该存储有关客户端请求或服务器响应的任何内容，即使不使用任何缓存</li></ul><p>举个例子🌰：</p><img src="'+d+'"><p>图中Cache-Control指定了<code>max-age</code>，<code>public</code>，缓存时间为31536000秒（365天）。 也就是说，在365天内再次请求这条数据，都会直接获取缓存数据库中的数据，直接使用。</p><p>优点：</p><ul><li>解决了Expires服务器和客户端相对时间的问题</li></ul><p>缺点：</p><ul><li>存在版本问题，到期之前的修改客户端是不可知的。</li></ul><h1 id="协商缓存" tabindex="-1">协商缓存 <a class="header-anchor" href="#协商缓存" aria-label="Permalink to &quot;协商缓存&quot;">​</a></h1><p>协商缓存就是<strong>强制缓存失效</strong>后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。而整个过程是需要发出请求的。</p><p>协商缓存由<strong>2组字段</strong>(不是2个)，控制协商缓存的字段有：</p><ul><li><code>Last-Modified／If-Modified-since(http 1.0)</code>: 表示的是服务器的资源最后一次修改的时间；</li><li><code>Etag/If-None-match(http 1.1)</code>: 表示的是服务器资源的唯一标识，只要资源有变化，Etag就会重新生成；</li></ul><p><strong>Etag/If-None-match 的优先级高于Last-Modified/If-Modified-since。</strong></p><h2 id="协商缓存过程-相关状态码-304-200" tabindex="-1">协商缓存过程(相关状态码：304/200) <a class="header-anchor" href="#协商缓存过程-相关状态码-304-200" aria-label="Permalink to &quot;协商缓存过程(相关状态码：304/200)&quot;">​</a></h2><p>使用协商缓存有两种情况：</p><ul><li>协商缓存<strong>生效</strong>，返回<code>304</code>和<code>Not Modified</code><img src="'+p+'" width="80%/"></li><li>协商缓存<strong>失效</strong>，返回<code>200</code>和<code>请求结果</code><img src="'+n+'" width="80%/"></li></ul><h2 id="http-头-last-modified-if-modified-since-http-1-0" tabindex="-1">http 头：Last-Modified／If-Modified-since(http 1.0) <a class="header-anchor" href="#http-头-last-modified-if-modified-since-http-1-0" aria-label="Permalink to &quot;http 头：Last-Modified／If-Modified-since(http 1.0)&quot;">​</a></h2><ul><li><p>服务器通过 <code>Last-Modified</code> 字段告知客户端(返回资源的同时在header添加)，表示资源最后一次被修改的时间，浏览器将这个值和内容一起记录在缓存数据库中</p></li><li><p>下一次请求相同的资源时，浏览器会从自己的缓存中找出“不确定是否过期的”缓存，因此在请求头中将上次的Last-Modified的值写入到请求头的<code>If-Modified-since</code>字段</p></li><li><p>服务器会将If-Modified-since的值与<strong>服务器中这个资源的最后修改时间</strong>进行对比。如果没有变化，这表示未修改，响应304和空响应体，直接从缓存中读取；如果If-Modified-since<strong>小于</strong>最后修改时间，则表示修改了，响应 200 状态码，并返回数据</p></li></ul><p><strong>缺点：</strong></p><ol><li>只要资源发生了修改，<strong>无论内容是否发生了实质性的改变</strong>，都会将该资源返回客户端。例如周期性重写，但这种情况下资源包含的数据实质是一样的。</li><li>以时刻作为标识，无法识别<strong>一秒内多次修改的情况</strong>。如果资源更新的速度是秒以下的单位，那么该缓存是不能被使用的，因为它的时间最低单位是秒。</li></ol><h2 id="http-头-etag-if-none-match-http-1-1" tabindex="-1">http 头：Etag/If-None-match(http 1.1) <a class="header-anchor" href="#http-头-etag-if-none-match-http-1-1" aria-label="Permalink to &quot;http 头：Etag/If-None-match(http 1.1)&quot;">​</a></h2><p>为了解决上述问题，出现了一组新的字段<code>Etag/In-None-Match</code>。</p><ul><li><code>Etag</code>是上一次加载资源时，<strong>服务器</strong>返回的当前资源文件的一个<strong>唯一标识</strong>。它的作用是用来标识资源<strong>是否有变化</strong>。</li><li>浏览器在下一次发起请求时，会将上一次返回的Etag值赋值给<code>If-None-Match</code>并添加在 请求 Header 中。服务端匹配传入的值与上次是否一致，如果一致返回<code>304</code>，浏览器则读取本地缓存；否则返回<code>200</code>和更新后的资源及新的Etag</li></ul><p><strong>优点：</strong></p><ol><li>可以更加精确的判断资源是否被修改，可以识别一秒内多次修改的情况</li><li>不存在版本问题，每次请求都会去服务器进行校验 <strong>缺点：</strong></li><li>计算Etag值需要性能损耗</li><li>分布式服务器存储情况下下，计算Etag的算法如果不一致，会导致浏览器从一个服务器上获取得页面内容后到另一台服务器上进行验证时出现Etag不匹配的情况</li></ol><h1 id="总结-强缓存和协商缓存" tabindex="-1">总结 强缓存和协商缓存 <a class="header-anchor" href="#总结-强缓存和协商缓存" aria-label="Permalink to &quot;总结 强缓存和协商缓存&quot;">​</a></h1><ul><li><p>对于强制缓存，服务器通知浏览器一个<strong>缓存时间</strong>，在缓存时间内，下次请求，直接用缓存，不在时间内，执行比较缓存策略。</p></li><li><p>对于协商缓存，将缓存信息中的Etag和Last-Modified通过请求发送给服务器，由<strong>服务器校验</strong>，返回304状态码时，浏览器直接使用缓存。</p></li></ul><h1 id="启发式缓存阶段" tabindex="-1">启发式缓存阶段 <a class="header-anchor" href="#启发式缓存阶段" aria-label="Permalink to &quot;启发式缓存阶段&quot;">​</a></h1><p>浏览器用来确定缓存过期时间的字段一个都没有！那该怎么办？有人可能会说下次请求直接进入协商缓存阶段。</p><p>不是的，浏览器还有个<code>启发式缓存阶段</code>。</p><p><strong>根据响应头中2个时间字段<code>Date</code>和 <code>Last-Modified</code> 之间的时间差值，取其值的10%作为缓存时间周期。</strong></p><p>这就是启发式缓存阶段。这个阶段很容让人忽视，但实际上每时每刻都在发挥着作用。</p><h1 id="用户行为对浏览器缓存的影响" tabindex="-1">用户行为对浏览器缓存的影响 <a class="header-anchor" href="#用户行为对浏览器缓存的影响" aria-label="Permalink to &quot;用户行为对浏览器缓存的影响&quot;">​</a></h1><p>所谓用户行为对浏览器缓存的影响，指的就是用户在浏览器如何操作时，会触发怎样的缓存策略。主要有 3 种：</p><ul><li>打开网页，地址栏输入地址： 查找 disk cache 中是否有匹配。如有则使用；如没有则发送网络请求。</li><li>普通刷新 (F5)：因为 TAB 并没有关闭，因此 memory cache 是可用的，会被优先使用(如果匹配的话)。其次才是 disk cache。</li><li>强制刷新 (Ctrl + F5)：浏览器不使用缓存，因此发送的请求头部均带有 Cache-control: no-cache(为了兼容，还带了 Pragma: no-cache),服务器直接返回 200 和最新内容。</li></ul>',65),f=[g];function m(u,_,b,C,k,x){return o(),a("div",null,f)}const T=t(h,[["render",m]]);export{E as __pageData,T as default};
