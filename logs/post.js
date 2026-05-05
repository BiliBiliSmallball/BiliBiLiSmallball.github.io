// ======================= 时钟功能 =======================
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ======================= 加载单篇文章 =======================
async function loadPost() {
    const postContent = document.getElementById('postContent');
    if (!postContent) return;

    // 从 URL 获取文件名参数
    const urlParams = new URLSearchParams(window.location.search);
    const filename = urlParams.get('file');

    if (!filename) {
        postContent.innerHTML = '<div class="loading" style="color: red;">错误：未指定文章文件</div>';
        return;
    }

    try {
        // 请求文章内容文件（假设文章存在 log_film 目录下）
        const response = await fetch(`log_film/${encodeURIComponent(filename)}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}：文章文件不存在或无法访问`);
        }

        // 获取文件内容（假设是 Markdown 或纯文本）
        const content = await response.text();

        // 简单处理：如果是 Markdown，可以进一步解析
        // 这里先按纯文本/HTML 显示
        postContent.innerHTML = `
            <div class="post-full">
                <div class="post-meta" style="margin-bottom: 24px;">
                    <a href="docs_main.html" class="back-link">← 返回博客列表</a>
                </div>
                <div class="post-body" style="line-height: 1.8; font-size: 16px; color: #334155;">
                    ${escapeHtml(content).replace(/\\n/g, '<br>')}
                </div>
            </div>
        `;
    } catch (error) {
        console.error('加载文章失败:', error);
        postContent.innerHTML = `<div class="loading" style="color: red;">
            加载文章失败<br>
            错误详情：${error.message}
        </div>`;
    }
}

// 简单的防XSS辅助函数
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

loadPost();