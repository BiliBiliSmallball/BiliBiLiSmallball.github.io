# fetch().then
来源[点我了解](https://www.freesion.com/article/59231320087/)
## 实例
>重写一遍
```js
fetch('服务器地址（完整）',)//返回一个primis对象
  .then()//下一步（响应服务器内容）
  .catch()//错误捕捉。
```
其中：
1.  .then()//下一步（响应服务器内容）
2.  .catch()//错误捕捉。
利用```.then(res => console.log(res))```可以看到返回一个对象，即
```js
fetch('服务器地址（完整）',)//返回一个primis对象
  .then(res => console.log(res))
  //得到对象
  .then(res => res.json())//json转化为js对象
```
### 综上所述

## 服务器配置
>npm install cors
配置跨域请求
[Express学习](http://cw.hubwiz.com/card/c/544db33888dba01ef09d0682/1/1/12/)