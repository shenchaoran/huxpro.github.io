# HTML table
标签和属性
- table
    - bgcolor 背景颜色
    - border 边框宽度
    - cellpadding 单元内便于
    - cellspacing 单元之间的空白
    - frame 规定哪些外侧边框可见
    - rules 规定哪些内侧边框可见
    - summary
    - width
- caption
- colgroup
    - col 通过类或内联样式为一组列设置统一的样式
        - span
- thead, tbody, tfoot
    - tr
    - th
        - rolspan
        - colspan
- td
    - align

# CSS table
保留的 css 类：
- table (table)
- table-row (tr in html)
- table-row-group (tbody)
- table-header-group (thead)
- table-footer-group (tfoot)
- table-column-group (colgroup)
- table-column (col)
- table-cell (td, th)
- table-caption (caption)

对于非 table 元素，会自动生成匿名表对象。
> CSS2.1表格模型中的元素，可能不会全部包含在除HTML之外的文档语言中。这时，那些“丢失”的元素会被模拟出来，从而使得表格模型能够正常工作。所有的表格元素将会自动在自身周围生成所需的匿名table对象，使其符合table/inline-table、table-row、table-cell的三层嵌套关系。

# 参考
- [HTML 4 中的默认样式](https://www.w3.org/TR/CSS2/sample.html)
- [css table 布局](http://www.css88.com/archives/6308)
- [css table布局大法，解决你大部分居中、多列等高、左右布局的问题](https://segmentfault.com/a/1190000007007885)
