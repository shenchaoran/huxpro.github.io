var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
var n,
    lineNum = 0,
    arr = [],
    rst;
rl.on('line', function(token) {
    let tmp = token.split(',')
    if(lineNum === 0){
        n = parseInt(token)
    }
    else if(lineNum === 1) {
        arr = token.split(' ').map(v => parseInt(v))
        getRst();
        lineNum = -1;
        arr = [];
        rst = null;
        n = null;
    }
    lineNum++;
});

var getRst = () => {
    if(n === 0) {
        console.log(0)
        return;
    }
    arr.sort((v1, v2) => v1-v2)
    let isEven = arr.length%2 === 0
    let mid
    if(isEven) {
        mid = (arr[arr.length/2] + arr[arr.length/2-1])/2
    }
    else {
        mid = arr[(arr.length-1)/2]
    }

    console.log(mid)
    return;
}