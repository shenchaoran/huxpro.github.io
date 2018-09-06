var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt:''});
rl.prompt();
var N,M
rl.on('line', function (token) {
    let tmp = token.split(' ')
    N = parseInt(tmp[0])
    M = parseInt(tmp[1])
    console.log(getMaxRst())
});

function getMaxRst() {
    let getSubBestRst = (n, m, ...rsts) => {
        if(n<1 || m<1){
            return 0
        }
        if(n+m<3){
            return 0
        }
        if(n === 1 || m === 1){
            return 1;
        }
        else {
            return Math.max(getSubBestRst(n-1, m-2), getSubBestRst(n-2, m-1)) + 1
        }
    }
    return getSubBestRst(N, M)
}
