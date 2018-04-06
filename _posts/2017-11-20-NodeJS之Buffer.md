---
layout: post
tags: 
    - NodeJS
    - Buffer
catalog: true
---

[TOC]

---

- 下载文件时返回的是Buffer
    fs.readFile默认的options中的encoding是**null**，不是utf8！返回的data可能是string和Buffer，未指定编码时返回Buffer。
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
    解决方案：在读文件时指定encoding为`utf8`，但是浏览器端访问的路由和后台访问的路由就不能一样了，重用性不太好。