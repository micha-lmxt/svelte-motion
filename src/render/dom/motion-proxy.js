
import { createDomVisualElement } from './create-dom-visual-element.js';

import { createMotionComponent } from '../../motion/index.js';
import { isSVGComponent } from './utils/is-svg-component';

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
    
    function custom(Component, _a) {
        var _b = (_a === void 0 ? {} : _a).forwardMotionProps, forwardMotionProps = _b === void 0 ? false : _b;
        var config = {
            defaultFeatures: defaultFeatures,
            createVisualElement: createDomVisualElement(Component),
            forwardMotionProps,
            Component,
        };
        
        return createMotionComponent(config);
    }
    /*function deprecatedCustom(Component) {
        warning(false, "motion.custom() is deprecated. Use motion() instead.");
        return custom(Component, { forwardMotionProps: true });
    }*/
    /**
     * A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
     * Rather than generating them anew every render.
     */
    var componentCache = new Map();
    return new Proxy(custom, {
        /**
         * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
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
            
            if (!componentCache.has(type)) {
                componentCache.set(type, custom(type));
            }
            
            return componentCache.get(type);
        },
    });
}

export { createMotionProxy };
