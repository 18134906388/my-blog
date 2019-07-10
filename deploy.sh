#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git remote add origin https://github.com/18134906388/my-blog.git

# git pull origin master --allow-unrelated-histories
# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f origin master:gh-pages

cd -