var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
rl.on('line', function (data) {
    console.log(getRst(data.split(' ')));
});

function getRst(arr) {
    var src = arr[0];
    arr = arr.slice(1).map(v => {
        return {
            value: v,
            score: getScore(src, v)
        };
    });
    arr = stableSort(arr, 'score');
    // arr.sort((v1, v2) => v1.score - v2.score);
    if(arr.length >= 3) 
        return arr.slice(0, 3).map(v => v.value).join(' ');
    else 
        return arr.map(v => v.value).join(' ');
}

function getScore(src, dst) {
    if(src.length === 0)
        return dst.length*3;
    if(dst.length === 0)
        return src.length*3;
    var l1 = src.length;
    var l2 = dst.length;
    var dp = Array(l1).fill(0).map(v => Array(l2).fill(0));
    for (var i = 0; i < l1; i++) {
        dp[i][0] = i * 3;
    }
    for (var i = 0; i < l2; i++) {
        dp[0][i] = i * 3;
    }
    for (var i = 1; i < l1; i++) {
        for (var j = 1; j < l2; j++) {
            var editMin;
            if (src[i] === dst[j]) {
                editMin = 0;
            }
            else {
                editMin = getEditScore(src[i], dst[j]);
            }
            dp[i][j] = Math.min(
                dp[i][j - 1] + 3,
                dp[i - 1][j] + 3,
                dp[i - 1][j - 1] + editMin
            );
        }
    }
    return dp[l1 - 1][l2 - 1];
}

function getEditScore(p, q) {
    var arrP = new Set(['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v']),
        arrQ = new Set(['y', 'u', 'i', 'o', 'p', 'h', 'j', 'k', 'l', 'b', 'n', 'm']);
    if (arrP.has(p) && arrQ.has(q) || arrP.has(q) && arrQ.has(p)) {
        return 2;
    }
    else
        return 1;
}

function stableSort(arr, key) {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j][key] > arr[j + 1][key]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}

// 71%