---
layout: post
tags: 
    - JavaScript
    - 异步
catalog: true
---

几个概念：
- Call Stack（执行栈）：所有同步任务都放在主线程上执行，形成一个执行栈
- Web APIs
- Event Loop/Task Queue（事件队列）：即宏任务队列
- MacroTask（宏任务）：Task Queue，存setTimeout，setInterval，I/O，UI rendering等
- MicroTask（微任务）：process.nextTick, Promises(原生的), MutationObserver等。
- Render Queue（渲染队列）

- 同步任务执行完；
- 去执行 microtasks ，把所有 microtasks queues 清空；
- 取出一个 macrotasks queues 的完成事件，在执行栈中执行，期间生成的所有 microTask 插入到微任务队列中；
- 再去执行 microtasks；
- ...
- ...
- ...

```js
setTimeout(function() {
    console.log('timeout1');
})

new Promise(function(resolve) {
    console.log('promise1');
    for(var i = 0; i < 1000; i++) {
        i == 99 && resolve();
    }
    console.log('promise2');
}).then(function() {
    console.log('then1');
})

console.log('global1');
// promise1
// promise2
// global1
// then1
// timeout1
```

# 参考
- [loupe](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
- [node 异步执行流程](https://juejin.im/post/5b35cdfa51882574c020d685)
- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)