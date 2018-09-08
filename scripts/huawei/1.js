var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
let times = []
let rst = []
rl.on('line', function(token) {
    let tmp = token.split(',')
    if(token === '0,0'){
        getRst();
        times = [];
        rst = [];
    }
    else if(token === '0') {
        process.exit(0)
    }
    else {
        times.push(tmp.map(v=> parseInt(v)))
    }
});

var getRst = () => {
    if(times.length === 0) {
        return;
    }

    times.sort((v1,v2) => {
        let a = (v1[1] - v1[0]) - (v2[1] - v2[0])
        return a === 0? v2[0] - v1[0] : -a
    })
    let t = 0;
    for(let i=0; i<times.length; i++) {
        if(t <= times[i][0]) {
            t = times[i][1]
            rst.push(times[i])
        }
    }
    for(let v of rst) {
        console.log(v.join(','))
    }
    return;
}