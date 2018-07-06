首先需要声明的是，JavaScript 并不能简单地成为解释型语言，应该是半编译型半解释型的语言？
JavaScript 引擎会在正式执行前进行一次预编译，在这个过程中，会将变量声明和函数声明提升到当前作用域的顶端，然后在执行后面的代码。

# 变量提升
变量的声明只有一种方式，那就是用 `var` 关键字声明，用 `let` 不会出现变量提升。
**直接赋值不是一种声明方式**，这仅仅是在全局对象上创建了新的属性（而不是变量），不会提前声明。而且直接赋值实在执行阶段创建的。
```JavaScript
var foo = 3;

function hoistVariable() {

    var foo = foo || 5;

    console.log(foo); // 5
}

hoistVariable();
```
被转换为：
```JavaScript
var foo = 3;

//预编译之后
function hoistVariable() {
    var foo;

    foo = foo || 5;

    console.log(foo); // 5
}

hoistVariable();
```

# 函数提升
函数声明有几张方式：
- 匿名函数：`function a(){}`，这种方式会有提前声明，而且提前声明的优先级最高，也就是说如果有变量和他同名时，a 表示的是函数而不是变量值。
- 通过 Function 构造：`var a = new Function('a', 'b', 'return a+b;')`。这种方式和变量提升相同。
- 具名函数：`var a = function (){}`。这种方式和变量提升相同。

变量和函数同时提升时，会先提升变量，再提升函数，所以有同名变量和函数时，函数会覆盖同名变量的值。
js中创建函数有两种方式：函数声明式和函数字面量式。只有函数声明才存在函数提升！
```JavaScript
console.log(f1); // function f1() {}   
console.log(f2); // undefined  
function f1() {}
var f2 = function() {}
```
```JavaScript
function hoistFunction() {
    foo(); // output: I am hoisted

    function foo() {
        console.log('I am hoisted');
    }
}

hoistFunction();
```
被转换为
```JavaScript
//预编译之后
function hoistFunction() {
    function foo() {
        console.log('I am hoisted');
    }

    foo(); // output: I am hoisted
}

hoistFunction();
```
```JavaScript
//当函数声明遇到函数表达式时
function hoistFunction() {
    foo(); // 2
    var foo = function() {
        console.log(1);
    };
    foo(); // 1
    function foo() {
        console.log(2);
    }
    foo(); // 1
}

hoistFunction();
```
被转换为
```JavaScript
//预编译之后
function hoistFunction() {
    var foo;
    foo = function foo() {
        console.log(2);
    }
    foo(); // 2
    foo = function() {
        console.log(1);
    };
    foo(); // 1
    foo(); // 1
}

hoistFunction();
```