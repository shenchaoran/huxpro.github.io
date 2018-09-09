var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
var edges = [],
    matrix = [],
    n,
    m,
    lineNum = 0
rl.on('line', function(token) {
    if(lineNum === 0) {
        n = parseInt(token)
        matrix = Array(n).fill(0).map(v => Array(n).fill(Infinity))
    }
    if(lineNum === 1) {
        m = parseInt(token)
    }
    else if(lineNum === 2){
        let tmp = token.split(' ').map(v => parseInt(v))
        for(let i=0; i< tmp.length-1; i+=2) {
            // edges.push([tmp[i], tmp[i+1]])
            matrix[tmp[i]-1][tmp[i+1]-1] = 1
            // matrix[tmp[i+1]-1][tmp[i]-1] = 1
        }
        for(let i=0; i<n; i++) {
            matrix[i][i] = 0
        }
        getRst();
        
        lineNum = -1;
        edges = [];
        n = m = null;
    }
    lineNum++;
});

var getRst = () => {
    let rst = 0;
    for(let i=0; i<n ;i++) {
        for(let j=0; j<n; j++) {
            for(let k=0; k<n; k++) {
                if(matrix[j][i] + matrix[i][k] < matrix[j][k]) {
                    matrix[j][k] = matrix[j][i] + matrix[i][k];
                }
            }
        }
    }

    for(let i=0; i<n;i++) {
        for(let j=0; j< n;j++) {
            let flag = true;
            if(i === j) {
                continue
            }
            else {
                if(matrix[j][i] === Infinity) {
                    flag = false;
                }
            }
            if(flag)
                rst++;
        }    
    }
    console.log(rst)
}