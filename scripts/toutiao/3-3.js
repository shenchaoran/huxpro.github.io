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
    if(str.length < 4){
        console.log(0)
        return;
    }
    
}