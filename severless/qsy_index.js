//这个文件负责起始页的js，服务器交互
//过程：
//1.发送头请求，比较数据库是否有该数据。
//2.if有/没有
//有：返回oop,没有返回err(前端提示)
window.alert("欢迎来到起始页！！")

fetch("http://127.0.0.1:20221/user", { method: get })
    .then(function(response){console.log(response)});