//检测是否有本地账户

let User_n = window.localStorage.getItem("u_name");
if (!User_n) {
  alert("请注册后使用！");
}
window.document.getElementById("D_name").innerHTML = User_n;
