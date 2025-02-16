//这个文件负责起始页的js，服务器交互
//过程：
//1.发送头请求，比较数据库是否有该数据。
//2.if有/没有
//有：返回res,没有返回err(前端提示)

function yanzheng(){
   let un = document.getElementById("user_name").value;
   let pw = document.getElementById("user_pass").value;
  

   //发送
   fetch("https://39.98.84.17:114/find", {
     method: "post",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ L_name: un, PassWord: pw }),
   })
     .then((res) => res.json())
     .then((data) => {
       if (data.re_res === true) {
         window.alert("登入成功！");
         console.log(data.Name);
        window.localStorage.setItem(Admin,un);
       } else {
         window.alert("是不是没有注册？");
         console.log(data);
       }
     })

     .catch((err) => console.log(err));
}