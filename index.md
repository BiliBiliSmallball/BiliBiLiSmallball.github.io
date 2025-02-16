---
layout: default
title: 圆滚滚的小毛的个人网站
---

<!-- 音乐播放控制 -->
<div class="music-controls">▶</div>

<!-- 音乐播放器 -->
<iframe 
  id="music-iframe" 
  frameborder="no" 
  style="display: none;" 
  src="//music.163.com/outchain/player?type=2&id=2043177987&auto=1&height=66"
></iframe>

<!-- 首页内容 -->
<div class="first">
  <div>
    <h5>我真的不知道偷图,找到我就去找百度。</h5>
    <img src="./self_photo.jpg" alt="上学记得换！小狐狸！" width="150" height="150">
    <h2>你好，我是<br/>圆滚滚的小毛<br/>欢迎来到<br/>我的网页</h2>
  </div>
  
  <div class="info-container">
    <div class="hidden-info" data-title="姓名">
      <div class="info-item">姓名：圆滚滚的小毛</div>
    </div>
    <div class="hidden-info" data-title="性别：男">
      <div class="info-item">性别：男</div>
    </div>
    <div class="hidden-info" data-title="籍贯：福建南平人">
      <div class="info-item">籍贯：福建南平人</div>
    </div>
    <div class="hidden-info" data-title="所在地：厦门（或者广州？）">
      <div class="info-item">所在地：厦门（或者广州？）</div>
    </div>
    <div class="hidden-info" data-title="QQ：1535878824">
      <div class="info-item">QQ：1535878824</div>
    </div>
    <div class="hidden-info" data-title="电话：18059267295">
      <div class="info-item">电话：18059267295</div>
    </div>
    <div class="hidden-info" data-title="邮箱">
      <div class="info-item">zzy1535878824@163.com</div>
    </div>
    <div class="hidden-info" data-title="null">
      <div class="info-item"><---联系我(ovo)</div>
    </div>
  </div>
</div>

<!-- 时间显示 -->
<iframe src="./test_addess/time.html" style="position: fixed;top: 20vh;left: 10px;"></iframe>

<!-- 自我介绍 -->
<iframe class="self" src="Bet_On_Me.html"></iframe>

<!-- 联系表单 -->
<div class="first" style="background-color: rgb(159, 206, 188);">
  <h4 style="text-align: center; color: aquamarine;">
    联系我<br />
    <div id="thank"></div>
  </h4>
<form action="https://api.your-backend.com/submit" method="POST">
<input type="hidden" name="_redirect" value="https://yourdomain.com/thank-you">
<input type="hidden" name="_repo" value="BiliBiliSmallball/your-repo">
    <label>
      <p>您是？</p>
      <input type="text" name="name" placeholder="您的姓名？" required />
    </label>
    <label>
      <p>您的邮箱？</p>
      <input type="email" name="email" required />
    </label>
    <label>
      <p>说啥？</p>
      <br />
      <textarea name="message" required style="max-width: 761px; max-height: 62px;width: 100vh;height: 10vh;"></textarea>
    </label>
    <label>
      联系形式:
      <input type="radio" name="link_function" value="QQ" required />QQ
      <input type="radio" name="link_function" value="email" />e-mail
      <input type="radio" name="link_function" value="微信" />微信
      <input type="radio" name="link_function" value="飞书" />飞书
    </label>
    <button type="submit">发送</button>
  </form>
</div>

<!-- 页脚 -->
<p class="ending">
  网站备案号: <del>没有的啦</del><br />
  E-mail: zzy1535878824@163.com
</p>