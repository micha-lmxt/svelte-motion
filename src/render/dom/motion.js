/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { createDomVisualElement } from './create-visual-element.js';
import { createMotionComponent } from '../../motion/index.js';
import {createMotionClass} from './create-motion-class.js';
import {featureBundle} from './featureBundle.js';
//import { createMotionProxy } from './motion-proxy.js';



/**
 * HTML & SVG components, optimised for use with gestures and animation. These can be used as
 * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
 *
 * @public
 */
var motion = /*@__PURE__*/ //createMotionProxy(allMotionFeatures);
    createMotionClass(featureBundle)
/**
 * Create a DOM `motion` component with the provided string. This is primarily intended
 * as a full alternative to `motion` for consumers who have to support environments that don't
 * support `Proxy`.
 *
 * ```javascript
 * import { createDomMotionComponent } from "framer-motion"
 *
 * const motion = {
 *   div: createDomMotionComponent('div')
 * }
 * ```
 *
 * @public
 */
function createDomMotionComponent(key) {
    var config = {
        createVisualElement: createDomVisualElement(key),
        //useRender: createUseRender(key, false),
        forwardMotionProps:  key.forwardMotionProps,
        Component: key.Component,
        defaultFeatures: allMotionFeatures,
    };
    return createMotionComponent(config);
}

export { createDomMotionComponent, motion as Motion };
