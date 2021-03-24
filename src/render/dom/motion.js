import { createDomVisualElement } from './create-dom-visual-element.js';
import { createMotionComponent } from '../../motion/index.js';
import { Drag } from '../../motion/features/drag.js';
import { Gestures } from '../../motion/features/gestures.js';
import { Exit } from '../../motion/features/exit.js';
import { Animation } from '../../motion/features/animation.js';
import { AnimateLayout } from '../../motion/features/layout/Animate.js';
import { MeasureLayout } from '../../motion/features/layout/Measure.js';
import { createMotionProxy } from './motion-proxy.js';

var allMotionFeatures = [
    MeasureLayout,
    Animation,
    Drag,
    Gestures,
    Exit,
    AnimateLayout,
];
/**
 * HTML & SVG components, optimised for use with gestures and animation. These can be used as
 * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
 *
 * @public
 */
var motion = /*@__PURE__*/ createMotionProxy(allMotionFeatures);
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
