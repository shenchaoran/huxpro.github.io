var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
var N, M
rl.on('line', function(token) {
    let tmp = token.split(' ')
    N = parseInt(tmp[0])
    M = parseInt(tmp[1])
    console.log(getMaxRst())
});

function getMaxRst() {
    let dp = new Array(M+1).fill(0).map(v => new Array(N+1).fill(0))
    for(let i=0;i<M+1;i++) {
        for(let j=0;j<N+1;j++) {
            if(i === 0 || j === 0 || i+j < 3) {
                dp[i][j] = 0;
            }
            else if(i === 1 || j === 1) {
                dp[i][j] = 1;
            }
            else {
                dp[i][j] = Math.max(dp[i-2][j-1], dp[i-1][j-2]) + 1;
            }
        }
    }
    return dp[M][N];
}

// 暴力解法
// let getSubBestRst = (N, M) => {
//     if (N < 1 || M < 1) {
//         return 0
//     }
//     if (N + M < 3) {
//         return 0
//     }
//     if (N === 1 || M === 1) {
//         return 1;
//     } else {
//         return Math.max(getSubBestRst(N - 1, M - 2), getSubBestRst(N - 2, M - 1)) + 1
//     }
// }
// return getSubBestRst(N, M)