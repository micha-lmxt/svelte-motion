/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { MotionValue } from ".";
/**
 * Creates a `MotionValue` that updates when the velocity of the provided `MotionValue` changes.
 *
 * ```javascript
 * const x = useMotionValue(0)
 * const xVelocity = useVelocity(x)
 * const xAcceleration = useVelocity(xVelocity)
 * ```
 *
 * @public
 */
export declare function useVelocity(value: MotionValue<number>): 
    MotionValue<number> & { reset: (value: MotionValue<number>) => void };
