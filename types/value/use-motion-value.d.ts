/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { MotionValue } from ".";
/**
 * Creates a `MotionValue` to track the state and velocity of a value.
 *
 * Usually, these are created automatically. For advanced use-cases, like use with `useTransform`, you can create `MotionValue`s externally and pass them into the animated component via the `style` prop.
 *
 * @motion
 *
 * ```jsx
 * <script>
 *   const scale = useMotionValue(1)
 * </script
 * 
 * <Motion let:motion>
 *  <div style={{scale}} use:motion/>
 * </Motion>
 * ```
 * 
 * @param initial - The initial state.
 *
 * @public
 */
export declare function useMotionValue<T>(initial: T): MotionValue<T>;
