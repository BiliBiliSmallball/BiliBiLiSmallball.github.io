# http协议内容
>_来源[菜鸟教程](https://www.runoob.com/http/http-methods.html)_
## HTTP 请求方法
根据 HTTP 标准，HTTP 请求可以使用多种请求方法。

序号	方法	描述
1.	GET	请求指定的页面信息，并返回实体主体。
2.	PUT	从客户端向服务器传送的数据取代指定的文档的内容。
3.	POST	向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。
>数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。
4.	PATCH	是对 PUT 方法的补充，用来对已知资源进行局部更新 。	
5.	DELETE	请求服务器删除指定的页面。
6.	CONNECT	HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。
7.	OPTIONS	允许客户端查看服务器的性能。
8.	TRACE	回显服务器收到的请求，主要用于测试或诊断。
9. HEAD	类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头

## HTTP 状态码
当浏览者访问一个网页时，浏览者的浏览器会向网页所在服务器发出请求。当浏览器接收并显示网页前，此网页所在的服务器会返回一个包含 HTTP 状态码的信息头（server header）用以响应浏览器的请求。

### 下面是常见的 HTTP 状态码：
1. 200 - 请求成功
2. 301 - 资源（网页等）被永久转移到其它URL
3. 404 - 请求的资源（网页等）不存在
4. 500 - 内部服务器错误

### HTTP 状态码分类
HTTP 状态码由三个十进制数字组成，第一个十进制数字定义了状态码的类型。响应分为五类：信息响应(100–199)，成功响应(200–299)，重定向(300–399)，客户端错误(400–499)和服务器错误 (500–599)：

>分类	分类描述
>1**	信息，服务器收到请求，需要请求者继续执行操作
>2**	成功，操作被成功接收并处理
>3**	重定向，需要进一步的操作以完成请求
>4**	客户端错误，请求包含语法错误或无法完成请求
>5**	服务器错误，服务器在处理请求的过程中发生了错误

# fetch部分
```js
参数:
input:定义要获取的资源。可能的值是：一个URL或者一个Request对象。
init:可选,是一个对象，参数有：
	method: 请求使用的方法，如 GET、POST。
	headers: 请求的头信息，形式为 Headers 对象或 ByteString。
	body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
	mode: 请求的模式，如 cors、 no-cors 或者 same-origin,默认为no-cors,该模式允许来自 CDN 的脚本、其他域的图片和其他一些跨域资源，但是首先有个前提条件，就是请求的 method 只能是HEAD、GET 或 POST。此外，如果 ServiceWorkers 拦截了这些请求，它不能随意添加或者修改除这些之外 Header 属性。第三，JS 不能访问 Response 对象中的任何属性，这确保了跨域时 ServiceWorkers 的安全和隐私信息泄漏问题。cors模式允许跨域请求,same-origin模式对于跨域的请求，将返回一个 error，这样确保所有的请求遵守同源策略。
	credentials: 请求的 credentials，如 omit、same-origin 或者 include。
	cache:  请求的 cache 模式: default, no-store, reload, no-cache, force-cache, or only-if-cached.
返回值：一个 Promise，resolve 时回传 Response 对象。
*/
fetch(input, init).then(function(response) {  });
```