import { MeasureLayout } from '../../motion/features/layout/Measure.js';
//import { createMotionProxy } from './motion-proxy.js';
import {createMotionClass} from './create-motion-class.js';

/**
 * @public
 */
var m = /*@__PURE__*/ //createMotionProxy([MeasureLayout]);
    createMotionClass([MeasureLayout])

export { m as M };
