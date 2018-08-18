---
layout: post
tags: 
    - JavaScript
    - 闭包
catalog: true
---


# 闭包
在一些编程语言中，函数中的局部变量仅在函数的执行期间可用。但是在 js 中使用闭包并非如此。
闭包是由`函数`以及创建该函数的`词法环境`组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量。
``` js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

## 实用的闭包
闭包很有用，因为它允许将函数与其所操作的某些数据（环境）关联起来。这显然类似于面向对象编程。在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联。**因此，通常你使用只有一个方法的对象的地方，都可以使用闭包**。

## 使用闭包模拟私有属性和方法
``` js
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
```

## 在循环中使用闭包
```js
for (var i = 1; i <= 5; i++) {
    setTimeout(function(){
		console.log(i)  // 5 5 5 5 5
    }, i * 1000);
}
```
```js
for (var i = 1; i <= 5; i++) {
    // 避免过多地使用闭包，可以使用 let （块及作用域）
    let v = i;
    setTimeout(function(){
		console.log(v)  // 1 2 3 4 5
    }, i * 1000);
}
```
``` js
var logV = function(v) {
	return () => {
		console.log(v)
	}
}
for (var i = 1; i <= 5; i++) {
    setTimeout(logV(i), i * 1000);
}
```

# 参考
- [MDN 闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)