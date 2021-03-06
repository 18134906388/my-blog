# 上海R项目

## 项目简介
R项目是我司在上海智慧城市打造的重点项目，其中涵盖公安、城运、社区、居委多个维度的可视化智能分析，我在其中主要复制城运方面的开发工程开发，主要是浦东36街镇可视化页面，以及响应的管理平台。

## 项目中遇到问题

### 如何通过同一个工程保证36个街镇36套前端服务
由于36个街镇在在大部分功能通用，因此合理的使用一些配置文件，保证每个街镇的定制化开发。
### 分辨率支持
可视化界面需要2K+4K的支持，这里选择通过两套css文件实现，不涉及到px方面的样式写在vue文件里面，另外使用两个css文件，去实现不同分辨率下面的样式，最后在页面初始化时根据屏幕分辨率选择加载不同的样式文件。
### 第三方sdk集成
可视化页面中集成了多个sdk，如城运通，海康流媒体播放器、高德地图等，合理的定制前端规范，以及对sdk的二次封装。

## 项目中的亮点

### 流媒体播放器znv-video

由于可视化页面很多地方都有监控的功能，并且包含多种类型的流媒体，如 hls、rtsp、rtmp，因此我集成了海康的萤石播放器以及网上开源的video.js输出了znv-player，它支持了多种流媒体视频、以及多种解码方式。

### 地图功能

由于可视化页面中涉及了大量的地图操作，因为对高德API进行封装输入znv-map，极大的对业务功能和地图操作进行解耦，提高了可维护性。

## 后续衍生产品

### 城市治理综合管理平台（基线版本）

- 流媒体播放器优化，新增flv格式的支撑，并对时延优化到500ms内
- 对多地图集成，包含高德、百度、arcgic、openlayer、超图、greenGis
- 大量业务逻辑支持可配置
- 权限配置支持到按钮级

### 上海一网统管平台

- 大量支持websocket，可视化页面通过指挥页面去控制，指挥页面发指令，可视化页面通过websocket接收去进行对应操作。
- 支持大量流媒体视频播放。发现由于chrome 最高六路并发的机制，flv同时只能六路播放。
