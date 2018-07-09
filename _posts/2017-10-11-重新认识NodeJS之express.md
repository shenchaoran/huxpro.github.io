---
layout: post
tags: 
    - NodeJS
    - express
catalog: true
---


### 程序组织结构

#### route listings

#### route map

#### MVC style controllers

### 重新认识中间件
- 中间件类似一个`函数队列`，你把一堆执行不同操作的函数push到一个队列里，在用到是每次pop出来一个执行，直到这个队列为空。
- 和angular中的pipe理解起来也很类似。
- 如果把一个http处理过程比作是污水处理，中间件就是一层层的过滤网。每个中间件在http处理过程中通过改写request或（和）response的数据、状态，实现了特定的功能。
#### next()
##### 分类：应用级和路由级
- 应用级
``` javascript
function next(err) {
    ... //此处源码省略
    // find next matching layer
    var layer;
    var match;
    var route;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer, path);
      route = layer.route;

      if (typeof match !== 'boolean') {
        // hold on to layerError
        layerError = layerError || match;
      }

      if (match !== true) {
        continue;
      }
      ... //此处源码省略
    }
    ... //此处源码省略
    // this should be done for the layer
    if (err) {
        layer.handle_error(err, req, res, next);
    } else {
        layer.handle_request(req, res, next);
    }
  }
```
- 路由级
``` javascript
function next(err) {
    if (err && err === 'route') {
      return done();
    }

    var layer = stack[idx++];
    if (!layer) {
      return done(err);
    }

    if (layer.method && layer.method !== method) {
      return next(err);
    }

    if (err) {
      layer.handle_error(err, req, res, next);
    } else {
      layer.handle_request(req, res, next);
    }
  }
```
其中的错误处理中间件伪码为：
``` javascript
Layer.prototype.handle_error = function handle_error(error, req, res, next) {
  var fn = this.handle;

  if (fn.length !== 4) {
    // not a standard error handler
    return next(error);
  }

  try {
    fn(error, req, res, next);
  } catch (err) {
    next(err);
  }
};
```

##### 用法：
- next(): 跳到下一个中间件
- next('route'): 跳到下个路由器
- next(error: Error): 跳到错误处理中间件