// 音乐播放控制
document.addEventListener('DOMContentLoaded', () => {
  const musicIframe = document.querySelector('iframe[src*="music.163.com"]');
  const musicButton = document.querySelector('.music-controls');

  let isPlaying = false;

  musicButton.addEventListener('click', () => {
      if (isPlaying) {
          musicIframe.src = "";
          musicButton.textContent = '▶'; // 恢复播放图标
          isPlaying = false;
      } else {
          musicIframe.src = "//music.163.com/outchain/player?type=2&id=2043177987&auto=1&height=66";
          musicButton.textContent = '⏸'; // 暂停图标
          isPlaying = true;
      }
  });
});

// 表单提交逻辑
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  // 获取表单值
  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const message = document.querySelector('textarea[name="message"]').value;
  const contactMethod = Array.from(document.querySelectorAll('input[name="link_function"]:checked')).map(radio => radio.value);

  // 验证逻辑
  if (!name || !email || !message || contactMethod.length === 0) {
      alert('请填写完整信息。');
      return;
  }

  // 提交成功后清空表单并显示感谢语
  document.getElementById("thank").classList.add('visible');
  setTimeout(() => {
      document.getElementById("thank").classList.remove('visible');
  }, 3000);

  this.reset();
});

// 跳转朱朱墙
function going() {
  window.alert("即将跳转至朱朱墙！请确认！");
  window.open('./hearing/hearing.html', '_self');
}