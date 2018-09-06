var readline = require('readline');
process.stdin.setEncoding('utf-8');
var lineNum = 0;
var m,n;
var relate = [],
    rst = [],
    tree = {},
    single = []
var rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt:''});
rl.prompt();
rl.on('line', function (token) {
    if(lineNum === 0) {
        n=parseInt(token)
    }
    else if(lineNum <= n) {
        let temp = token.split(' ')
        temp.map((v, i) => temp[i]=parseInt(v))
        relate.push(temp)
        // addChild(temp)
    }
    else if(lineNum === n+1) {
        patchTree()
        m = parseInt(token)
    }
    else if(lineNum <= n+1+m) {
        rst.push(getAnser(token));
        if(lineNum === n+m+1) {
            lineNum
            for(let v of rst) {
                console.log(v)
            }
            lineNum = 0
        }
    }
    lineNum++;
});

function addChild(ab){
    if(ab[0] === -1) {
        tree.v = ab[1]
        tree.children = []
    }
    else if(ab[1] === -1) {
        tree.v = ab[0]
        tree.children = []
    }
    else {
        let current = tree
        let add = function(current) {
            if(current) {
                let child
                if(current.v === ab[0]) {
                    child = {
                        v: ab[1],
                        children: []
                    }
                    current.children.push(child)
                }
                else if(current.v === ab[1]) {
                    child = {
                        v: ab[0],
                        children: []
                    }
                    current.children.push(child)
                }
                else {
                    for(let child of current.children){
                        add(child)
                    }
                }
            }
        }
        add(current);
    }
}

function patchTree() {
    let f = function(root) {
        for(let ab of relate) {
            if(ab.length===2 && ab.indexOf(root)) {
                addChild(ab)
                ab.push(1)
                
                f(ab[0]===root?ab[1]: ab[0])
            }
        }
    }
    for(let ab of relate) {
        if(ab.indexOf(-1) !== 0) {
            addChild(ab)
            f(tree.v)
            break;
        }
    }
}

function getAnser(token) {
    let a,b, currentRst=0
    let tmp = token.split(' ');
    a = parseInt(tmp[0])
    b = parseInt(tmp[1])

    let get = function(current) {
        let father,childV,rst

        if(current.v === a || current.v === b) {
            if(current.v === a) {
                father = current
                childV= b
                rst = 1
            }
            else if(current.v === b) {
                father = current
                childV = a
                rst = 2
            }
            let deepChild = []

            let getSub= function(node) {
                for(let child of node.children) {
                    deepChild.push(child.v)
                    getSub(child)
                }
            }
            getSub(current)
            if(deepChild.indexOf(childV) !== -1) {
                currentRst = rst;
            }
        }
        else {
            for(let child of current.children) {
                get(child)
            }
        }
    }
    get(tree)
    return currentRst;
}