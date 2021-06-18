/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { Readable } from 'svelte/store'
/**
 * A function that returns a readable store which holds a boolean value. The value of the store is `true` if we should be using reduced motion based on the current device's Reduced Motion setting.
 *
 * This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing motion-sickness inducing
 * `x`/`y` animations with `opacity`, disabling the autoplay of background videos, or turning off parallax motion.
 *
 * It will actively respond to changes and re-render your components with the latest setting.
 *
 * ```jsx
 * <script>
 *   import { useReducedMotion, MotionDiv } from 'svelte-motion'
 * 
 *   export let isOpen = false
 *   const shouldReduceMotion = useReducedMotion()
 *   $: (closedX = $shouldReduceMotion ? 0 : "-100%")
 * </script>
 * 
 * <MotionDiv animate={{
 *       opacity: isOpen ? 1 : 0,
 *       x: isOpen ? 0 : closedX
 *     }} />
 * ```
 *
 * @return Readable<boolean>
 *
 * @public
 */
export declare function useReducedMotion(): Readable<boolean | null>;
