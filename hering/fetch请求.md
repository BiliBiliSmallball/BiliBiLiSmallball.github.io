# fetch().then

来源[点我了解](https://www.freesion.com/article/59231320087/)

## 实例

> 重写一遍

```js
fetch("服务器地址（完整）") //返回一个primis对象
  .then() //下一步（响应服务器内容）
  .catch(); //错误捕捉。
```

其中：

1.  .then()//下一步（响应服务器内容）
2.  .catch()//错误捕捉。
    利用`.then(res => console.log(res))`可以看到返回一个对象，即

```js
fetch("服务器地址（完整）") //返回一个primis对象
  .then((res) => console.log(res))
  //得到对象
  .then((res) => res.json()); //json转化为js对象
```

### 综上所述

1. post 请求标准格式

```js
function push() {
      //获取数据，并组合成对象

      fetch("服务器地址/user",{
        method: "POST",
        body: JSON.stringify({ sheet }), //传输主体
        headers: {
          "Content-Type": "applocation/json",
        },
      })
        .then((response) => response.json())
        //后续操作
        .then((data) => console.log(data));
        .catch((err) => console.log(err)); //错误捕捉
    }
```
