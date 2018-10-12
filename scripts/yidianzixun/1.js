var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});
let cur_line = 0,
    N,
    arr;
rl.on('line', function(line){
   if(cur_line === 0) {
        N = parseInt(line)
   }
   else if(cur_line === 1) {
        arr = line.split(' ').map(v => parseInt(v));
        getRst();
        cur_line = -1;
   }
   cur_line++;
});

function getRst() {
    var dp = [];
    var start = arr[2];
    var end = arr[arr.length-1];
    var dt = end-start;
    arr.sort((v1, v2) => v1-v2);
    var count = 0;
    for(var i=arr.length-1; i>=0;i--) {
        if(dt > arr[i] && dt>0) {
            dt-=arr[i];
            count++;
        }
    }
    console.log(count);
}