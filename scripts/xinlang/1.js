// 本题为考试多行输入输出规范示例，无需提交，不计分。
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var arr = [],
    n;
rl.on('line', function (line) {
    var tmp = line.split('|');
    n = parseInt(tmp[1]);
    arr = tmp[0].split(',').map(v => parseInt(v))
    getRst();
});

function getRst() {
    let rst = 0;
    arr.sort((v1,v2) => v1-v2);
    for(let i=0;i <arr.length; i++) {
        for(let j= i; j< arr.length; j++) {
            if(arr[i] + arr[j] === n)
                rst++;
        }
    }

    console.log(rst);
}