/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

var isAnimationControls = function (v) {
    return typeof v === "object" && typeof (v).start === "function"
};

export { isAnimationControls };
