/*请完成下面这个函数，实现题目要求的功能

******************************开始写代码******************************/
function EventEmitter() {
    this.events = {};
    this.onceEvents = {};
}

EventEmitter.prototype.on = function (name, fn) {
    if (this.events[name] == undefined) {
        this.events[name] = [];
    }
    this.events[name].push(fn);
}

EventEmitter.prototype.once = function (name, fn) {
    if (this.onceEvents[name] === undefined) {
        this.onceEvents[name] = [];
    }
    this.onceEvents[name].push(fn);
}

EventEmitter.prototype.emit = function (name) {
    var argv = [].splice.apply(arguments, [1])
    var argv1 = Array.from(argv);
    var argv2 = Array.from(argv);

    var events = this.events[name];
    var onceEvents = this.onceEvents[name];
    if (events) {
        for (var i = 0; i < events.length; i++) {
            events[i].apply(this, argv1)
        }
    }

    if (onceEvents) {
        for (var i = 0; i < onceEvents.length; i++) {
            onceEvents[i].apply(this, argv2)
        }
    }
}

EventEmitter.prototype.remove = function (name, fn) {
    var events = this.events[name];
    var onceEvents = this.onceEvents[name];
    if (events) {
        this.events[name] = null;
    }
    if (onceEvents) {
        this.onceEvents[name] = null;
    }
}

/******************************结束写代码******************************/

// 新建一个emitter对象

var emitter = new EventEmitter()


var log = console.log

// 注册事件

emitter.on('someTask', log)

// 触发事件

emitter.emit('someTask', 1, 2) // 1 2

// 注册once事件

emitter.once('onceTask', log)

// 触发事件

emitter.emit('onceTask', 1) // 1

// 触发事件

emitter.emit('onceTask', 1) // 不输出

// 移除监听函数

emitter.remove('someTask', log)

// 触发事件

emitter.emit('someTask', 1) // 不输出