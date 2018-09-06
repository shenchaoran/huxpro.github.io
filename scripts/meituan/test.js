var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt:''});
rl.prompt();
var lineNum = 0,
    n,
    pi = [],
    ai = [],
    qi = [],
    bi = []
rl.on('line', function (token) {
    let tmp = token.split(' ').map(v => parseInt(v))
    if(lineNum === 0) {
        n = tmp[0]
    }
    else {
        pi.push(tmp[0])
        ai.push(tmp[1])
        qi.push(tmp[2])
        bi.push(tmp[3])
    }
    if(lineNum === n) {
        lineNum = -1
        console.log(getMaxScore())
    }
    lineNum++;
});

function getMaxScore() {
    let getSubScore = (t, i) => {
        if(i === n) {
            return 0
        }
        if(t<= 0) {
            return 0;
        }
        else if(t< pi[i]) {
            return getMaxScore(t, i+1);
        }
        else if(t< qi[i]) {
            return Math.max(ai[i] + getMaxScore(t-pi[i], i+1), getMaxScore(t, i+1))
        }
        else{
            return Math.max(bi[i] + getMaxScore(t-qi[i], i+1), ai[i] + getMaxScore(t-pi[i], i+1), getMaxScore(t, i+1))
        }
    }
    return getSubScore(120, 0)
}

// 4
// 20 20 100 60
// 50 30 80 55
// 100 60 110 88
// 5 3 10 6



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
    let getSubBestRst = (n, m) => {
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