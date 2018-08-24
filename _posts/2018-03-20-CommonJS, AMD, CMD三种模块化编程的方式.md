---
layout: post
tags: 
    - NodeJS
    - 模块系统
    - CommonJS
    - AMD
    - CMD
catalog: true
---


# CommonJS
模块是**同步**加载的，只有所有模块加载完成才会进行后续的操作

# AMD: Asynchronous Module Definition
是一个标准，定义了两个API：
1. require([module], callback)
2. define(id, [depends], callback)

依赖前置，异步加载，依赖提前执行
## RequireJS
是AMD标准的最佳实现

# CMD: Common Module Definition
适用于浏览器端，按需加载，依赖就近，依赖延迟执行。写法上类似 CommonJS
## SeaJS
浏览器端的实现
```js
// AMD
define(['./a', './b'], function(a, b) {  // 依赖必须一开始就写好  
   a.doSomething()    
   // 此处略去 100 行    
   b.doSomething()    
   ...
});
// CMD
define(function(require, exports, module) {
   var a = require('./a')   
   a.doSomething()   
   // 此处略去 100 行   
   var b = require('./b') 
   // 依赖可以就近书写   
   b.doSomething()
   // ... 
});
```

# ES6 的语法
静态加载或编译时加载，

# SystemJS
通用模块加载器，支持AMD、CommonJS、ES6等各种格式的JS模块加载，也是Angular2官推的加载器。