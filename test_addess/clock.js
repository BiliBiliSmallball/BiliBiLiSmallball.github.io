function updateClock() {  
    var now = new Date();  
    var hours = now.getHours();  
    var minutes = now.getMinutes();  
    var seconds = now.getSeconds();  
  
    hours = hours.toString().padStart(2, '0'); // 使用padStart来确保小时始终两位数  
    minutes = minutes.toString().padStart(2, '0'); // 使用padStart来确保分钟始终两位数  
    seconds = seconds.toString().padStart(2, '0'); // 使用padStart来确保秒始终两位数  
  
    var time = hours + ':' + minutes + ':' + seconds;  
    document.getElementById('clock').textContent = time;  
}  
  
// 每隔一秒钟更新一次时间  
setInterval(updateClock, 1000);