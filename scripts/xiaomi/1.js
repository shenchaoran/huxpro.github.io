var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

rl.on('line', token => {
    console.log(getRst(parseInt(token)));
});

function getRst(v) {
    var fib = [1,1];
    if(v === 1)
        return 0;
    if(v === 2) 
        return 1;
    var sum = 2;
    while(sum < v) {
        var tmp = fib[fib.length-1] + fib[fib.length-2];
        fib.push(tmp);
        sum += tmp;
    }
    return sum - fib[fib.length-1];
}