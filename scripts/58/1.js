function parse(arr) {
    var result = [];
    function convert(node) {
        if(node.parent === null) {
            result.push({
                _id: node._id
            });
        }
        else {
            result.push({
                _id: node._id,
                parent: node.parent
            });
        }
        if(node.children) {
            node.children.map(v => convert(v))
        }
    }
    arr.map(v => convert(v))
    return result;
}

var A = [
    {
        _id: 1,
        parent: null,
        children: [
            {
                _id: 2,
                parent: 1,
                children: [
                    {
                        _id:4,
                        parent:2
                    }
                ]
            },
            {
                _id: 3,
                parent: 1,
                children: [
                    {
                        _id:5,
                        parent:3
                    }
                ]
            }
        ]
    }
]