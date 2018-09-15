var count = 0;
function InversePairs(data)
{
    // write code here
    let dp = [0]
    if(data.length < 2) {
        return 0
    }
    else {
        mergeSort(data)
        return count;
    }
}

function mergeSort(arr) {
    if(arr.length <= 1)
        return arr;
    let divider = Math.floor(arr.length/2)
    let left = arr.slice(0, divider)
    let right = arr.slice(divider)
    return merge(mergeSort(left), mergeSort(right))
}

// 在归并的时候计算逆序对
function merge(left, right) {
    let rst = [],
        i = left.length - 1,
        j = right.length - 1
    while(i>=0 && j>=0) {
        if(left[i]>right[j]){
            count += j+1;
            rst.unshift(left[i])
            i--
        }
        else {
            rst.unshift(right[j])
            j--
        }
    }

    if(i>=0) {
        return left.slice(0, i+1).concat(rst);
    }
    else if(j>=0) {
        return right.slice(0, j+1).concat(rst);
    }
    else {
        return rst;
    }
}

var test = [1,2,3,4,5,6,7,0]
let rst = InversePairs(test)