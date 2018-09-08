var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
var lineNum = 0,
    n,
    p = [],
    a = [],
    q = [],
    b = []
rl.on('line', function(token) {
    let tmp = token.split(' ').map(v => parseInt(v))
    if (lineNum === 0) {
        n = tmp[0]
    } else {
        p.push(tmp[0])
        a.push(tmp[1])
        q.push(tmp[2])
        b.push(tmp[3])
    }
    if (lineNum === n) {
        lineNum = -1
        console.log(getMaxScore())
    }
    lineNum++;
});

function getMaxScore() {
    let T = 120;
    let dp = Array(n+1).fill(0).map(v => Array(T+1).fill(0));
    for(let i = 0;i<n+1;i++) {
        for(let j=0;j<T+1;j++) {
            if(i===0 || j === 0) {
                dp[i][j] = 0;
            }
            else {
                let opt = [];
                opt.push(dp[i-1][j]);
                if(j > q[i])
                    opt.push(dp[i-1][j - q[i]] + b[i])
                else if(j > p[i])
                    opt.push(dp[i-1][j - p[i]] + a[i])
                dp[i][j] = Math.max(...opt);
            }
        }
    }
    return dp[n][T];
}

// 4
// 20 20 100 60
// 50 30 80 55
// 100 60 110 88
// 5 3 10 6

// 暴力解法
// let getSubScore = (t, i) => {
//     if (i === n) {
//         return 0
//     }
//     if (t <= 0) {
//         return 0;
//     } else if (t < pi[i]) {
//         return getMaxScore(t, i + 1);
//     } else if (t < qi[i]) {
//         return Math.max(ai[i] + getMaxScore(t - pi[i], i + 1), getMaxScore(t, i + 1))
//     } else {
//         return Math.max(bi[i] + getMaxScore(t - qi[i], i + 1), ai[i] + getMaxScore(t - pi[i], i + 1), getMaxScore(t, i + 1))
//     }
// }
// return getSubScore(120, 0)