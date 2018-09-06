let fun3 = num => {
    return num%3 == 0
}

let rst = 0
let numbers = []
let tmp = ''
line = '10 110'
let para = line.split(' ')
para.forEach((v, i) => para[i] = parseInt(v))
for (let i = 1; i <= para[1]; i++) {
    tmp += i
    if (i >= para[0]) {
        //numbers.push(parseInt(tmp))
        fun3(parseInt(tmp)) ? rst++ : rst
    }
}
console.log(rst)