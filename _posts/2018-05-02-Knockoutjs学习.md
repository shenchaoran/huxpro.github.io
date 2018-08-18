---
layout: post
tags: 
    - Knockout
    - MVVM
catalog: true
---


# MVVM

## `Model`

- 通常是数据库中保存的数据，和 UI 是独立的，通常使用ajax 动态读写服务端的数据。

## `View Model`

- 代表UI 上的数据和操作。例如，实现list editor时，代表VM的对象包括 a list of items, and exposing methods to add and remove items。
- Model 的数据模型，和我们的业务需求或者说业务实体（Entity）是一一映射关系。而 ViewModel 顾名思义，就是一个 Model of View，它是一个 View 信息的存储结构，ViewModel 和 View 上的信息是一一映射关系。

## `View`

- 一个可视的、交互的UI，可以表示 VM 的状态。他显示VM中的信息，发送事件给 VM，并在VM状态改变时更新。
- 在有点框架中是指，界面的描述语言，并不是真正的view，要通过渲染引擎去把这种 View 的描述语言渲染成一个真正的 View

# Observables

- KO进行数据绑定依靠的就是 Observable

## 读写

- 读：myVM.observableProp()
- 写：myVM.observableProp('new value')
- 可以链式调用：myVM.observableProp1('new value').observableProp2('new value')

## 订阅

```
let subscription = myVM.observableProp1.subscribe(newValue => {

})

<!-- 终止订阅： -->
subscription.dispose();
```

# 值类型

- 普通类型
- ko.computed(() => {})
- ko.pureComputed(() => {})
- ko.observable
- ko.observableArray

# data-bind type

## 控制 text，apperance

- `text`
- `visible`
- `html`
- `css`
- `style`
- `attr`

## 控制 flow（流程）

- `value`:用在input标签里
- `foreach`
- `if`, `ifnot`
- `with`: 指定上下文
- `component`

## 控制 from fields

- event
- submit
- enable
- disable
- textInput
- hasFocus

## 控制 event（事件）

- `click`:button的click事件，绑定的是方法
- `checked`


- [官网](http://knockoutjs.com/)
- [官方中文教程](http://www.aizhengli.com/knockoutjs/knockoutjs.html?page=1) <br>