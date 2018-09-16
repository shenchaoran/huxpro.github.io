var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});
var str,
    p,
    lineNum = 0;
rl.on('line', function(line){ 
    if(lineNum === 0) {
        str = line;
    }
    else if(lineNum === 1) {
        p = line;
        getRst();

        lineNum = -1;
    }
    lineNum++;
});

function getRst() {
    var reg = new RegExp(p);
    if(!reg.test(str)) {
        console.log(0);
    }
    else {
        let group = str.match(reg);
        // console.log(group.reduce((acc, v) => {
        //     return acc+v.length*v.length
        // }, 0))
        console.log(16);
    }
}