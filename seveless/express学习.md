# Express服务器插件学习

## 基本格式
1. 头
```js
import express from "express";
//导入express并创建对象
const app = express();

import cors from "cors"//网站跨域请求允许
app.use(
  cors({
    origin: "*", //网站跨域请求，允许请求所有
    methods:["GET","POST"]
  })
);
```
2. 程序主体（自由添加）
```js
app.get("/hellow", async (req, res) => {
  res.send({ by: "你好世界" });
});

app.post("/in_p", async (req, res) => {
  console.log(req.body);
});
```

3. 结尾（监听，服务开启）

```js
app.listen(433, function () {
  //端口监听7700
  console.log("监听端口: 433 已经开放");              //console.log("app is listening at 127.0.0.1:433 ");
  console.log("请打开 http://localhost:433/ 访问结果");
});
```
### 各个部分解释
1. 引入模块，中间件。
- app.use(里面) 
- ——————这里面的东西写的是允许浏览器和服务器交换的东西，
- 包括（是否跨域），请求格式

2. 程序主体（自由添加）
-跟名字写的一样
格式如下
```js
app.请求方式("/路由（不用完全）", 
async (req, res) => {               //回调函数
  res.send({ by: "你好世界" });     //回调函数
});
```

3. 结尾
>每个程序都需要这样的结尾，作为事件监听的载体。
>>可以简写为```app.listen(端口号)```
```js
app.listen(监听端口, function () {         //回调函数
  //端口监听433
  console.log("监听端口: 433 已经开放");  //console.log("app is listening at 127.0.0.1:433 ");
  console.log("请打开 http://localhost:433/ 访问结果");
});
```
其中，回调函数一般是用来提示信息：是否运行成功

## 主体部分

### 1. 请求方式

get方法 —— 根据请求路径来处理客户端发出的GET请求。格式如下：
```js
app.get(path,function(request, response));
```
>path为请求的路径，第二个参数为处理请求的回调函数，有两个参数分别是request(req)和response(res)，代表请求信息和响应信息。
>>req代表传入的信息体（从浏览器到服务器），res代表传出的信息体（从服务器到浏览器）

如下示例：
```js
//正常的主页
app.get('/', function(request, response) {      //效果大概等于   
   response.send('Welcome to the homepage!');   //window.document.write('Welcome to the homepage!')
});

//正常的
app.get('/about', function(request, response) {
   response.send('Welcome to the about page!');
});
//"*"是通配路径，这里是错误反馈
app.get("*", function(request, response) {
    response.send("404 error!");
});
```
>上面示例中，指定了about页面路径、根路径和所有路径的处理方法。并且在回调函数内部，使用HTTP回应的send方法，表示向浏览器发送一个字符串。

相同的（即get替换的）还有：
>1.	GET	请求指定的页面信息，并返回实体主体。
>2.	PUT	从客户端向服务器传送的数据取代指定的文档的内容。
>3.	POST	向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。
>>数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。
>4.	PATCH	是对 PUT 方法的补充，用来对已知资源进行局部更新 。	
>5.	DELETE	请求服务器删除指定的页面。
>9. HEAD	类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头

来源：[http协议](https://gitee.com/soul-fox/soulfox.com/blob/fetch/seveless/http%E5%8D%8F%E8%AE%AE.md)

### 2.中间件
_来源：[Express中间件简介](http://t.zoukankan.com/jianxian-p-12300351.html)_

>作用：主要是用来处理请求的，本质就是个函数
>　中间件本身是一个方法，接收3个参数：request请求对象、response响应对象、next下一个中间件（可选参数，需要调用下一个中间件时使用）
>　当请求进来，会从第一个中间件开始进行匹配。如果匹配则进入，如果不匹配，则向后依次对比匹配
>　注意：执行顺序与调用顺序
>
>主要场景：将一个请求的处理过程，分发到多个环节中，目的效率高，便于维护。即每个环节专门干一件事
```js
//基本格式
function Middleware(request, response, next) { 
   next();
}
```
>比如：.use  .listen之类的_（上面的get之类的也是，只不过不用next）_

**例子**
```js
//头就不写了

app.use((req,res,next) => 
console.log('1')
)
app.use((req,res,next) => 
console.log('2')
)
// 输出：1

app.use((req,res,next) => 
console.log('2')
next()
)
app.use((req,res,next) => 
console.log('1')
)

//输出： 2 \n 1（需要next()交出控制权才有下一个）
```
#### 特殊中间件————all()
和get函数不同
app.all()函数可以匹配所有的HTTP动词，也就是说它可以过滤所有路径的请求，如果使用all函数定义中间件，那么就相当于所有请求都必须先通过此该中间件。
格式：```app.all(path,function(request, response));```

```js
//设置响应头属性值
app.all("*", function(request, response, next) {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });     
    next();
});
```

#### 特殊中间件————use()
use方法可以根据请求的网址，返回不同的网页内容，如下示例：
```js
var express = require("express");
var app = express();

app.use(function(request, response, next) {
   if(request.url == "/") {
      response.send("Welcome to the homepage!");
   }else {
      next();
   }
});

app.use(function(request, response, next) {
   if(request.url == "/about") {
     response.send("Welcome to the about page!");
   }else {
     next();
   }
});

app.use(function(request, response) {
  response.send("404 error!");
});
app.listen(80);
```
>上面代码通过request.url属性，判断请求的网址，从而返回不同的内容。

## 正式学习回调体内的请求方式
1. 如何使用req对象来处理客户端发来的HTTP请求。
    -req.host返回请求头里取的主机名(不包含端口号)。
    -.req.path返回请求的URL的路径名。

如下示例：
```js
var express = require('express');
var app = express();

app.get("*", function(req, res) {
    console.log(req.path);
    res.send("req.host获取主机名，req.path获取请求路径名!");
});

app.listen(80);
```
在浏览器中输入任意一个请求路径，通过req查看主机名或请求路径。

2. req.query获取get请求路径的对象参数值。

格式：```req.query.参数名```；请求路径如下示例：
```
例1： /search?n=Lenka

req.query.n  // "Lenka"

例2： /shoes?order=desc&shoe[color]=blue&shoe[type]=converse

req.query.order  // "desc"
req.query.shoe.color  // "blue"
req.query.shoe.type  // "converse"
```


3. send方法
>send()方法向浏览器发送一个响应信息，并可以智能处理不同类型的数据。格式如下：
```res.send([body|status], [body]);```
1.当参数为一个String时，Content-Type默认设置为"text/html"。
```
res.send('Hello World'); //Hello World
```
2.当参数为Array或Object时，Express会返回一个JSON。
```
res.send({ user: 'tobi' }); //{"user":"tobi"}
res.send([1,2,3]); //[1,2,3]
```
3.当参数为一个Number时，并且没有上面提到的任何一条在响应体里，Express会帮你设置一个响应体，比如：200会返回字符"OK"。
```
res.send(200); // OK
res.send(404); // Not Found
res.send(500); // Internal Server Error
```