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
          musicIframe.src = "//music.163.com/outchain/player?type=2&id=2604624069&auto=1&height=66";
          musicButton.textContent = '⏸'; // 暂停图标
          isPlaying = true;
      }
  });
});

// 修改表单提交逻辑
document.querySelector('form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = {
    name: this.name.value,
    email: this.email.value,
    message: this.message.value,
    link_function: [...this.link_function].find(r => r.checked)?.value,
    _redirect: this._redirect.value,
    _repo: this._repo.value
  };

  try {
    const response = await fetch('https://api.your-backend.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      window.location.href = formData._redirect;
    } else {
      alert('提交失败，请稍后重试');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('网络错误，请检查连接');
  }
});

// 跳转朱朱墙
function going() {
  window.alert("即将跳转至朱朱墙！请确认！");
  window.open('./hearing/hearing.html', '_self');
}