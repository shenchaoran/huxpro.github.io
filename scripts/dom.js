function TraverseChildren(dom, fn) {
    function recurChild(dom) {
        fn(dom)
        if(dom.children.length) {
            [...dom.children].map(recurChild)
        }
    }
    recurChild(dom)
}