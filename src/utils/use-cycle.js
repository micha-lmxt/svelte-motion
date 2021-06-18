/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
/**
 * Cycles through a series of visual properties. Can be used to toggle between or cycle through animations. It works similar to `useState` in React. It is provided an initial array of possible states, and returns an array of two arguments.
 *
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import { Frame, useCycle } from "framer"
 *
 * export function MyComponent() {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <Frame
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @motion
 *
 * An index value can be passed to the returned `cycle` function to cycle to a specific index.
 *
 * ```jsx
 * import * as React from "react"
 * import { motion, useCycle } from "framer-motion"
 *
 * export const MyComponent = () => {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <MotionDiv
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @param items - items to cycle through
 * @returns [currentState, cycleState]
 *
 * @public
 */
//export { default as UseCycle } from './UseCycle.svelte';
import { fixed } from './fix-process-env';
import { wrap } from "popmotion";
import { writable } from 'svelte/store';

export const useCycle = (...items) => {
    let index = 0;
    const x = writable(items[index])
    const next = (i) => {
        index = typeof i !== "number" ?
            wrap(0, items.length, index + 1) :
            i;
        x.set(items[index])
    }
    x.next=next;
    return x;
}