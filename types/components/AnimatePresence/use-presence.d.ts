/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { PresenceContextProps } from "../../context/PresenceContext";
import { Readable } from 'svelte/store'
export declare type SafeToRemove = () => void;
declare type AlwaysPresent = [true, null];
declare type Present = [true];
declare type NotPresent = [false, SafeToRemove];
/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * const [isPresent, safeToRemove] = usePresence()
 *
 * 
 *  $: !isPresent && setTimeout(safeToRemove, 1000)
 * 
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */
export declare function usePresence(): Readable<AlwaysPresent | Present | NotPresent>;
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */
export declare function useIsPresent(): Readable<boolean>;
export declare function isPresent(context: PresenceContextProps | null): boolean;
export {};
