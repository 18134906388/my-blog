(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{394:function(t,n,e){"use strict";e.r(n);var i=e(45),l=Object(i.a)({},(function(){var t=this.$createElement,n=this._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[this._v("#nginx配置\nserver {\n  listen       8000;\n  server_name  localhost;\n  location / {\n    root   /opt/web/lizhiwei_blog;\n    try_files $uri $uri/ /index.html;\n    index  index.html index.htm;\n  }\n  location ^~ /my-blog {\n    root   /opt/web/lizhiwei_blog;\n    rewrite  ^.+my-blog(.*)$ /$1 break;\n  }\n}\n")])])])])}),[],!1,null,null,null);n.default=l.exports}}]);