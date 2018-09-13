FC: Formatting contexts，格式化上下文

# BFC：块级格式化上下文
**BFC的生成：**
既然上文提到BFC是一块渲染区域，那这块渲染区域到底在哪，它又是有多大，这些由生成BFC的元素决定，CSS2.1中规定满足下列CSS声明之一的元素便会生成BFC。
- float的值不为none；
- overflow的值不为visible；
- display的值为inline-block、table-cell、table-caption；
- position的值为absolute或fixed；
- 看到有人把display：table也认为可以生成BFC，其实这里的主要原因在于Table会默认生成一个匿名的table-cell，正是这个匿名的table-cell生成了BFC。

**BFC 的效果：**
- 垂直方向上 `margin 折叠`
- 每个元素的左外边距与包含块的左边界相接触（从左到右），这就是浮动元素靠左浮动的原因
- BFC的区域不会与float的兄弟元素区域重叠，可以利用这一点来进行`多列自适应布局`
- 计算BFC的高度时，浮动子元素也参与计算，用于`清除浮动`
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；

**BFC 的应用：**
- 防止 margin 折叠
- 清除浮动
- 多列布局

# IFC：行内格式化上下文
**IFC 的效果：**
- 对于非置换元素不能指定 width/height，只能根据内容填充，或设置 line-height
- 水平方向的 padding, margin, border 有效，垂直方向上无效
- 对于置换元素根据 height, padding, border, margin 指定宽高
- vertical-align 属性生效
- 元素不会换行
- 换行符受 white-space 属性的影响

**IFC 的应用：**

**IFC 会出现的问题：**
inline-block 元素之间会有 3px 的间隔。产生原因是由于`英文分词`，即空格、换行、回车会产生空白符导致分词。

那么解决该问题就是从消除分词的空格这一角度出发：
- 改变书写方式 <div></div><div></div>
- 父元素的 font-size 设为 0 ，子元素会继承该属性，空格的宽度就为0
- 使用负的 margin
- 设置 word-spacing/letter-spacing

# FFC：弹性格式化上下文
参考 flex 布局

# GFC：网格格式化上下文
参考 grid 布局

# 参考
- [BFC 基础分析](http://www.cnblogs.com/asheng2016/p/7281784.html)
- [我对BFC的理解](https://www.jianshu.com/p/76484dff1cb5)
- [史上最全面、最透彻的BFC原理剖析](https://github.com/zuopf769/notebook/blob/master/fe/BFC%E5%8E%9F%E7%90%86%E5%89%96%E6%9E%90/README.md)