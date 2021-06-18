/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { AnimationControls } from "./types";
/**
 * Creates `AnimationControls`, which can be used to manually start, stop
 * and sequence animations on one or more components.
 *
 * The returned `AnimationControls` should be passed to the `animate` property
 * of the components you want to animate.
 *
 * These components can then be animated with the `start` method.
 *
 * @motion
 *
 * ```jsx
 * import { motion, useAnimation } from 'svelte-motion'
 *
 * const controls = useAnimation()
 *
 * onMount(()=>{
 *     controls.start({
 *         x: 100,
 *         transition: { duration: 0.5 },
 *     })
 * })
 *
 * <MotionDiv animate={controls} />
 * 
 * ```
 *
 * @returns Animation controller with `start` and `stop` methods
 *
 * @public
 */
export declare function useAnimation(): AnimationControls;
