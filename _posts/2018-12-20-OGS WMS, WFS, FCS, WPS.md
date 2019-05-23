# WMS
网络地图服务，通过URL标识具有空间信息的地图数据
参考[这里](https://blog.csdn.net/xcymorningsun/article/details/60575543)

# WFS
网络矢量服务，通过URL标识点、线、面等空间矢量数据

http://localhost:8888/CMIP-backend/geoserver/Carbon_Cycle/wfs?SERVICE=WFS&VERSION=1.3.0&REQUEST=GetFeature&typename=Carbon_Cycle:site&outputFormat=json

# WCS
网络栅格服务，通过URL标识栅格数据，如遥感数据

# WPS
网络处理服务，通过UI也标识一个空间计算服务。可以直接调用WMS、WFS、WCS资源作为输入、输出空间数据

限制：
    - 基于GML数据标准
    - GIS数据量大，面临着数据传输问题。所以常用的WPS往往是非常简单的操作，处理的数据量小。解决方法是代码/服务迁移

# 参考
- [Geoserver教程：发布WMS、WCS、WFS](https://www.cnblogs.com/cumtb3S/p/9104059.html)
- [代码实现自动发布Gwoserver WCS服务](https://www.cnblogs.com/arxive/p/8416427.html)