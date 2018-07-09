---
layout: post
tags: 
    - JavaScript
    - 前台存储
catalog: true
---


| name           | max size | time                 | http请求是否会携带 | 浏览器窗口范围          | 是否跨窗口共享值        |
|----------------|----------|----------------------|--------------------|-------------------------|-------------------------|
| cookie         | 4k       | user set expire time | 是                 | 当前域名下的某一路径下  | 可共享，但可能受path限制 |
| localStorage   | 5M       | permanent            | 否                 | 当前域                  | 可共享                  |
| sessionStorage | 5M       | current session      | 否                 | 当前域名下，且是当前窗口 | 不可共享                |