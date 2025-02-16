// server.js
const express = require('express');
const { Octokit } = require('@octokit/rest');
const app = express();

app.use(express.json());

app.post('/submit', async (req, res) => {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    const issue = await octokit.issues.create({
      owner: 'BiliBiliSmallball',
      repo: 'form-issues',
      title: `来自 ${req.body.name} 的新反馈`,
      body: `
**邮箱**: ${req.body.email}
**联系方式**: ${req.body.link_function}
**留言**:
${req.body.message}
      `,
      labels: ['form-submission']
    });

    res.redirect(req.body._redirect);
  } catch (error) {
    console.error(error);
    res.status(500).send('提交失败');
  }
});

app.listen(3000);