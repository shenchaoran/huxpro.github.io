var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
});
rl.prompt();
let lineN=0;
let n;
let arr = []
let rstArr = []
rl.on('line', function (data) {
    lineN++
    if(lineN===1){
        n= parseInt(data)
    }
    else {
        let v=data.split(' ')
        arr.push({
            i: lineN-1,
            arr:[
                parseInt(v[0]),
                parseInt(v[1])
            ]
        })
        if(lineN === n+1) {
            let rst = getRst();
        }
    }
});

let getRst = () => {
    arr.sort((v1, v2)=> {
        return v1.arr[0]-v2.arr[0]
    })

    for(let i=0;i<arr.length;i++) {
        if(isValid(i))
            rstArr.push(i)
    }
    console.log(rstArr.length)
    if(rstArr.length){
        let tmp=''
        for(let i=0;i<rstArr.length;i++){
            if(i!==rstArr.length-1){
                let k=rstArr[i]
            	tmp+=arr[k].i+' '
            }
            else {
                tmp+=arr[k].i
            }
        }
        console.log(tmp)
    }

    function isValid(i) {
        let valid =true;
        for(let j=0;j<arr.length-1;j++){
            if(j===i-1){
                if(j+2<arr.length-1){
                    if(arr[j+2].arr[0]<arr[j].arr[1]) {
                        valid=false
                        break
                    }
                }
            }
            else if(j===i){
                continue
            }
            // if(j===i+1){
            //     if(arr[]){
            //         valid=false
            //         break
            //     }
            // }
            else if(arr[j+1].arr[0]<arr[j].arr[1]){
                valid = false
                break
            }

        }
        return valid
    }
}