# DOM
- Node 和 Element 的区别：node 是一个接口/基类，Element 继承了Node，Node 类型包括有 element, attribute, text, comment, document, document fragment, notation等。

# 原生 DOM 操作
```js
element.getElementById('id')
element.getElementsByName('name')
element.getElementsByClass('className')
element.getElementsByTagName('li')
// 这个特殊字符要转义
element.querySelector('li.menu a')
element.querySelectorAll('li.menu a')

document.createElement()
document.createTextNode()
document.createDocumentFragment()
document.createComment()
document.createElementNS()

node.childNodes()
node.firstChild()
node.lastChild()
node.nextSibling()
node.previousSibling()
node.parentNode()
node.textContent()
node.parentElement()
node.appendChild()
node.removeChild()
node.innerHTML()
node.outerHTML()
node.innerText()    // 块级标签会加换行符
node.textContent()  // 只把标签去掉，其他格式与原本 html 内容完全相同

// 删除自身
node.remove()
node.replaceChild()
node.cloneNode()
document.importNode(oldNode, isDeep)

element.getAttribute()
element.setAttribute()
element.style[styleName] = ''
```
- [attribute 和 property的区别](./2018-08-06-Angular之模版语法.md)

# jQuery DOM 操作
```js
// insert
append()
appendTo()
prepend()
prependTo()
before()
after()
insertAfter()
insertBefore()
clone()
remove()
detach()
empty()

hasClass()
addClass()
removeClass()

attr()
prop()
css()

// innerHtml
html()
text()
// form control value
val()

height()
innerHeight()
innerWidth()
outerHeight()
outerWidth()
```