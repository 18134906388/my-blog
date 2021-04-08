---
home: true
heroImage: /vue-logo.png
heroText: My Blog
tagline: 博客列表
actionText: 快速上手 →
actionLink: /blog/JS中遇到问题.md
features:
  - title: 学习总结
    details: 平时日常学习积累，包括前端三大栈的基础，以及拓展知识的记录。
  - title: 项目总结
    details: 定期总结项目经历和经验，博观而约取,厚积而薄发。
  - title: 日常填坑
    details: 及时记录平时遇到的坑，避免多次爬坑。
---
```
#nginx配置
server {
  listen       8000;
  server_name  localhost;
  location / {
    root   /opt/web/lizhiwei_blog;
    try_files $uri $uri/ /index.html;
    index  index.html index.htm;
  }
  location ^~ /my-blog {
    root   /opt/web/lizhiwei_blog;
    rewrite  ^.+my-blog(.*)$ /$1 break;
  }
}
```
