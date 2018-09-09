var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
var str
rl.on('line', function(token) {
    str = token
    getRst()
});

var getRst = () => {
    if(str === ''){
        console.log(0)
        return;
    }
        
    var dp = Array(str.length).fill(0);
    var prevS, prevE;
    dp[0] = 1;
    prevS = 0,
    prevE = 0
    for(let i=1; i< str.length; i++) {
        let tmp = str.substring(prevS, prevE + 1).indexOf(str[i]) !== -1
        if(tmp) {
            dp[i] = 1;
            prevS = i;
            prevE = i;
        }
        else {
            dp[i] = dp[i-1] + 1;
            prevE = i
        }
    } 
    console.log(Math.max(...dp))
}