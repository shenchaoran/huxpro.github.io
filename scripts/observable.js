class Observable {
    constructor(dataSource) {
        this.interval
        this.dataSource = dataSource
    }

    subscribe(observer) {
        this.interval = setInterval(() => {
            if(this.dataSource.length) {
                observer.next(this.dataSource.shift())
            }
            else {
                observer.complete('stream end')
                clearInterval(this.interval)
            }
        }, 1000)

        return {
            unsubscribe: () => {
                clearInterval(this.interval)
            }
        }
    }

    from() {

    }
}

// 数据生产
let $test = new Observable([1,2,3,4])

// 数据消费
let subscription = $test.subscribe({
    next: console.log,
    complete: console.info,
    error: console.error
})

// setTimeout(() => {
//     subscription.unsubscribe()
// }, 2000);