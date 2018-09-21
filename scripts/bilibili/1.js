var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
rl.on('line', function (data) {
    console.log(getRst(parseInt(data)));
});

var rst = [];
function getRst(sum) {
    while(sum>0) {
        if(sum%2 === 0) {
            rst.push(3);
            sum = (sum-2)/2;
        }
        else {
            rst.push(2);
            sum = (sum-1)/2;
        }
    }
    return rst.reverse().join('');
}