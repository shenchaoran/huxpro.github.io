
function getRst(arr) {
    var subArr = [];
    var i=0;
    while(i<arr.length-1 && arr[i]<= arr[i+1]) {
        arr.splice(i,1);
    }
    i=arr.length-1;
    while(i>0 && arr[i]<=arr[i-1]) {
        arr.splice(-1,1)
    }
    subArr.push(0);
    var de = arr[0] >= arr[1];
    for (var i = 0; i < arr.length - 1;) {
        if (de) {
            while (i < arr.length - 1 && arr[i] >= arr[i + 1]) {
                i++;
            }
            subArr.push(i);
        }
        else {
            while (i < arr.length - 1 && arr[i] <= arr[i + 1]) {
                i++;
            }
            subArr.push(i);

        }
        de = !de;
    }
    console.log(getArea(subArr, arr));
}

function getArea(splitor, arr) {
    var sub = [];
    if (arr[splitor[0]] < arr[splitor[1]])
        splitor.splice(0, 1);
    if (arr[splitor[splitor.length - 1]] < arr[splitor[splitor.length - 2]]) {
        splitor.splice(-1, 1);
    }
    for (var i = 0; i < splitor.length - 2; i += 2) {
        sub.push([splitor[i], splitor[i + 2]]);
    }
    return sub.reduce((sum, item) => {
        var min = Math.min(arr[item[0]], arr[item[1]]);
        for (var i = item[0]; i <= item[1]; i++) {
            var v = min - arr[i];
            if (v > 0) {
                sum += v;
            }
        }
        return sum;
    }, 0)
}

// var arr = read_line().split(',').map(v => parseInt(v));
var arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
getRst(arr);

// var arr = read_line().split(',').map(v => parseInt(v));
// getRst(arr);