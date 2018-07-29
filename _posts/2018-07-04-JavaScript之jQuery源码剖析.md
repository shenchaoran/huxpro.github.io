---
layout: post
tags: 
    - JavaScript
    - jQuery
catalog: true
---


# 整体架构
## jQuery对象的构建方式
``` js
// 模拟的无 new 构建方式
var aQuery = function(selector, context) {
    return  new aQuery.prototype.init();
}
aQuery.prototype = {
    init: function() {
        return this;
    },
    name: function() {
        return this.age
    },
    age: 20
}

aQuery.prototype.init.prototype = aQuery.prototype;

// jQuery 的无 new 构建
(function(window, undefined) {
    var
    // ...
    jQuery = function(selector, context) {
        // 看这里，实例化方法 jQuery() 实际上是调用了其拓展的原型方法 
        return new jQuery.fn.init(selector, context, rootjQuery);
    },
 
    // jQuery.prototype 即是 jQuery 的原型，挂载在上面的方法，即可让所有生成的 jQuery 对象使用
    jQuery.fn = jQuery.prototype = {
        // 实例化化方法，这个方法可以称作 jQuery 对象构造器
        init: function(selector, context, rootjQuery) {
            // ...
            return this;
        }
    }
    // 这一句很关键，也很绕
    // jQuery 没有使用 new 运算符将 jQuery 实例化，而是直接调用其函数
    // 要实现这样,那么 jQuery 就要看成一个类，且返回一个正确的实例
    // 且实例还要能正确访问 jQuery 类原型上的属性与方法
    // jQuery 的方式是通过原型传递解决问题，把 jQuery 的原型传递给jQuery.prototype.init.prototype
    // 所以通过这个方法生成的实例 this 所指向的仍然是 jQuery.fn，所以能正确访问 jQuery 类原型上的属性与方法
    jQuery.fn.init.prototype = jQuery.fn;
 
})(window);
```
其实 `fn` 没有任何特殊意思，只是 `jQuery.prototype` 的引用。

## jQuery 的链式调用
链式调用的优点
- 节约代码量
- 函数返回的都是同一个对象，可以提高代码的效率
- 代码看起来更优雅

链式调用是通过函数返回 `this` 的形式实现。因为返回了当前实例的 this ，从而有可以访问自己的原型了。
``` js
aQuery.prototype = {
    init: function() {
        return this;
    },
    name: function() {
        return this
    }
}
```

## 插件借口
jQuery 提供 extend 来添加扩展。
``` js
jQuery.extend = jQuery.fn.extend = function(){
    // ...
}; 
```

# 参考
[](http://www.cnblogs.com/aaronjs/p/3278578.html)<br>