# 江苏E项目

## 项目简介
E项目是江苏电网的能源侧项目，目标是打造一个数据中台，通过对接算子平台，最后实现无代码开发应用的能力。所谓数据中台，即实现数据的分层与水平解耦，沉淀公共的数据能力，笔者认为可分为三层，数据模型、数据服务与数据开发，通过数据建模实现跨域数据整合和知识沉淀，通过数据服务实现对于数据的封装和开放，快速、灵活满足上层应用的要求，通过数据开发工具满足个性化数据和应用的需要。本人有幸参与了该项目前端架构，下面总结一下前端开发中的问题。
## 前端项目架构
前端目前分为两个工程，一个前台工程，一个中台工程，对接第三方登录（客户要求）。开始时工程相互独立，有各自登录模块，后面屏蔽登录模块，统一通过第三方登录入口。目前前台定位为门户，大部分模块不需要鉴权功能,中台定义为工作台，对不同角色区分权限，菜单数据通过后台返回。<br>
![E项目架构](./img/E-Program.png?raw=true)

## 项目中遇到问题
以下所有的前台工程工程统称为API工程，中台工程统称Web工程，
### 工程合并
开始两个工程在服务器中映射两个端口号就行访问，两个项目独立访问，后面需要集成，采用nginx映射同一端口在Web工程端口和/#/之间增加一层路径/platform/，这样不会因为浏览器同源策略导致两个工程不能共享浏览器session，前台通过点击工作台跳转中台。这里需要注意VUE脚手架需要再配置一层路径 `publicPath: '/platform/'`。
同时nginx也要同步配置
```
server {
  listen 80;
  server_name web-platform;
  root /data/store/dist;
  include /etc/nginx/default.d/*.conf;

  location ~* (swagger-ui.html)$ {
    deny all;
  }
  location / {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    client_max_body_size 20m;
    client_body_buffer_size 128k;
    proxy_connect_timeout 5;
    proxy_send_timeout 60;
    proxy_read_timeout 60;
    expires 0;
    index index.html;
  }
  location ^~ /platform/ {
    alias /data/platform/dist/;
    try_files $uri $uri/ /index.html;
  }
  location ^~ /apimanager/ {
    alias /data/swagger/dist/;
    try_files $uri $uri/ /index.html;
  }
  location ^~ /appEngine/ {
    alias /data/edaas/demo630/;
    try_files $uri $uri/ /index.html;
  }
  location ^~ /cop/ {
    alias /data/cop/dist/;
    try_files $uri $uri/ /index.html;
  }
  location ^~ /iotcenter/ {
    alias /data/iotcenter/dist/;
    try_files $uri $uri/ /index.html;
  }
  location ^~ /datacenter/ {
    alias /data/datacenter/dist/;
    try_files $uri $uri/ /index.html;
  }

  location ^~ /store/ {
    alias /data/store/dist/;
    try_files $uri $uri/ /index.html;
  }
  location ^~ /storemanager/ {
    alias /data/store/storemanager/;
    try_files $uri $uri/ /index.html;
  }


  location /gw {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    client_max_body_size 20m;
    rewrite ^.+gw/(.*)$ /$1 break;
    proxy_pass http://127.0.0.1:18902;
    proxy_http_version 1.1;
  }
  location /resource {
    rewrite ^.?resource/(.*)$ /$1 break;
    proxy_pass http://127.0.0.1:18904;
    proxy_http_version 1.1;
  }

  error_page 404 /404.html;
  location = /40x.html {
  }

  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
  }

  location ^~ /file/ {
    alias /data/files/;
  }

}
```
### 大屏报表拖拽
对每个报表组件化，使用`@dragstart @dragend @drop @dragover.prevent`去对拖动事件就行捕获，采用:is=''对组件动态实例化。
[Vue Drag and Drop](https://www.jianshu.com/p/4d997bd855d3)
也可以采用比较成熟的vue-drag-drop库去实现。

## 项目亮点
### 工具函数包
对于一些常用的工具函数封装到一个npm包中统一管理，方便后续项目集成使用。 `npm install supper-tools`

### 简单微前端功能的实现
由于整个数据中台由基础管控平台、物联中心、数据中心、swagger平台等多个前端工程组成、后续可能还要集成更多的工程。如何实现一个 多个前端工程可以任意拼装成一个工程，并且每个工程依然可以单独部署使用。
最后在基础管理平台上边实现了这个功能，其他平台任意页面可以集成在基础管理平台中作为一个菜单，菜单之间可以相互交互。
缺点：使用iframe对页面嵌套，使得整个工程不太灵活

