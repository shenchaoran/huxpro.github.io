// UnionFind
class Node {
    value;
    parent;
}
class UFBase {
    root;
    nodes;
    constructor() {

    }
    static makeSet(v) {
        // 建立只包括 v 的集合
    }
    find(v) {
        
    }
    union(set) {

    }
    connected(v1, v2) {
        
    }
}

class TreeUF extends UFBase {
    root;
    children;
    constructor() {

    }
}

class ArrayUF extends UFBase {
    root;
    children;
    constructor() {}
}