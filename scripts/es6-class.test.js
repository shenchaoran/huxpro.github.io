class Base {
	constructor() {
		console.log(this.a)
	}

	test() {
		console.log('0')
    }

    privateFn() {
        console.log('in Base')
    }
    
    invoke() {
        this.privateFn()
    }
}

class A extends Base {
	constructor() {
		super()
		this.a = 1
    }
    
    privateFn() {
        console.log('in A')
    }
	
	test() {
		console.log('1')
	}
}

let a = new A()
a.invoke()