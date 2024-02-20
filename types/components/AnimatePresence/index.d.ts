/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { SvelteComponent } from "svelte";
import { AnimatePresenceProps } from "./types.js";
/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *         
 *  You can provide an array T[] to the `list` prop, where each item has to have a unique `key` attribute. Via slot prop `item` 
 *  single items of the array are passed down to children, so that for each array item one component is rendered.
 *           
 *  Alternatively you can leave `list` undefined and supply a boolean to the `show` prop. If `true`, the child is rendered.
 *
 * @motion
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'svelte-motion'
 * const items = [
 *  {key:1},
 *  {key:2},
 *  {key:3}
 * ]
 *   <AnimatePresence list={items}>
 *       <MotionDiv
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `Motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */
type ConditionalGeneric<T> = T extends {key:any} ? T : { key: 1}; // Better handling of defaults and the optional list prop
export declare class AnimatePresence<T extends {key:any}> extends SvelteComponent<AnimatePresenceProps<T>, ATypedSvelteComponent, {default:{ item: ConditionalGeneric<T> }}>{}
