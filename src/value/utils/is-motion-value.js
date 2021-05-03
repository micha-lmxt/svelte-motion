/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
var isMotionValue = function (value) {
    return value !== null && typeof value === "object" && value.getVelocity;
};

export { isMotionValue };
