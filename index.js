//函数变量绑定区
let in_name = document.getElementsByName("name");

function thank() {
  document.getElementById("thank").innerHTML =
    "感谢您的留言!<br>我将于2~3个工作日内以您所选的联系形式回复您";
}
function going(){
    window.alert("即将跳转至朱朱墙！请确认！");
    window.open('./hearing/hearing.html','_self')
}

function clock(){
  var clock = document.getElementById("clock")
}