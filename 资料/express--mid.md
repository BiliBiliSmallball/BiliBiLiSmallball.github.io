# Express中间件
>**来源：[Express中间件简介](http://t.zoukankan.com/jianxian-p-12300351.html)** 

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

#### 2. req.query获取get请求路径的对象参数值。

格式：```req.query.参数名```；请求路径如下示例：
```
例1： /search?n=Lenka

req.query.n  // "Lenka"

例2： /shoes?order=desc&shoe[color]=blue&shoe[type]=converse

req.query.order  // "desc"
req.query.shoe.color  // "blue"
req.query.shoe.type  // "converse"
```


#### 3. send方法
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

#### 4. express.static —— 指定静态文件的查找目录。
```js
app.use(express.static(require("path").join(__dirname, 'public')));
```

使用use函数调用中间件指定express静态访问目录，'public'就是我们我们新建的用来存放静态文件的总目录。

#### 5.render----调用基础格式

res.render(view, [locals], callback);
- 参数view就是模板的文件名
- callback用来处理返回的渲染后的字符串，
- options、callback可省略，在渲染模板时locals可为其模板传入变量值，在模板中就可以调用所传变量了。
