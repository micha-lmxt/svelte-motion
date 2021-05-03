/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

var makeRenderlessComponent = function (hook) { return function (props) {
    hook(props);
    return null;
}; };

export { makeRenderlessComponent };
