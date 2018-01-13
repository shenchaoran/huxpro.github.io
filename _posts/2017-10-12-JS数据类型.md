---
layout: post
tags: 
    - NodeJS
    - express
catalog: true
---

[TOC]

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
## undefined
派生自null

# 包装类
基本数据类型首字母大写。可以调用基本包装类型具备的方法操作这些数据。

# 数据类型引起的bug

## 引用传递导致的数据值的修改

对于js对象，使用赋值时只是把指针地址复制过去了，所以修改新对象会导致老对象随着改变，应使用cloneDeep。