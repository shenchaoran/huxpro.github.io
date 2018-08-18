---
layout: post
tags: 
    - Restful
catalog: true
---


# 复数路由

```
GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1
```

# 单数路由

```
GET    /profile
POST   /profile
PUT    /profile
PATCH  /profile
```

# 分页

- _page：页码
- _limit：每页数量

# 排序

- _sort：排序字段
- _order：排序顺序(asc,desc)

# 过滤
- 用`.`表示对象的属性

# slice
- _start
- _end
- _limit

# 操作符

- _gte
- _lte
- _ne
- _like

# 全文检索

- q

# 关系

- _embed
- _expand

# put和patch的区别

- put：更新整个对象
- patch：更新允许的字段



## 参考文献
- [JSON server readme](https://github.com/typicode/json-server)
- [RESTful 接口设计](https://housanpai.com/articles/3)