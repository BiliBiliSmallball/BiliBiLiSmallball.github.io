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

// ======================= 渲染文章列表 =======================
function renderPosts(posts) {
    const postList = document.getElementById('postList');
    if (!postList) return;

    if (posts.length === 0) {
        postList.innerHTML = '<div class="loading">暂无文章</div>';
        return;
    }

    postList.innerHTML = posts.map(post => `
        <article class="post" onclick="location.href='post.html?file=${encodeURIComponent(post.filename)}'">
            <div class="post-meta">
                <span class="post-date">${post.date || ''}</span>
                <span class="post-tag">${post.tag || '随笔'}</span>
            </div>
            <h2 class="post-title">${escapeHtml(post.title)}</h2>
            <p class="post-excerpt">${escapeHtml(post.excerpt || '')}</p>
        </article>
    `).join('');
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

// ======================= 加载文章列表 =======================
async function loadPosts() {
    const postList = document.getElementById('postList');
    if (!postList) return;

    try {
        const response = await fetch('log_film/index.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}：索引文件不存在或无法访问`);
        }
        const data = await response.json();

        if (!data.posts || !Array.isArray(data.posts) || data.posts.length === 0) {
            postList.innerHTML = '<div class="loading">暂无文章，请在 log_film/index.json 中添加 posts 数组</div>';
            return;
        }

        const posts = data.posts.map(post => ({
            title: post.title || '无标题',
            date: post.date || '',
            tag: post.tag || '随笔',
            excerpt: post.excerpt || '',
            filename: post.filename || ''
        })).filter(post => post.filename);

        posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        renderPosts(posts);
    } catch (error) {
        console.error('加载失败:', error);
        postList.innerHTML = `<div class="loading" style="color: red;">
            请确保 log_film 目录存在且包含 index.json 文件<br>
            错误详情：${error.message}
        </div>`;
    }
}

loadPosts();