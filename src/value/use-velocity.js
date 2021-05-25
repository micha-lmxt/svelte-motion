/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { onDestroy } from "svelte";
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
    const velocity = useMotionValue(value.getVelocity());

    let cleanup;
    const reset = (val) => {
        cleanup?.();
        
        cleanup = val.velocityUpdateSubscribers.add((newVelocity) => {
            velocity.set(newVelocity);
        })
    }

    reset(value);
    
    onDestroy(()=>{
        cleanup?.()
    })

    velocity.reset = reset;

    return velocity;
}
