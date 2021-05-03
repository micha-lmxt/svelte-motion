/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
var valueScaleCorrection = {};
/**
 * @internal
 */
function addScaleCorrection(correctors) {
    for (var key in correctors) {
        valueScaleCorrection[key] = correctors[key];
    }
}

export { addScaleCorrection, valueScaleCorrection };
