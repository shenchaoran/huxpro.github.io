---
layout: post
tags: 
    - toPrimitive()
    - valueOf()
    - toString()
catalog: true
---


# 基本数据类型
## string
## number
## boolean
## object
### 对象的深拷贝与浅拷贝
### 对象值的比较

对于`string, number`简单数据类型的比较，js是按照值来比较，而对于对象的比较，js是按照内存地址来比较的。所以连个深度拷贝的对象无论是`==`还是`===`都不相等。
可以使用lodash的库函数`isEqual`

## null
null 是一个字面量。

## undefined
- not define 和 undefined 不一样，前者表示为定义，后者表示不明确的
```js
console.log(asdfasfasdfsadfasdf)    // 报错 not defined
console.log(window.asdfasdfasfd)    // undefined
```

### null 和 undefined 的区别
1. 语义上的区别
   - null：表示一个值被定义了，定义为“空值”；
   - undefined：表示根本不存在定义。
    
    **所以设置一个值为 null 是合理的**，如
    objA.valueA = null;
    **但设置一个值为 undefined 是不合理的**，如
    objA.valueA = undefined; // 应该直接使用 delete objA.valueA; 任何一个存在引用的变量值为undefined都是一件错误的事情。

    这样判断一个值是否存在，就可以用
    objA.valueA === undefined // 不应使用 null 因为 undefined == null，而 null 表示该值定义为空值。

    这个语义在JSON规范中被强化，这个标准中不存在 undefined 这个类型，但存在表示空值的 null 。在一些使用广泛的库（比如jQuery）中的深度拷贝函数会忽略 undefined 而不会忽略 null ，也是针对这个语义的理解。
2. JS 中同时存在 undefined 和 null 是合理的。
   首先在 Java 中不存在 undefined 是很合理的：Java 是一个**静态类型语言**，对于 Java 来说不可能存在一个“不存在”的成员（不存在的话直接就编译失败了），所以只用 null 来表示语义上的空值。而 JavaScript 是一门动态类型语言，成员除了表示存在的空值外，还有可能根本就不存在（因为存不存在只在运行期才知道），所以这就要一个值来表示对某成员的 getter 是取不到值的。
3. typeof null 结果是 ”object“ 更像是一个设计失误
4. Number(null) === 0，参考 C 语言的设计
5. Number(undefined) === undefined
6. 通常用 a = null 来释放资源

## Symbol

# 隐式类型转换
## toPrimitive
对于非原始类型的值(Number, String, Boolean)，会自动调用 `toPrimitive()` 转为原始类型

代码示例：
```js
// 没有 Symbol.toPrimitive 属性的对象
var obj1 = {};
console.log(+obj1);     // NaN
console.log(`${obj1}`); // "[object Object]"
console.log(obj1 + ""); // "[object Object]"

// 拥有 Symbol.toPrimitive 属性的对象
var obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint == "number") {
      return 10;
    }
    if (hint == "string") {
      return "hello";
    }
    return true;
  }
};
console.log(+obj2);     // 10      -- hint is "number"
console.log(`${obj2}`); // "hello" -- hint is "string"
console.log(obj2 + ""); // "true"  -- hint is "default"
```

如果PreferredType被标记为Number，则会进行下面的操作流程来转换输入的值。
1. 如果输入的值已经是一个原始值，则直接返回它
2. 否则，如果输入的值是一个对象，则调用该对象的valueOf()方法，
   如果valueOf()方法的返回值是一个原始值，则返回这个原始值。
3. 否则，调用这个对象的toString()方法，如果toString()方法返回的是一个原始值，则返回这个原始值。
4. 否则，抛出TypeError异常。

如果PreferredType被标记为String，则会进行下面的操作流程来转换输入的值。
1. 如果输入的值已经是一个原始值，则直接返回它
2. 否则，调用这个对象的toString()方法，如果toString()方法返回的是一个原始值，则返回这个原始值。
3. 否则，如果输入的值是一个对象，则调用该对象的valueOf()方法，
   如果valueOf()方法的返回值是一个原始值，则返回这个原始值。
4. 否则，抛出TypeError异常。

既然PreferredType是可选参数，那么如果没有这个参数时，怎么转换呢？PreferredType的值会按照这样的规则来自动设置：
1. 该对象为Date类型，则PreferredType被设置为String
2. 否则，PreferredType被设置为Number

## valueOf
Number, Boolean, String 基本类型的会返回相应的值，Data 类型会返回 number，其他会返回 this，即对象本身

## toString
```js
var num = new Number('123sd');
num.toString(); // 'NaN'

var str = new String('12df');
str.toString(); // '12df'

var bool = new Boolean('fd');
bool.toString(); // 'true'

var arr = new Array(1,2);
arr.toString(); // '1,2'

var d = new Date();
d.toString(); // "Wed Oct 11 2017 08:00:00 GMT+0800 (中国标准时间)"

var func = function () {}
func.toString(); // "function () {}"

var obj = new Object({});
obj.toString(); // "[object Object]"
Math.toString(); // "[object Math]"
```

什么时候用 valueOf，什么时候用 toString
- `+` 操作符，分两种情况：+ 两边有一个 string，则使用 toString()，否则使用 valueOf()

## 案例
```js
({} + {}) = ?
// 两个对象的值进行+运算符，肯定要先进行隐式转换为原始类型才能进行计算。
// 1、进行ToPrimitive转换，由于没有指定PreferredType类型，{}会使默认值为Number，进行ToPrimitive(input, Number)运算。
// 2、所以会执行valueOf方法，({}).valueOf(),返回的还是{}对象，不是原始值。
// 3、继续执行toString方法，({}).toString(),返回"[object Object]"，是原始值。
// 故得到最终的结果，"[object Object]" + "[object Object]" = "[object Object][object Object]"


2 * {} = ?
// 1、首先*运算符只能对number类型进行运算，故第一步就是对{}进行ToNumber类型转换。
// 2、由于{}是对象类型，故先进行原始类型转换，ToPrimitive(input, Number)运算。
// 3、所以会执行valueOf方法，({}).valueOf(),返回的还是{}对象，不是原始值。
// 4、继续执行toString方法，({}).toString(),返回"[object Object]"，是原始值。
// 5、转换为原始值后再进行ToNumber运算，"[object Object]"就转换为NaN。
// 故最终的结果为 2 * NaN = NaN
```

# 参考
[你所忽略的js隐式转换](https://juejin.im/post/5a7172d9f265da3e3245cbca)