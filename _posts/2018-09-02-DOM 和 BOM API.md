
# DOM
![](/img/in-post/js/DOM opetator.png)

# BOM
![](/img/in-post/js/BOM operator.png)

**window.onload vs $(document).ready**
- window.onload: 所有文件都加载完成触发
- $(document).ready: DOM 结构绘制完成触发，包装了原生的 `DOMContentLoaded` 事件
- 前者只有一个触发函数，重复添加会覆盖，后者可以添加多个触发响应函数