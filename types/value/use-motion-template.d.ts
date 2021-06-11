/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { MotionValue } from ".";
/**
 * Combine multiple motion values into a new one using a string template literal.
 *
 * ```jsx
 * <script>
 *   import {
 *       motion,
 *       useSpring,
 *       useMotionValue,
 *       useMotionTemplate
 *   } from "svelte-motion"
 *
 * 
 *   const shadowX = useSpring(0)
 *   const shadowY = useMotionValue(0)
 *   const shadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`
 * </script>
 * 
 * <Motion style={{ filter: shadow }} use:motion>
 *  <div let:motion/>
 * </Motion>
 * 
 * ```
 *
 * @public
 */
export declare function useMotionTemplate(fragments: TemplateStringsArray, ...values: MotionValue[]):
    MotionValue<string> & { reset: (fragments: TemplateStringsArray, ...values: MotionValue[]) => void };
