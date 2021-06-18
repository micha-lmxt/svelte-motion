/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { Writable } from "svelte/store";
import { Transition } from "../types";
import { TransformPoint2D } from "../types/geometry";
/**
 * @public
 */
export interface MotionConfigContextObject {
    /**
     * @internal
     */
    transformPagePoint: TransformPoint2D;
    /**
     * Determines whether this is a static context ie the Framer canvas. If so,
     * it'll disable all dynamic functionality.
     *
     * @internal
     */
    isStatic: boolean;
    /**
     * Defines a new default transition for the entire tree.
     *
     * @public
     */
    transition?: Transition;
}
/**
 * @public
 */
export declare const MotionConfigContext: () => Writable<MotionConfigContextObject>
