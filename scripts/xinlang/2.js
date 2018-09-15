// 本题为考试多行输入输出规范示例，无需提交，不计分。
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (line) {
    line = line.replace('undefined', '"____"')
    var arr = JSON.parse(line);
    var rst = {
        isEmpty: [],
        likeNumber: []
    };
    arr.map(v => {
        if(
            v === null ||
            v === '____' ||
            v === '' ||
            (Array.isArray(v) && v.length === 0) ||
            (typeof v === 'object' && JSON.stringify(v) === '{}')
        ) {
            rst.isEmpty.push(v);
        }
        else if(
            typeof v === 'number' ||
            (typeof v === 'string' && !Number.isNaN(Number(v)))
        ) {
            rst.likeNumber.push(v);
        }
    });
    var emptyStr = '[';
    rst.isEmpty.reduce((str, item) => {
        if(item === '') {
            emptyStr += '"",';
        }
        else if(item === null) {
            emptyStr += 'null,';
        }
        else if(item === '____') {
            emptyStr += 'undefined,';
        }
        else if(typeof item === 'object') {
            emptyStr += JSON.stringify(item) + ',';
        }
    }, emptyStr);
    emptyStr = emptyStr.slice(0, -1);
    emptyStr += ']';
    var str = `{"isEmpty":${emptyStr},"likeNumber":${JSON.stringify(rst.likeNumber)}}`;

    console.log(str);
});
