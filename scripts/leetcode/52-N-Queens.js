'use strict'
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
    var arr = Array(n);
    var sum = 0;
    for(var i=0; i< n; i++) {
        arr[0] = i;
        sum = dfs(arr, 1, sum);
    }
    return sum;
};

var isValidPosition = function (arr, nth) {
    var isValid = true;
    for(var i=0; i< nth; i++) {
        if(arr[i] === arr[nth] || Math.abs(i-nth) === Math.abs(arr[i]-arr[nth])) {
            isValid = false;
            break;
        }
    }
    return isValid;
};

// 可以看成一棵树的 dfs 遍历的过程
var dfs = function (arr, nth, sum) {
    if(nth === arr.length){
        sum++;
        //console.log(arr.toString());
        return sum;
    }
    for(var i=0; i< arr.length; i++) {
        arr[nth] = i;
        if(isValidPosition(arr, nth))
            sum = dfs(arr, nth+1, sum);
    }
    return sum;
};

console.log(totalNQueens(1));
console.log(totalNQueens(8));