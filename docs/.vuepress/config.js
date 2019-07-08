module.exports = {
    base: '/my-blog/',
    title: 'my-blog',
    description: 'My blog by vuepress',
    themeConfig: {
        // 你的GitHub仓库，请正确填写
      repo: 'https://github.com/18134906388/my-blog',
      // 自定义仓库链接文字。
      repoLabel: 'My GitHub',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'FirstBlog', link: '/blog/FirstBlog.md' }
        ]
  }
}