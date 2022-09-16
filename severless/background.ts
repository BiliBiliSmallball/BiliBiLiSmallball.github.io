import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);

app.get("/", async (req, res) => {
  res.send("请选择:\n/find,\n/signup查看结果");
});

//测试
app.get("/test", async (req, res) => {
  let t = [1, "1", { 数据: "标配" }];
  res.json(t);
});

app.post("/find", async (req, res) => {
  //用户查询
  const { L_name, PassWord } = req.body;
  const result = await prisma.user.findUnique({
    where: {
      //定位
      L_name: String(L_name),
    },
  });
  //用户判断部分
  if (result?.PassWord === req.body.PassWord) {
    res.json(true);
  } else {
    res.json("err! not find user");
  }
});

app.post("/see", async (req, res) => {
  const result = req.body;
  res.json(result);
});

app.get("/findall", async (req, res) => {
  //查询所有
  const result = await prisma.user.findMany();
  // const result = TODO
  res.json(result);
});

app.post("/signup", async (req, res) => {
  //用户注册
  const { L_name, PassWord } = req.body; //'Name' and 'Email'两个数据从req的body里面抽取
  const result = await prisma.user.create({
    data: {
      L_name,
      PassWord, //直接建
    },
  }); // const result = TODO;              这一行是用来填充的(上面一坨等价于TODO)
  res.json(result);
});

app.listen(114, function () {
  //端口监听7700
  console.log("监听端口: 114 已经开放"); //console.log("app is listening at 127.0.0.1:114 ");
  console.log("请打开 http://localhost:114/ 访问结果");
});
//输入
//npx ts-node ./soulfox.sever/index.ts
//开启服务
