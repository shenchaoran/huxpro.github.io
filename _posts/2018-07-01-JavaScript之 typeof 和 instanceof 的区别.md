
# Use instanceof for custom types:
```js
var ClassFirst = function () {};
var ClassSecond = function () {};
var instance = new ClassFirst();

typeof instance; // object
typeof instance == 'ClassFirst'; // false

instance instanceof Object; // true
instance instanceof ClassFirst; // true
```

# Use typeof for simple built in types:
```js
typeof 'example string' == 'string'; // true
typeof true == 'boolean'; // true
typeof 99.99 == 'number'; // true
typeof function() {} == 'function'; // true

// 通过构造器构造的简单类型不适用
typeof new String('1')          // "object"
typeof new Boolean(true)        // "object"
typeof new Number(1)            // "object"

'example string' instanceof String; // false
'example string' instanceof Object; // false
true instanceof Boolean; // false
99.99 instanceof Number; // false
function() {} instanceof Function; // true
```

# Use instanceof for complex built in types:
```js
typeof /regularexpression/; // object
typeof []; //object
typeof {}; // object

/regularexpression/ instanceof RegExp; // true
[] instanceof Array; // true
{} instanceof Object; // true
// 通过构造器构造的简单类型
new String('1') instanceof String       // true
new Number(1) instanceof Number         // true
new Boolean(true) instanceof Boolean    // true
```

# And the last one is a little bit tricky:
```js
typeof null; // object
```

# 其他
typeof
- 用来检查 **primitive types**
- 用来检查变量是否为 **undefined**

instanceof
- 用来检查对象的类型
- 检查的是 **constructor**，包括原型链上的所有的构造器