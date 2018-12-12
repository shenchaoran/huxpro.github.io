1. HostListener
2. <ng-content></ng-content> selector
3. bind click event on <ng-content></ng-content>
4. style on <custom-component-label></custom-component-label> doesn't work
5. create grid layout by flex
6. angular 内置的 XSS 防御
7. 执行顺序
   1. @Input() set value() {}   
   2. ngOnChange
   3. ngOnInit() {}               // 在首次 ngOnChnage 后执行，而 @Input() 会导致 ngOnChange 的执行
   4. writeValue() {}             // **事实上，writeValue 在几乎所有的生命周期函数之后执行**
8. dump component and smart component