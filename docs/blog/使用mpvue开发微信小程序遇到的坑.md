# 使用mpvue开发微信小程序遇到的坑

## page名字不要有大写字母
page包含大写字母会造成vue文件无法正常访问

## 关闭vue-cli的eslint-loader
这个是vue的严格校验，加上它格式有问题时不会编译。

## 实现类element table的组件
https://segmentfault.com/a/1190000009412413
