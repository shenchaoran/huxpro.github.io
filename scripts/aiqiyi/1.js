var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
rl.on('line', function(token) {
    let arr = token.split('').map(v => parseInt(v))
    let s1 = arr[0] + arr[1] + arr[2];
    let s2 = arr[3] + arr[4] + arr[5]; 
    if(s1 === s2) {
        console.log(0);
    }
    else if(Math.abs(s1-s2) < 5) {
        console.log(1);
    }
    else {
        console.log(2)
    }
});

