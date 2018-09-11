var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
var vs = [],
    lineNum = 0,
    s1,s2, n;
rl.on('line', function(token) {
    if(lineNum === 0) {
        let tmp = token.split(' ').map(v => parseInt(v))
        n = tmp[0]
        s1 = [tmp[1], tmp[2]]
        s2 = [tmp[3], tmp[4]]
    }
    if(lineNum <= n) {
        vs.push(token.split(' ').map(v => parseInt(v)))
        if(lineNum === n) {
            getRst()
        }
    }
    lineNum++;
});

var getRst = () => {
    for(let i=0; i<vs.length; i++) {
        vs[i].push(
            dist(vs[i], s1),
            dist(vs[i], s2)
        )
    }
    let sort1 = [...vs]
    let sort2 = [...vs]
    sort1.sort((v1, v2) => {
        return v1[2] - v2[2]
    })
    sort2.sort((v1, v2) => {
        return v1[3] - v2[3]
    })
    
}

function dist(v1, v2) {
    return (v1[0]  - v2[0] ) * (v1[0]  - v2[0] ) +  (v1[1]  - v2[1] ) * (v1[1]  - v2[1] )
}