//检测是否有本地账户
let User_n = window.localStorage.getItem("u_name");
if (!User_n) {
  alert("请注册后使用！");
}

let hand = document.getElementById("title");
hand.innerHTML = String(User_n.value); //ncaught TypeError:无法读取null的属性（读取“value”）
