function Permutation(arr) {
    var rsts = []
    var m = arr.length,
        n = arr[0].length;
    var getSubRst = (i, rst) => {
        for(let j=0; j< n; j++) {
            var newRst = [...rst];
            newRst.push(arr[i][j]);
            if(newRst.length === m) {
                rsts.push(newRst);
            }
            else if(i < m) {
                getSubRst(i+1, newRst)
            }
        }
    }
    for(let i=0; i< n; i++) {
        getSubRst(1, [arr[0][i]])
    }
    return rsts;
}

Permutation([[1,2], [3,4], [5,6]])