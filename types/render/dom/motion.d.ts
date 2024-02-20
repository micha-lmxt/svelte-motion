/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { SvelteComponent } from "svelte";
import { DOMMotionComponents } from "./types.js";
import { CustomMotionComponentConfig} from './motion-proxy.js'
import { MotionProps } from "../../motion/types.js";

export declare interface IsSVG{
    /** set to true if the component receiving the motion action is an svg-element like `circle` or `path`. Should not be set to true for `svg` tags. */
    isSVG?:boolean
}
/**
 * HTML & SVG components, optimised for use with gestures and animation. These can be used as
 * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
 *
 * @public
 */
export declare class Motion extends SvelteComponent<
    CustomMotionComponentConfig & MotionProps & IsSVG,
    ATypedSvelteComponent,
    {
        default: { 
            /** Pass down unused props from the Motion component */
            props:object, 
            /**
             * Motion action to be passed to the child which should be animated.
             * 
             * ```jsx
             * <Motion let:motion>
             *     <div use:motion/>
             * </Motion>
             */
            motion: import('svelte/action').Action };
    }
>{}
/**
 * Create a DOM `motion` component with the provided string. This is primarily intended
 * as a full alternative to `motion` for consumers who have to support environments that don't
 * support `Proxy`.
 *
 * ```javascript
 * import { createDomMotionComponent } from "framer-motion"
 *
 * const motion = {
 *   div: createDomMotionComponent('div')
 * }
 * ```
 *
 * @public
 */
export declare function createDomMotionComponent<T extends keyof DOMMotionComponents>(key: T): DOMMotionComponents[T];
export declare const M : {[key:string] : Motion}