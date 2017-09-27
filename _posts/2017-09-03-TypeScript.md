---
layout: post
title: TypeScript
subtitle: ""
tags: TypeScript
notebook: 城方实习
catalog: true
---

[TOC]

### 数据类型
- boolean
- number， 
- **string**：可以在string中应用模板，比如：
``` typescript
'use a template to show <span>${expression}</span>'
```
- **number[]**
- **Array&lt;number&gt;**
-  **[string, number]  （元组）**
-   **enum**
-   **any**
-   **Object**
-   **void**
-   **undefined**
-   **null**
-   **never**
### 交叉类型
交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如， Person & Serializable & Loggable同时是Person和Serializable和Loggable。 就是说这个类型的对象同时拥有了这三种类型的成员。
```typescript
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```
### 联合类型
联合类型表示一个值可以是几种类型之一。 我们用竖线（ |）分隔每个类型，所以number | string | boolean表示一个值可以是number，string，或boolean。
**如果一个值是联合类型，我们只能访问此联合类型的`所有类型里共有的成员`。**
```typescript
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors
```
这里的联合类型可能有点复杂，但是你很容易就习惯了。 如果一个值的类型是 `A | B`，我们能够确定的是它包含了A和B中共有的成员。 这个例子里， Bird具有一个fly成员。 我们不能确定一个 Bird | Fish类型的变量是否有fly方法。 如果变量在运行时是 Fish类型，那么调用pet.fly()就出错了。
### 类型断言：
类似于数据类型转换
- as
- &lt;ClassName&gt; ObjectName

### 变量声明
#### let
与var相比，解决的问题：
- 块级作用域
- for循环中异步函数调用时只能掉到最后一个
#### const
只读
#### 解构
#### 展开

### 语法特性
#### 类型注解
类型批注有：
对于基本类型的批注是number, bool和string。而弱或动态类型的结构则是any类型。
```typescript
function Add(left: number, right: number): number {
	return left + right;
}
```
#### 编译时类型检查
#### 箭头函数(lambda表达式)
lambda表达式 ()=>{something}或()=>something 相当于js中的函数,它的好处是可以***自动将函数中的this附加到上下文中***。
```typescript
var shape = {
    name: "rectangle",
    popup: function() {
 
        console.log('This inside popup(): ' + this.name);
 
        setTimeout( () => {
            console.log('This inside setTimeout(): ' + this.name); //此处的this是上下文中的this
            console.log("I'm a " + this.name + "!");
        }, 3000);
 
    }
};
 
shape.popup();
```
#### 类
##### 访问限制符
- 默认为`public`
- `private`，类内成员可以访问
- `protected`，类内和子类成员可以访问
##### 参数属性
通过在构造函数中添加访问限制符直接对类添加属性。
```typescript
class Animal {
    constructor(private name: string) { }
    move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```
##### 存取器
TypeScript支持通过getters/setters来截取对对象成员的访问。
```typescript
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```
##### 静态属性
```typescript
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```
##### 抽象类
抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
```typescript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```
抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
```typescript
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // constructors in derived classes must call super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // ok to create a reference to an abstract type
department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReports(); // error: method doesn't exist on declared abstract type
```
#### 继承
```typescript
class Shape3D extends Shape {
 
    volume: number;
 
    constructor ( public name: string, width: number, height: number, length: number ) {
        super( name, width, height );
        this.volume = length * this.area;
    };
 
    shoutout() {
        return "I'm " + this.name +  " with a volume of " + this.volume + " cm cube.";
    }
 
    superShout() {
        return super.shoutout();
    }
}
 
var cube = new Shape3D("cube", 30, 30, 30);
console.log( cube.shoutout() );
console.log( cube.superShout() );
```
#### 接口
```typescript
interface Shape {
    readonly name: string; //只读属性
    width: number;
    height: number;
    color?: string; // 可选属性
}
 
function area(shape : Shape) {
    var area = shape.width * shape.height;
    return "I'm " + shape.name + " with area " + area + " cm squared";
}
 
console.log( area( {name: "rectangle", width: 30, height: 15} ) );
console.log( area( {name: "square", width: 30, height: 30, color: "blue"} ) );
```
- **可选属性**
- **只读属性**
- **索引签名**：接口可包含一个可索引的属性，这个属性包含两部分，第一部分时索引签名的类型，第二部分时索引返回值的类型。索引签名支持两种：字符串和数字
#### 泛型
```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");
let output2 = identity("myString"); //类型推断
```
**约束条件：**
```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```
#### 函数
**完整的函数类型：**
以`=`为分割符，`:`和`=`之间的为函数类型`=>`前后分别是参数类型和返回值类型
```typescript
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
```
**简写形式：**
```typescript
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
```
#### 模块
#### 声明语句
在js中，假如我们想使用jQuery，会直接用`$('#id')`，但是在ts中，编译器并不知道`$`是什么意思，所以要提前声明。
```typescript
declare var jQuery: (string) => any;
jQuery('#foo');
```
声明只是编译时用来类型检查的，在编译结果中会被删除。
#### 声明文件
通常我们将类型声明放到一个单独的文件中，以`.d.ts`后缀名。