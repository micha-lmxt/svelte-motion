/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
// Call a handler once for each axis
function eachAxis(handler) {
    return [handler("x"), handler("y")];
}

export { eachAxis };
