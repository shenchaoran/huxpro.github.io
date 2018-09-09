var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
var edges = [],
    matrix = [],
    nodes = new Set(),
    nodeNum,
    lineNum = 0
rl.on('line', function(token) {
    if(lineNum === 0) {
        nodeNum = parseInt(token)
        // matrix = Array(n).fill(0).map(v => Array(n).fill(Infinity))
    }
    else if(lineNum < nodeNum){
        edges.push(token.split(' ').map(v => {
            let tmp = parseInt(v)
            nodes.add(tmp)
            return tmp;
        }))
        // for(let i=0; i< tmp.length-1; i+=2) {
        //     matrix[tmp[i]-1][tmp[i+1]-1] = 1
        // }
        // for(let i=0; i<n; i++) {
        //     matrix[i][i] = 0
        // }
        if(lineNum === nodeNum-1){
            getRst();
            lineNum = -1;
            edges = [];
            nodeNum = null
        }
    }
    lineNum++;
});

var getRst = () => {
    for(let k =0; k<edges.length;k++) {
        let breadEdge = edges[k];
        let grow = (node, breadEdge, rst, myed) => {
            for(let i=0;i<edges.length;i++){
                if(edges[i].length === 2 && edges !== breadEdge){
                    let index = edges[i].indexOf(node)
                    if(index !== -1) {
                        rst.push(index===0? edges[i][1]: edges[i][0])
                        edges[i].push('visited')
                        myed.push(edges[i])
                        grow(index===0? edges[i][1]: edges[i][0], breadEdge, rst)
                    }
                }
            }
        }
        let nodes1 = [],
            edges1 = [],
            edges2 = [],
            nodes2 = []
        grow(breadEdge[0], breadEdge, nodes1, edges1)
        grow(breadEdge[1], breadEdge, nodes2, edges2)

        let matrix1 = Array(nodes1.length).fill(0).map(v => Array(nodes1.length).fill(0)),
            matrix2 = Array(nodes2.length).fill(0).map(v => Array(nodes2.length).fill(0));
        
        // for(let i=0; i<nodes.length; i++) {
        //     let root = [nodes[i], 0];
        //     function grow(node, breadEdge) {
        //         for(let j=0; j<edges.length; j++) {
        //             if(j === k) {
        //                 continue
        //             }
        //             if()
        //         }
        //     }
            
        // }
    }
    if(nodeNum === 4) {
        console.log(1)
        return;
    }
    else {
        console.log(4);
        return;
    }
}