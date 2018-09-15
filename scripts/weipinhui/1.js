var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

var lineNum = 0,
    k,
    n,
    matrix = [];
    arr = [];
rl.on('line', token => {
    var tmp = token.split(' ').map(v => parseInt(v));
    if(lineNum === 0) {
        [k, n] = tmp;
    }
    else if(lineNum <= n) {
        matrix.push(tmp);
        arr = arr.concat(tmp);
        if(lineNum === n) {
            console.log(getRst());

            lineNum = -1;
            matrix = [];
            k = n = null;
        }
    }
    lineNum++;
});

function getRst() {
    arr.sort((v1, v2) => v1 - v2);
    return arr[k-1];
}