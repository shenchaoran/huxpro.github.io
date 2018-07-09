---
layout: post
tags: 
    - Angular
    - Depend Injection
catalog: true
---



```
<jqxListBox #eventList [source]='eventList' [displayMember]='"id"' [width]='"100%"' [height]='"100%"'></jqxListBox>
```
以上代码绑定了数据eventList，但是和引用变量的名称冲突了，所以怎么都出错......