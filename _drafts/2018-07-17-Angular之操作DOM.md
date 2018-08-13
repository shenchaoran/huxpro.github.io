---
layout: post
tags: 
    - Angular
    - DOM
catalog: true
---

Ng 官方不推荐直接操作DOM

# ViewChild 和 ViewChildren

# ContentChild 和 ContentChildren

## shadow DOM 和 light DOM
这个例子很清楚：从 MyWidget 的视角来看，my-widget 是 viewChild，comp-a 是 contentChild。
```js
@Component({
  template: `
    <my-widget>
      <comp-a/>
    </my-widget>
`
})
class App {}

@Component({
  selector: 'my-widget',
  template: `<comp-b/>`
})
class MyWidget {}
```

在 Angular 中，shadow DOM 指的是组件内部的 DOM，由组件创建者定义，并对组件使用者隐藏，如：
``` js
@Component({
  selector: 'some-component',
  template: `
    <h1>I am Shadow DOM!</h1>
    <h2>Nice to meet you :)</h2>
    <ng-content></ng-content>
  `;
})
class SomeComponent { /* ... */ }
```

而 light DOM 指的是由组件使用者提供，插入到组件创建者预留的 <ng-content> 标签内，如：
``` js
@Component({
  selector: 'another-component',
  directives: [SomeComponent],
  template: `
    <some-component>
      <h1>Hi! I am Light DOM!</h1>
      <h2>So happy to see you!</h2>
    </some-component>
  `
})
class AnotherComponent { /* ... */ }
```

## 两者区别
ViewChildren 操作 shadow DOM，指的是 <template>/<component> 内部的 DOM。
ContentChildren 操作 light DOM，指的是通过内容投影（content projection）插入到 <content>/<ng-content> 之间的 DOM。

# 引用类型
## ElementRef
## TemplateTef
## ViewRef
## ViewContainerRef
## ComponentRef

# 参考
- [ViewChildren and ContentChildren in Angular](https://blog.mgechev.com/2016/01/23/angular2-viewchildren-contentchildren-difference-viewproviders/)
- [上文的中文翻译](https://github.com/kittencup/angular2-ama-cn/issues/66)
- [[译] 探索 Angular 使用 ViewContainerRef 操作 DOM](https://segmentfault.com/a/1190000013860896)