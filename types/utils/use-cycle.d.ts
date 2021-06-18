/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { Writable } from 'svelte/store'
declare type Cycle = (i?: number) => void;
declare type CycleState<T> = [T, Cycle];
/**
 * Cycles through a series of visual properties. Can be used to toggle between or cycle through animations. It is a custom store with a `next` method. Without input, `next` returns the next item in the array. Alternaively, you can set the current index.
 *
 * @motion
 *
 * An index value can be passed to the returned `cycle` function to cycle to a specific index.
 *
 * ```jsx
 * <script>
 *   import { MotionDiv, useCycle } from "svelte-motion"
 *
 *   const x = useCycle(0, 50, 100)
 * </script>
 * 
 * <MotionDiv
 *      animate={{ x: $x }}
 *      onTap={() => x.next()}
 *      />
 * ```
 *
 * @param items - items to cycle through
 * @returns Writable<T> & {next: (index?: number) => void}
 *
 * @public
 */
export declare function useCycle<T>(...items: T[]): Writable<T> & {
    /** Cycle through to next value or set the next value by index. */
    next: ( index?: number ) => void
};
