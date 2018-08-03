class Promise {
    constructor(executor) {
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined

        // 解决异步问题，回调延迟执行
        this.resolveCbs = []
        this.rejectCbs = []
        let resolve = v => {
            if(this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = v
                // console.log('onResolve')

                for(let cb of this.resolveCbs) {
                    cb()
                }
            }
        }
        let reject = e => {
            if(this.state === 'pending') {
                this.state = 'rejected'
                this.reason = e
                // console.log('onReject')

                for(let cb of this.rejectCbs) {
                    cb()
                }
            }
        }

        try {
            executor(resolve, reject);
        }
        catch(e) {
            reject(e)
        }
    }

    /**
     * onFulfilled 有两种情况，要分别处理
     *      return v            // 普通值，直接 resolve
     *      return promise      // Promise，递归取得
     * 
     * @param {*} fulfilled 
     * @param {*} rejected 
     */
    then(fulfilled, rejected) {
        fulfilled = typeof fulfilled === 'function'? fulfilled: fulfilled => fulfilled
        rejected = typeof rejected === 'function'? rejected: rejected => { throw rejected }
        
        function resolvePromise(promise2, x, resolve, reject) {
            if(x && x === promise2) {
                return reject(new Error('循环调用，堆栈溢出'))
            }
            let called = false
            if(x && (typeof x === 'object' || typeof x === 'function')) {
                let then = x.then
                try{
                    if(typeof then === 'function') {
                        // x 是 promise
                        then.call(x, fulfilled2 => {
                            if(called) return
                            called = true
                            resolvePromise(promise2, fulfilled2, resolve, reject)
                        }, rejected2 => {
                            if(called) return
                            called = true
                            reject(rejected2)
                        })
                    }
                    else {
                        return resolve(x)
                    }
                }
                catch(e) {
                    return reject(e)
                }
            }
            else {
                // 基本类型，直接 resolve
                return resolve(x)
            }
        }

        var promise2 = new Promise((resolve, reject) => {
            // 同步
            if(this.state === 'fulfilled') {
                try{
                    let x = fulfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                }
                catch(e) {
                    reject(e)
                }
            }
            else if(this.state === 'rejected') {
                try{
                    let x = rejected(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                }
                catch(e) {
                    reject(e)
                }
            }
            // 异步，先把函数保存起来，等 resolve, reject 时再执行
            else if(this.state === 'pending') {
                // console.log('onThen: pending')
                this.resolveCbs.push(() => {
                    try{
                        let x 
                        if(fulfilled)
                            x = fulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    }
                    catch(e) {
                        reject(e)
                    }
                })
                this.rejectCbs.push(() => {
                    try{
                        let x
                        if(rejected)
                            x = rejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    }
                    catch(e) {
                        reject(e)
                    }
                })
            }
        })
        // return prosmise 解决链式调用
        return promise2
    }

    catch(fn) {
        return this.then(null, fn)
    }

    static resolve(v) {
        return new Promise((resolve, reject) => {
            resolve(v)
        })
    }

    static reject(v) {
        return new Promise((resolve, reject) => {
            reject(v)
        })
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            for(let promise of promises) {
                promise
                    .then(resolve, reject)
            }
        });
    }

    static all(promises) {
        return new Promise((resolve, reject) => {
            let rsts = []
            for(let promise of promises) {
                promise
                    .then(v => {
                        rsts.push(v)
                        if(rsts.length === promises.length) {
                            return resolve(rsts)
                        }
                    }, reject)
            }
        });
    }

    static map(arr, fn, options) {
        return new Promise((resolve, reject) => {
            let promises = []
            for(let v of arr) {
                promises.push(fn(v))
            } 
            Promise.all(promises)
                .then(resolve, reject)
        });
    }
}

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 0);
    console.log('async')

    // resolve(1)
})
    .then(v => {
        console.log('onThen 1', v)

        // return 普通值
        // return 2
        return Promise.reject(2)

        // return promise 而且可能是promise嵌套的情况，此时要拿到最内层 promsie resolve 的值
        // return new Promise((resolve, reject) => {
        //     return new Promise((resolve2, reject2) => {
        //         setTimeout(() => {
        //             resolve2(2)
        //         }, 0);
        //     })
        //         .then(v => {
        //             resolve(v)
        //         })
        // })
    })
    .then(v => {
        console.log('onThen 2', v)
    })
    .catch(e => {
        console.log('catch')
    })

// Promise.all([
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(1)
//         }, 1000)
//     }),
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(2)
//         }, 200)
//     })
// ])
//     .then(console.info)
//     .catch(console.error)

// Promise.map([1,2], v => {
//     return Promise.resolve(v)
// })
//     .then(console.info)
//     .catch(console.error)

// test for cancel
