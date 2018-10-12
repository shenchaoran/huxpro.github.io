/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    var rsts = [];
    var dfs = (sum, i, arr) => {
        sum+=candidates[i];
        arr.push(candidates[i]);
        if(sum === target) {
            rsts.push(arr)
        }
        else if(sum < target) {
            for(let j=0; j< candidates.length; j++) {
                dfs(sum, j, [...arr]);
            }
        }
    }
    for(let i=0; i< candidates.length; i++) {
        dfs(0, i, []);
    }
    return rsts;
};

var candidates = [2,3,5],
    target = 8;
console.log(combinationSum(candidates, target));