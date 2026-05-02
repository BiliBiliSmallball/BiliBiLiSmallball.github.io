function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = h + ':' + m + ':' + s;
}

setInterval(updateClock, 1000);
updateClock();

// 解析 front matter
function parseFrontMatter(text) {
    const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (!match) return null;

    const meta = {};
    match[1].split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            const value = line.slice(colonIndex + 1).trim();
            meta[key] = value;
        }
    });

    return {
        meta: meta,
        content: match[2].trim()
    };
}

// 生成摘要
function makeExcerpt(content, maxLength) {
    const plain = content
        .replace(/#+ /g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/`{3}[\s\S]*?`{3}/g, '[代码]')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/\n+/g, ' ')
        .trim();

    if (plain.length <= maxLength) return plain;
    return plain.slice(0, maxLength) + '...';
}

// 加载文章列表
async function loadPosts() {
    const postList = document.getElementById('postList');

    try {
        // 通过 GitHub API 获取 log_film 目录内容
        const apiUrl = 'https://api.github.com/repos/BiliBiliSmallball/BiliBiLiSmallball.github.io/contents/log_film';

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('API 不可用');
        }

        const files = await response.json();
        const mdFiles = files.filter(f => f.name.endsWith('.md'));

        const posts = [];
        for (const file of mdFiles) {
            const contentResponse = await fetch(file.download_url);
            const text = await contentResponse.text();
            const parsed = parseFrontMatter(text);

            if (parsed) {
                posts.push({
                    title: parsed.meta.title || file.name.replace('.md', ''),
                    date: parsed.meta.date || '',
                    tag: parsed.meta.tag || '随笔',
                    excerpt: makeExcerpt(parsed.content, 120),
                    filename: file.name
                });
            }
        }

        // 按日期倒序排列
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        renderPosts(posts);

    } catch (e) {
        postList.innerHTML = '<div class="loading">请确保 log_film 目录存在且包含 .md 文件<br>错误: ' + e.message + '</div>';
        console.error('加载失败:', e);
    }
}

function renderPosts(posts) {
    const postList = document.getElementById('postList');

    if (posts.length === 0) {
        postList.innerHTML = '<div class="loading">暂无文章</div>';
        return;
    }

    postList.innerHTML = posts.map(post => `
        <article class="post" onclick="location.href='post.html?file=${encodeURIComponent(post.filename)}'">
            <div class="post-meta">
                <span class="post-date">${post.date}</span>
                <span class="post-tag">${post.tag}</span>
            </div>
            <h2 class="post-title">${post.title}</h2>
            <p class="post-excerpt">${post.excerpt}</p>
        </article>
    `).join('');
}

// 页面加载完成后执行
loadPosts();