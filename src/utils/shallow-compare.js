/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
function shallowCompare(next, prev) {
    if (!Array.isArray(prev))
        return false;
    var prevLength = prev.length;
    if (prevLength !== next.length)
        return false;
    for (var i = 0; i < prevLength; i++) {
        if (prev[i] !== next[i])
            return false;
    }
    return true;
}

export { shallowCompare };
