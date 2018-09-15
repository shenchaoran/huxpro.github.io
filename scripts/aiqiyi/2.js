var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
var N, M, P,
    arr = [],
    lineNum = 0;
rl.on('line', function(token) {
    if(lineNum === 0 ) {
        [N, M, P] = token.split(' ').map(v => parseInt(v));
    }
    else if(lineNum === 1) {
        arr = token.split(' ').map(v => parseInt(v));
    }
    else{
        var [ac, i] = token.split(' ');
        i = parseInt(i)-1;
        if(ac == 'A') {
            arr[i]++;
        }
        else if(ac == 'B') {
            arr[i]--;
        }

        if(lineNum == M+1) {
            var tmp = arr.map((v, i) => [v, i+1]);
            tmp.sort((v1, v2) => v2[0]-v1[0]);
            var rst = tmp.findIndex(v => v[1] === P);
            var val = tmp[rst][0];
            var bb = tmp.findIndex(v => v[0] === val);
            // while(rst>0 && tmp[rst][0] === tmp[rst-1][0]){
            //     rst--
            // }
            // if(rst == -1) {
            //     console.log.bind(0);
            // }
            // else {
            //     console.log(rst+1);
            // }
            console.log(bb+1)
            

            lineNum = -1;
            arr = [];
            N = M = P = null;
        }
    }
    lineNum++;
});

