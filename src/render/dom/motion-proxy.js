/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { isSVGComponent } from './utils/is-svg-component';
import Mo from './M.svelte'


/**
 * Convert any React component into a `motion` component. The provided component
 * **must** use `React.forwardRef` to the underlying DOM component you want to animate.
 *
 * ```jsx
 * const Component = React.forwardRef((props, ref) => {
 *   return <div ref={ref} />
 * })
 *
 * const MotionComponent = motion(Component)
 * ```
 *
 * @public
 */
function createMotionProxy(defaultFeatures) {
    
    /*function deprecatedCustom(Component) {
        warning(false, "motion.custom() is deprecated. Use motion() instead.");
        return custom(Component, { forwardMotionProps: true });
    }*/
    /**
     * A cache of generated `motion` components, e.g `MotionDiv`, `motion.input` etc.
     * Rather than generating them anew every render.
     */

    return new Proxy({}, {
        /**
         * Called when `motion` is referenced with a prop: `MotionDiv`, `motion.input` etc.
         * The prop name is passed through as `key` and we can use that to generate a `motion`
         * DOM component with that name.
         */
        get: function (_target, key) {
            /**
             * Can be removed in 4.0
             */
            ///if (key === "custom")
            //    return deprecatedCustom;
            /**
             * If this element doesn't exist in the component cache, create it and cache.
             */
            let type = key;
            if (key.slice(0, 1) === key.slice(0, 1).toLowerCase()) {
                type = isSVGComponent(key) ? "SVG" : "DOM";
            }
            const ret = new Proxy(Mo,{
                construct(target, args) {
                    if (!args || !args[0]){
                        args.push({})
                    }
                    if (!args[0].props){
                        args[0].props= {___tag:key,isSVG:type==="SVG"}
                    }else{
                        args[0].props.___tag = key;
                        args[0].props.isSVG = type==="SVG"
                    }                                    
                    return new target(...args);
                  }
            })
            
            return ret;
        },
    });
}

const M = createMotionProxy();

export { createMotionProxy , M};
