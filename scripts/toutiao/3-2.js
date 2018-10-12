// 矩阵中岛的个数
var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
var matrix = [],
    m,
    lineNum = 0
rl.on('line', function(token) {
    if(lineNum === 0) {
        m = parseInt(token)
        if(m === 0) {
            console.log(0)
            return;
        }
    }
    else if(lineNum<=m){
        matrix.push(token.split(' ').map(v => parseInt(v)))
        if(lineNum === m) {
            getRst();
            matrix = [],
            m = null,
            lineNum = -1;
        }
    }
    lineNum++;
});

var getRst = () => {
    // dfs + 回溯
    var stack = [],
        rst= 0;

    function visit(x, y) {
        matrix[x][y] = 2;
        stack.push([x, y]);
    }
    function dfs() {
        while(stack.length) {
            var node = stack.pop()
            let x = node[0],
                y = node[1]
            if(x< m-1 && matrix[x+1][y] === 1) {
                visit(x+1, y)
            }
            if(y< m-1 && matrix[x][y+1] === 1) {
                visit(x, y+1)
            }
            if(x>0 && matrix[x-1][y] === 1) {
                visit(x-1, y)
            }
            if(y>0 && matrix[x][y-1] === 1) {
                visit(x, y-1)
            }
        }
    }
    for(let i=0; i< m; i++) {
        for(let j=0; j<m;j++) {
            if(matrix[i][j] === 1) {
                matrix[i][j] = 2;
                stack.push([i, j]);
                dfs()
                rst++;
            }
        }
    }

    console.log(rst);
}