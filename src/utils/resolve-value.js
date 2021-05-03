/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { isKeyframesTarget } from '../animation/utils/is-keyframes-target.js';

var isCustomValue = function (v) {
    return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = function (v) {
    // TODO maybe throw if v.length - 1 is placeholder token?
    return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};

export { isCustomValue, resolveFinalValueInKeyframes };
