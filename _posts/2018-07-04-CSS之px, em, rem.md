---
layout: post
tags: 
    - CSS
    - 单位
catalog: true
---


# px
`px` 是一个`虚拟长度单位`，是计算机系统的数字化图像长度单位，如果 px 要换算成物理长度，需要指定精度 `DPI(Dots Per Inch，每英寸像素数)`，在扫描打印时一般都有DPI可选。Windows系统默认是96dpi，Apple系统默认是72dpi。

CSS 中的 1px 并不等于移动设备上的 1px，CSS 中的 1px 在桌面端表示 1 个物理像素，在移动设备上要乘以 `devicePixelRatio`。实际上，在桌面端使用ctrl+滚轴缩放网页时，改变的也是这个值。

在移动设备上px的大小和 `device pixel ratio (物理像素/独立像素)` 有关，比如 apple 的视网膜屏的 device pixel ratio = 2，那么在苹果手机上占用 2 个物理像素。

# em
`em` 指字体高，所有浏览器的默认字体高都是 `16px`。所以未经调整的浏览器都符合: `1em=16px`。那么 `12px=0.75em, 10px=0.625em`。为了简化 `font-size` 的换算，需要在css中的body选择器中声明 `Font-size=62.5%`，这就使 `em` 值变为 `16px*62.5%=10px`, 这样 `12px=1.2em, 10px=1em`, 也就是说只需要将你的原来的 `px` 数值除以 `10`，然后换上 `em` 作为单位就行了。

# rem
`rem` 是CSS3新增的一个相对单位（root em，根em）。这个单位与em的区别在于使用rem相对的是 `HTML 根元素`。只要根元素不修改font-size属性，那么rem的相对大小不会变，而em是相对父元素的font-size设置相对大小。

**优点：**不会出现像em那样 `1.2em * 1.2em = 1.44em` 的情况出现，因为rem是相对html的font-size设置，而em是相对父元素的font-size。

# pt
是一个`物理长度单位`，指的是72分之一英寸。

# viewport, vh, vw
ppk 大神关于 viewport 的理解：
- layout viewport: 表示网页的大小，包括超出屏幕出现滚动条时的整个大小
- visual viewport: 表示可视区域的大小，即屏幕宽
- ideal viewport: 表示移动设备的理想 viewport，也等于移动设备的屏幕宽度。针对 ideal viewport 设计的网站，不需要用户手动缩放，也不会出现横向滚动条，而且字体的大小是合适的。

vh, vw 分别表示屏幕高度和宽度的百分比。

# 参考
- [CSS 单位 px rem em](https://segmentfault.com/a/1190000010623222)
- [在线单位转换工具](http://pxtoem.com/)
- [在线示例](https://codepen.io/tutsplus/pen/bdxWbB)