//这个文件负责起始页的js，服务器交互
//过程：
//1.发送头请求，比较数据库是否有该数据。
//2.if有/没有
//有：返回res,没有返回err(前端提示)
window.alert("欢迎来到起始页！！");

fetch("http://localhost:433/test", { method: "GET" })
  .then((res) => res.json())
  .then((data) => console.log(data));


// 出现net::ERR_CONNECTION_REFUSED问题, 
// 1.一般是访问的端口号或者ip地址有问题,如图改成本地项目访问地址即可 
// 2.项目的后端代码没有启动