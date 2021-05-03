/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { resolveCSSVariables } from './css-variables-conversion.js';
import { unitConversion } from './unit-conversion.js';

/**
 * Parse a DOM variant to make it animatable. This involves resolving CSS variables
 * and ensuring animations like "20%" => "calc(50vw)" are performed in pixels.
 */
var parseDomVariant = function (visualElement, target, origin, transitionEnd) {
    var resolved = resolveCSSVariables(visualElement, target, transitionEnd);
    target = resolved.target;
    transitionEnd = resolved.transitionEnd;
    return unitConversion(visualElement, target, origin, transitionEnd);
};

export { parseDomVariant };
