import express from "express";
//导入express并创建对象
const app = express();

app.get("/test", async (res, req) => {
  req.send("数据成功返回");
});

app.post("/user", async (res, req) => {
  console.log(res.body)
});

app.listen(20221, function () {
  //端口监听7700
  console.log("监听端口: 20221 已经开放"); //console.log("app is listening at 127.0.0.1:8081 ");
  console.log("请打开 http://localhost:20221/ 访问结果");
});
//输入
//npx ts-node ./severless\background.ts
//开启服务
