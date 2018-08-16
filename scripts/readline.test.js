var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt:''});
rl.prompt();
rl.on('line', function (token) {
    let list = []
    let sum = 0
    let arr = token.split(' ')
    arr.forEach((v, i) => {
        arr[i] = parseInt(v)
    })
    list.push(arr[0])
    sum+=arr[0]
    while(list.length<arr[1]) {
        let v = Math.sqrt(list[list.length-1])
        sum+=v
        list.push(v)
    }
    process.stdout.write(sum.toFixed(2))
});
