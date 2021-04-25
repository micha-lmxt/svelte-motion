/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { valueScaleCorrection } from '../../render/dom/projection/scale-correction.js';
import { isTransformProp, isTransformOriginProp } from '../../render/html/utils/transform.js';

function isForcedMotionValue(key, _a) {
    var layout = _a.layout, layoutId = _a.layoutId;
    return (isTransformProp(key) ||
        isTransformOriginProp(key) ||
        ((layout || layoutId !== undefined) && !!valueScaleCorrection[key]));
}

export { isForcedMotionValue };
