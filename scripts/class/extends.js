class Animal {
    log() {
        console.log(this.value);
    }
}

class Cat {
    constructor() {
        super();
        this.value = 1;
    }
}

var animal = new Cat();
animal.log();

// function Base() {}
// Base.prototype.log = () => {console.log(this.value)}

// function Cat(){
//     this.value = 1;
// }

// Cat.prototype = Object.assign(Cat.prototype, new Cat())
// var animal = new Cat();
// animal.log();