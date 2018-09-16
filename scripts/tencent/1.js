var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});
var n, arr = [], lineNum = 0, rst = [];
rl.on('line', function(line){ 
    if(lineNum === 0) {
        n = parseInt(line)
    }
    else if(lineNum <= n) {
        // arr.push(parseInt(line))
        isValid(parseInt(line))
        // if(lineNum === n) {
        //     arr.map(isValid);
        // }
    }
    lineNum++;
});

function isValid(v) {
    var sum = 0;
    ('' + v).split('').map(v => {
        sum+=parseInt(v);
        return v;
    });
    console.log(v%sum === 0? 'Yes': 'No');
}