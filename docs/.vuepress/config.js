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
            { text: 'JavaScript中的一些问题', link: '/blog/JavaScript中的一些问题.md' }
        ],
        sidebarDepth: 2,
        sidebar: [
            ['/', '首页'],
            ['/blog/JavaScript中的一些问题.md', 'JavaScript中的一些问题'],
            ['/blog/CSS中遇到的问题.md', 'CSS中遇到的问题'],
            ['/blog/VUE中的一些问题.md', 'VUE中的一些问题'],
            ['/blog/使用mpvue开发微信小程序遇到的坑.md', '使用mpvue开发微信小程序遇到的坑'],
            ['/blog/项目开发中的坑.md', '项目开发中的坑'],
            // ['/blog/江苏E项目总结.md', '江苏E项目总结'],
            ['/blog/面试遇到的问题.md', '面试遇到的问题'],
            ['/blog/MySql问题总结.md', 'MySql问题总结'],
            ['/blog/有趣的JS文章.md', '有趣的JS文章'],
            ['/blog/前端培训课件.md', '前端培训课件']
        ]
  }
}