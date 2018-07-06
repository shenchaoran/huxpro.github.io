---
layout: post
tags: 
    - 面试准备
    - JavaScript
catalog: true
---

[TOC]

---

# 工厂方式
``` javascript
// 所有对象都共享同一个函数，所以函数放在外面定义
function showColor() {
  alert(this.color);
}

function createCar(sColor,iDoors,iMpg) {
  var oTempCar = new Object;
  oTempCar.color = sColor;
  oTempCar.doors = iDoors;
  oTempCar.mpg = iMpg;
  oTempCar.showColor = showColor;
  return oTempCar;
}

var oCar1 = createCar("red",4,23);
var oCar2 = createCar("blue",3,25);

oCar1.showColor();		//输出 "red"
oCar2.showColor();		//输出 "blue"
```

# 构造函数
``` javascript
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.showColor = function() {
    alert(this.color);
  };
}

var oCar1 = new Car("red",4,23);
var oCar2 = new Car("blue",3,25);
```

# 原型链
``` javascript
function Car() {
}

Car.prototype.color = "blue";
Car.prototype.doors = 4;
Car.prototype.mpg = 25;
Car.prototype.showColor = function() {
  alert(this.color);
};

var oCar1 = new Car();
var oCar2 = new Car();

alert(oCar1 instanceof Car);	//输出 "true"
```

# 联合使用构造函数和原型方式
``` javascript
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
}

Car.prototype.showColor = function() {
  alert(this.color);
};

var oCar1 = new Car("red",4,23);
var oCar2 = new Car("blue",3,25);

oCar1.drivers.push("Bill");

alert(oCar1.drivers);	//输出 "Mike,John,Bill"
alert(oCar2.drivers);	//输出 "Mike,John"
```

# 动态原型方法
``` javascript
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
  
  if (typeof Car._initialized == "undefined") {
    Car.prototype.showColor = function() {
      alert(this.color);
    };
	
    Car._initialized = true;
  }
}
```

# 混合工厂方式
``` javascript
function Car() {
  var oTempCar = new Object;
  oTempCar.color = "blue";
  oTempCar.doors = 4;
  oTempCar.mpg = 25;
  oTempCar.showColor = function() {
    alert(this.color);
  };

  return oTempCar;
}

var car = new Car();
```

# 对比
| 名字                       | 优                             | 劣                                                                                                                                                        |
| -------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 工厂方式                   |                                | 1. 看起来不如构造函数new运算符正规；<br>2. 对于类的方法，要将函数的定义放在类的外部才能避免每个对象都重新定义一遍该方法，但是这样会导致它不像是对象的方法 |
| 构造函数                   |                                | 同上述2                                                                                                                                                   |
| 原型链                     | 可以使用instanceof检查对象类型 | 无构造函数，需要在对象创建后才能改变属性值，这种方式在共享方法时没有问题，但在共享属性时会导致多个对象的同一个属性共享内存                                |
| 联合使用构造函数和原型方式 |                                | 优先使用这种方式                                                                                                                                          |