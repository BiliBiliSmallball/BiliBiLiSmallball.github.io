# Express服务器插件学习
[来源](http://cw.hubwiz.com/card/c/544db33888dba01ef09d0682/1/1/13/)

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

来源：[http协议](./http%E5%8D%8F%E8%AE%AE.md)

### 2.中间件

**已经将其转到另一个文档[中间件](./express--mid.md)**  

## 页面模板引擎 ----ejs(备选)
>[ejs官方](https://ejs.bootcss.com/#install)
以ejs模板为例，讲述模板渲染网页模板的基础功能。

1. ejs模板安装方法: ```npm install ejs```
2. 目录下安装好了之后，如何调用呢，如下所示：
```js
//指定渲染模板文件的后缀名为ejs
app.set('view engine', 'ejs');
```
默认ejs模板只支持渲染以ejs为扩展名的文件，  
可能在使用的时候会觉得它的代码书写方式很不爽还是想用html的形式去书写，该怎么办呢?  
这时就得去修改模板引擎了，也就会用到express的engine函数。
engine注册模板引擎的函数，处理指定的后缀名文件。
```js
// 修改模板文件的后缀名为html
app.set( 'view engine', 'html' );
// 运行ejs模块
app.engine( '.html', require( 'ejs' ).__express );
```
>"__express"，ejs模块的一个公共属性，表示要渲染的文件扩展名。

### 静态环境
如果要在网页中加载静态文件（css、js、img），就需要另外指定一个存放静态文件的目录。  
当浏览器发出非HTML文件请求时，服务器端就会到这个目录下去寻找相关文件。
_步骤_
1. 项目目录下添加一个存放静态文件的目录为public。
2. 在public目录下在添加三个存放js、css、img的目录，相应取名为javascripts、stylesheets、images。
3. 然后就可以把相关文件放到相应的目录下了。
4. 比如，浏览器发出如下的样式表请求：
```html
 <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
```
服务器端就到public/stylesheets/目录中寻找bootstrap.min.css文件。

有了静态目录文件，我们还得在启动文件里告诉它这个静态文件路径，需要指定一下，如下所示：
```js
app.use(express.static(require('path').join(__dirname, 'public')));
```
PS：express.static —— 指定静态文件的查找目录。
使用use函数调用中间件指定express静态访问目录，'public'就是我们我们新建的用来存放静态文件的总目录。