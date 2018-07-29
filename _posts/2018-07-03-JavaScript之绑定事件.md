---
layout: post
tags: 
    - JavaScript
    - event
catalog: true
---


# 原生方法
1. 在html中使用 onclick 绑定
``` html
<input  onclick="func('axx')"  type="button" />
```
2. `addEventListener()`
``` js
// 第三个参数：false表示冒泡阶段，true捕捉阶段
domObj.addEventListener('click', () => {}, false);
```
3. `attachEvent()`
``` js
domObj.attachEvent('onclick', () => {});
```

# bind(type,[data],function(eventObject))
`.bind` 将会给所有匹配的元素都绑定一次事件，当元素很多时性能会变差。 而且后来动态新增的元素不会被绑定。

`.click` 就是通过 `.bind` 实现的。

可以绑定自定义事件：
``` js
$('#foo').bind('fucked', function(){
    console.log("I'm fucked.");
});
$('#foo').trigger('fucked');
```

# delegate(selector,type,[data],fn)
`.delegate` 是另一种绑定事件的方式（事件委托/代理）。它将事件处理函数绑定在指定的根元素上，由于事件会冒泡，它用来处理指定的子元素上的事件。

```html
<div id="root">
  <a>Alice</a>
  <a>Bob</a>
</div>

<script>
$('#root').delegate('a', 'click', function(){
    console.log('clicked');
});
</script>
```

优点：
- 自动绑定动态添加的元素。因为事件处理函数绑定在#root上，新加的子元素事件也会冒泡到#root。
- 性能好于`.bind()`。只绑定一个事件处理函数，绑定速度相当快。

# one(type, fn)
绑定的事件只会触发一次。

# on(type,[selector],[data],fn)
使用 $(dom).trigger('eventName') 触发
事实上，`.on()` 才是jQuery事件的提供者。其他的事件绑定方法都是通过`.on()`来实现的，请看jQuery1.8.2的源码：
``` js
bind: function( types, data, fn ) {
    return this.on( types, null, data, fn );
},
unbind: function( types, fn ) {
    return this.off( types, null, fn );
},

live: function( types, data, fn ) {
    jQuery( this.context ).on( types, this.selector, data, fn );
    return this;
},
die: function( types, fn ) {
    jQuery( this.context ).off( types, this.selector || "**", fn );
    return this;
},

delegate: function( selector, types, data, fn ) {
    return this.on( types, selector, data, fn );
},
undelegate: function( selector, types, fn ) {
    return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
},
```

# live(type, [data], fn)
和 `delegate` 类似，但是由于性能差废弃了。
相当于 `document.delegate(selector, type, [data], fn)`，因为事件都会最终冒泡到 document 上，所以冒泡级别比较深，效率低。另外，在 fn 中使用 stopPropogation 将无效。

# 一些对比
|trigger|执行浏览器默认操作，例如 input 的 focus 事件会让其获取焦点|
|triggerHandle|不会触发执行浏览器默认操作|