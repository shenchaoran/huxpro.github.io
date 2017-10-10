---
layout: post
tags: 
    - Angular
    - 异步
notebook: 城方实习
catalog: true
---

[TOC]

---

### 预加载数据 Resolve
在初始化组件之前可能需要先准备好视图模型所需的数据，此时可以在路由中使用resolve预加载数据。
- resolve是有层级嵌套的，就像路由的嵌套一样。所以在合适的地方放合适的resolve很重要。

### 消息订阅与发布
使用postal来进行异步流程控制，同时解决了组件之间的复杂通信。

### 生命周期

