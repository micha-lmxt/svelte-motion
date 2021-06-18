/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { ScrollMotionValues } from "./utils";
/**
 * Returns MotionValues that update when the viewport scrolls:
 *
 * - `scrollX` — Horizontal scroll distance in pixels.
 * - `scrollY` — Vertical scroll distance in pixels.
 * - `scrollXProgress` — Horizontal scroll progress between `0` and `1`.
 * - `scrollYProgress` — Vertical scroll progress between `0` and `1`.
 *
 * **Warning:** Setting `body` or `html` to `height: 100%` or similar will break the `Progress`
 * values as this breaks the browser's capability to accurately measure the page length.
 *
 * @motion
 *
 * ```jsx
 * <script>
 *   import { useViewportScroll, MotionDiv} from 'svelte-motion'
 * 
 *   const { scrollYProgress } = useViewportScroll()
 * <script>
 * 
 * <MotionDiv style={{ scaleX: scrollYProgress }} />
 * ```
 *
 * @public
 */
export declare function useViewportScroll(): ScrollMotionValues;
