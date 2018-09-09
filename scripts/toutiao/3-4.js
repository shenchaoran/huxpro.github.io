var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
var lineNum = 0,
    m,
    arr;
rl.on('line', function(token) {
    if(lineNum === 0) {
        m = parseInt(token)
    }
    else if(lineNum === 1) {
        arr = token.split(' ').map(v => binarylize(v))
        getRst()
        lineNum = -1;
        m = null;
    }
    lineNum++;
});

var getRst = () => {
    let str = arr.join(' ')
    let reg = /^[11110\d{3}\s10\d{6}\s10\d{6}\s10\d{6}|1110\d{4}\s10\d{6}\s10\d{6}|110\d{5}\s10\d{6}|0\d{7}]+$/;
    let reg1 = /11110\d{3}\s10\d{6}\s10\d{6}\s10\d{6}/g;
    let reg2 = /1110\d{4}\s10\d{6}\s10\d{6}/g
    let reg3 = /110\d{5}\s10\d{6}/g
    let reg4 = /0\d{7}/g
    str.replace(reg1, '')
    str.replace(reg2, '')
    str.replace(reg3, '')
    str.replace(reg4, '')
    
    console.log(str === ''? 1: 0)
}
function binarylize(v) {
    let tmp =  parseInt(v).toString(2).padStart(8,'0')
    return tmp.substr(-8, 8)
}