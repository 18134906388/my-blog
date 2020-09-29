# gis总结

在项目中经常会使用到gis地图,市场上有高德地图、百度地图、腾讯地图，换有一些地图引擎arcgis、openlayer等,各种厂商的地图对接会造成极大的工作量和重复劳动，基于这个问题，目前有两种解决办法。

1. 我司封装的znvmap地图组件、其中封装的多个厂商的API、保障了对外API的一致性，即可实现一次编码，多种地图的无缝切换。<https://www.npmjs.com/package/znvmap>
2. 盛政老师的greengis，开发一套新的gisAPI，但是通过一个巧妙的方法将greengis的图层和地图图层关联。<https://www.zhihu.com/people/sheng-zheng-10/zvideos>
