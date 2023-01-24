/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { ScrollMotionValues } from "./utils";
/**
 * Returns MotionValues that update when the provided element scrolls:
 *
 * - `scrollX` — Horizontal scroll distance in pixels.
 * - `scrollY` — Vertical scroll distance in pixels.
 * - `scrollXProgress` — Horizontal scroll progress between `0` and `1`.
 * - `scrollYProgress` — Vertical scroll progress between `0` and `1`.
 *
 * This element must be set to `overflow: scroll` on either or both axes to report scroll offset.
 *
 * @motion
 *
 * ```jsx
 * <script>
 *   import { useElementScroll, MotionDiv } from 'svelte-motion'

 *   const scroll = useElementScroll()
 *
 *  </script>
 * 
 * <div bind:this={scroll.ref}>
 *    <MotionDiv style={{ scaleX: scroll.scrollYProgress }} />
 *  </div>
 * 
 * ```
 *
 * @public
 */
export declare function useElementScroll(ref: RefObject<HTMLElement>): ScrollMotionValues;
