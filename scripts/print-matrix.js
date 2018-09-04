// function printMatrix(matrix)
// {
//     // write code here
//     let row = matrix.length,
//         col = matrix[0].length
//     let rst = []
//     let left = 0,
//         top = 0,
//         bottom = row-1,
//         right = col-1
//     if(row === 0)
//         return rst;
//     while(left <= right && top <= bottom) {
//         for(let i=left; i<=right; i++) {
//             rst.push(matrix[top][i])
//         }
//         for(let i=top+1; i<= bottom; i++) {
//             rst.push(matrix[i][right])
//         }
//         if(bottom !== top)
//             for(let i= right-1; i>= left; i--){
//                 rst.push(matrix[bottom][i])
//             }
//         if(left !== right)
//             for(let i= bottom-1; i>= top+1; i--) {
//                 rst.push(matrix[i][left])
//             }
//         left++
//         right--
//         top++
//         bottom--
//     }
//     return rst;
// }

// let v = printMatrix([
//     [1,2,3,4],
//     [5,6,7,8],
//     [9,10,11,12],
//     // [13,14,15,16],
//     // [17,18,19,20]
// ])
// console.log(v)

// function VerifySquenceOfBST(sequence)
// {
//     // write code here
    
//     function judgeNode(seq, start, end) {
//         if(start>=end)
//             return true
//         let cur = seq[end]
//         let sub1Start = start,
//             sub1End,
//             sub2Start,
//             sub2End = end-1,
//             found = false
//         for(let i= start; i< end; i++) {
//             if(!found){
//                 if(seq[i]>seq[end]) {
//                     sub1End = i-1
//                     sub2Start = i
//                     found = true
//                 }
//             }
//             else {
//                 if(seq[i]<seq[end])
//                     return false
//             }
//         }
//         if(!found)
//             return true
//         return judgeNode(seq, sub1Start, sub1End) && judgeNode(seq, sub2Start, sub2End)
//     }
//     return judgeNode(sequence, 0, sequence.length-1)
// }

// var rst = VerifySquenceOfBST([4,6,7,5])
// console.log(rst)


function Permutation(str)
{
    // write code here
    if(str === '')
        return []
    function getSubPer(subStr) {
        if(subStr.length === 1)
            return [subStr]
        let len = subStr.length
        let subRst = []
        for(let i=0;i<len;i++) {
            if(subStr[i] !== subStr[0] || i === 0) {
                if(subStr[i] !== subStr[0]) {
                    subStr = subStr[i] + subStr.substr(1, i-1) + subStr[0] + subStr.substr(i+1)
                }
                
                //rst.push(subStr[0] + getSubPer(subStr.splice(0,1)))
                let childRst = getSubPer(subStr.substring(1))
                for(let v of childRst) {
                    subRst.push(subStr[0]+v)
                }
            }
        }
        return subRst
    }
    return getSubPer(str)
}
let rst = Permutation('abc')
rst