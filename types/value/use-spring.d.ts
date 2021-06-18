/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { SpringOptions } from "popmotion";
import { MotionValue } from "../value";
/**
 * Creates a `MotionValue` that, when `set`, will use a spring animation to animate to its new state.
 *
 * It can either work as a stand-alone `MotionValue` by initialising it with a value, or as a subscriber
 * to another `MotionValue`.
 *
 * @remarks
 *
 * ```jsx
 * const x = useSpring(0, { stiffness: 300 })
 * const y = useSpring(x, { damping: 10 })
 * ```
 *
 * @param inputValue - `MotionValue` or number. If provided a `MotionValue`, when the input `MotionValue` changes, the created `MotionValue` will spring towards that value.
 * @param springConfig - Configuration options for the spring.
 * @returns `MotionValue & { reset: (_: any, config: SpringOptions) => void }`
 *
 * @public
 */
export declare function useSpring(source: MotionValue | number, config?: SpringOptions):
    MotionValue<any> & { reset: (_: any, config: SpringOptions) => void };
