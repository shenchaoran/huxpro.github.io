// 本题为考试多行输入输出规范示例，无需提交，不计分。
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var arr;
rl.on('line', function (line) {
    arr = line.split(',').map(v => parseInt(v));
    //getRst1();
    getRst2();
});

function getRst1() {
    console.log(Array.from(new Set(arr)).sort((v1, v2) => v1-v2).join(','));
}

function getRst2() {
    var set = [];
    arr.map(v => {
        if(set.indexOf(v) === -1) {
            set.push(v)
        }
    });
    set.sort((v1, v2) => v1-v2);
    console.log(set.join(','));
}
