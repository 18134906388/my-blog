module.exports = {
    base: '/my-blog/',
    title: 'my-blog',
    description: 'My blog by vuepress',
    head: [
        ['link', { rel: 'shortcut icon', type: "image/png", href: `/vue-logo.png` }]
    ],
    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'https://github.com/18134906388/my-blog',
        // 自定义仓库链接文字。
        repoLabel: 'My GitHub',
        nav: [
            { text: '首页', link: '/' },
            // { text: '文档', link: '/blog/JavaScript中的一些问题.md' }
        ],
        algolia: {
            apiKey: '45266fef189a0e1d66f56a13dbd73b07',
            indexName: 'rst-bj'
        },
        sidebarDepth: 1,
        sidebar: [
            ['/', '首页'],
            ['/blog/JS中遇到问题.md', 'JS中遇到问题'],
            ['/blog/CSS中遇到的问题.md', 'CSS中遇到的问题'],
            ['/blog/VUE中的一些问题.md', 'VUE中的一些问题'],
            ['/blog/使用mpvue开发微信小程序遇到的坑.md', '小程序'],
            ['/blog/面试遇到的问题.md', '面试遇到的问题'],
            ['/blog/MySql问题总结.md', 'MySql问题总结'],
            ['/blog/云服务器配置.md', '云服务器配置'],
            ['/blog/有趣的JS文章.md', '有趣的JS文章'],
            ['/blog/前端培训课件.md', '前端培训课件'],
            {
                title: '项目总结',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    ['/blog/项目开发中的坑.md', '项目开发中的坑'],
                    ['/blog/江苏E项目总结.md', '江苏E项目总结'],
                    ['/blog/上海R项目总结.md', '上海R项目总结'],
                    ['/blog/大数据可视化平台.md', '大数据可视化平台'],
                    ['/blog/喜马拉雅项目总结.md', '喜马拉雅项目总结']
                ]
            },
            {
                title: '技术沉淀',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    ['/blog/流媒体播放器.md', '流媒体播放器'],
                    ['/blog/gis总结.md', 'gis总结']
                ]
            }
        ]
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@img': '/.vuepress/public/img'
            }
        }
    }
}