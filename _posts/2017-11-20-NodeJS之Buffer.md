---
layout: post
tags: 
    - NodeJS
    - Buffer
catalog: true
---


# ArrayBuffer

只有`内存区域`，可以存放数据。但是这些数据有不同的解读方法，叫做`视图`。`ArrayBuffer`有两种视图，一种是`TypedArray`视图，另一种是`DataView`视图，两者的区别主要是字节序，前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。

# TypedArray

- Int8Array
- Uint8Array
- Uint8ClampedArray
- Int16Array
- Uint16Array
- Int32Array
- Uint32Array
- Float32Array
- Float64Array

# Buffer

实现了Uint8Array

# bug

- 下载文件时返回的是Buffer
    **fs.readFile默认的options中的encoding是*null*，不是utf8**！返回的data可能是string和Buffer，**未指定编码时返回Buffer**。
    坑爹的是：fs.writeFile默认的options中的encoding是**utf8**！两者竟然不一致 :(
``` typescript
...
fs.readFile(fpath, (err, buf) => {
    response.set({
        'Content-Type': '',
        'Content-Length': buf.length,
        'Content-Disposition': 'attachment;filename=' + encodeURIComponent(fname)
    });
    response.send(buf);
})
...
```

- 在后台下载文件时，拿到的数据是Buffer.toString()转换而得的string。在写入二进制文件时，如果指定的encode不对，写的文件就不能正确打开。以zip文件为例，zip将解压不了。
    所以在后台拿到文件的string时，写文件时要指定编码方式。由于readFile时encode为null，这样就没办法正确写二进制文件了。
    解决方案：
    - 在读文件时指定encoding为`utf8`，但是浏览器端访问的路由和后台访问的路由就不能一样了，重用性不太好。
    - 使用原生的`http`模块，拿到的数据是buffer，而不是通过强转以后的string
        ```
        res.on('data',chunk => {
            <!-- chunk is a Buffer -->
        })
        ```


[Node.js Buffer与JavaScript TypeArray类型数组的异同](https://itbilu.com/nodejs/core/NyIjmp0wZ.html)<br>
[MDN TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)<br>
[TypedArray介绍](http://www.jb51.net/html5/68844.html)
[使用http模块从后端下载二进制文件](https://blog.csdn.net/davidsu33/article/details/52600906)