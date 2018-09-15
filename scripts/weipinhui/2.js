var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

var a, b, c;
rl.on('line', token => {
    [a, b] = token.split(' ').map(v => parseInt(v, 2))
    c = a + b;
    console.log(Number(c).toString(2))
});