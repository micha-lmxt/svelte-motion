/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { useMotionValue } from "./use-motion-value"
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
export const useVelocity = (value) => {
    let val = value;
    let cleanup;
    
    const velocity = useMotionValue(value.getVelocity(),()=>{
        cleanup?.();
        cleanup = val.velocityUpdateSubscribers.add((newVelocity) => {
            velocity.set(newVelocity);
        })
        return ()=>{
            cleanup?.()     
        }
    });

    
    const reset = (valu) => {
        cleanup?.();
        val = valu
        cleanup = val.velocityUpdateSubscribers.add((newVelocity) => {
            velocity.set(newVelocity);
        })
    }

    velocity.reset = reset;

    return velocity;
}
