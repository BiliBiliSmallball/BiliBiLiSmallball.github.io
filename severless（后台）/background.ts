import express from "express";
//导入express并创建对象
const app = express();

import cors from "cors"//网站跨域请求
app.use(
  cors({
    origin: "*", //网站跨域请求，允许请求所有
    methods:["GET","POST"]
  })
);

app.get("/hellow", async (req, res) => {
  res.send({by:"你好世界"});
});

app.get("/test", async (req, res) => {
  res.send({hello:"数据成功返回"});
});

app.post("/user", async (req, res) => {
  console.log(req.body)
});

app.listen(433, function () {
  //端口监听7700
  console.log("监听端口: 433 已经开放"); //console.log("app is listening at 127.0.0.1:433 ");
  console.log("请打开 http://localhost:433/ 访问结果");
});
//输入
//npx ts-node ./severless\background.ts
//开启服务
