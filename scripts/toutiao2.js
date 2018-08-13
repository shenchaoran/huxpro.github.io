var m = 3;
var ans = '';
let errors = [
    [1,10],
    [32,45],
    [78,94],
    [5,16],
    [90,100],
    [200,220],
    [16,32]
]
for(let i=0;i < errors.length; i++) {
    for(let j=0;j<errors.length; j++) {
        if(errors[i][0] >= errors[j][0] && errors[i][0] <= errors[j][1] ||
           errors[i][1] >= errors[j][0] && errors[i][1] <= errors[j][1] ) {
            errors[i][0] = errors[j][0] = Math.min(errors[i][0], errors[j][0])
            errors[i][1] = errors[j][1] = Math.max(errors[i][1], errors[j][1])
        }
    }
}
errors.sort((v1,v2) => {
    return v1[0]-v2[0]
})
errors.forEach((v,i) => {
    errors[i] = v.join(',')
})
errors = Array.from(new Set(errors))

for(let i=0; i<errors.length; i++) {
    ans += errors[i] + ';'
}
ans = ans.substring(0, ans.length-1)
console.log(ans);