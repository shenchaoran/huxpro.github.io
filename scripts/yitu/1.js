var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
let matrix = []
rl.on('line', function (token) {
    matrix = JSON.parse(token);
    var max = 0;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 1) {
                max = Math.max(getRst(i, j), max);
            }
        }
    }
    console.log(max);
});

var getRst = (row, col) => {
    let stack = []
    var m = matrix.length;
    var n = matrix[0].length;
    stack.push([row, col]);
    var area = 0;
    while (stack.length) {
        let curr = stack.pop();
        let x = curr[0]
        let y = curr[1]
        matrix[x][y] = 2;
        area++;
        if (x < m - 1 && matrix[x + 1][y] === 1) {
            stack.push([x + 1, y])
        }
        if (y < n - 1 && matrix[x][y + 1] === 1) {
            stack.push([x, y + 1])
        }
        if (x > 0 && matrix[x - 1][y] === 1) {
            stack.push([x - 1, y])
        }
        if (y > 0 && matrix[x][y - 1] === 1) {
            stack.push([x, y - 1])
        }
    }
    return area;
}
