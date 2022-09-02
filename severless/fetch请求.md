# fetch().then
## 实例
```js
//请求的网址
var url = "http://127.0.0.1:7777/list";
//发起get请求
var promise = fetch(url).then(function(response) {
 
   //response.status表示响应的http状态码
   if(response.status === 200){
     //json是返回的response提供的一个方法,会把返回的json字符串反序列化成对象,也被包装成一个Promise了
     return response.json();
   }else{
     return {}
   }
});
    
promise = promise.then(function(data){
  //响应的内容
	console.log(data);
}).catch(function(err){
	console.log(err);
})
```
## 2.FETCH请求网络接口
获取https://api.github.com/users中的数据，做法与获取本地JSON的方法类似,得到数据后，同样要经过处理
html部分
```html
<button id="button3">请求网络接口</button>
```
js部分
```js
document.getElementById('button3').addEventListener('click',getExternal);
function getExternal(){
  // https://api.github.com/users
  fetch("https://api.github.com/users")
      .then((res) => res.json())//数据类型转化
      .then(data => {
        console.log(data);
        let output = '';
        data.forEach((user) => {
          output += `<li>${user.login}</li>`;
        })
        document.getElementById('output').innerHTML = output;
      })
      .catch(err => console.log(err));//错误捕捉
}
```