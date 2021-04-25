/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
function isRefObject(ref) {
    return (typeof ref === "object" &&
        Object.prototype.hasOwnProperty.call(ref, "current"));
}

export { isRefObject };
