var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});
var n, arr = [], lineNum = 0;
rl.on('line', function(line){ 
    if(lineNum === 0) {
        n = parseInt(line)
    }
    else if(lineNum === 1) {
        line = line.replace(/\s/g, '');
        line = line.replace(/0/g, ' ');
        line = line.trim();
        var groups = line.split(/1+/);
        console.log(groups.reduce((acc, str) => {
            return str === ''? acc: acc*(str.length+1);
        }, 1))

        lineNum = -1;
    }
    lineNum++;
});