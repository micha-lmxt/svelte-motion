/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import Motion from './Motion.svelte';
import { loadFeatures } from "./features/definitions"

export const createMotionComponent = (
    {
        preloadedFeatures,
        createVisualElement,
        forwardMotionProps,
        visualStateConfig,
        Component,

    }
) => {
    preloadedFeatures && loadFeatures(preloadedFeatures)
    return class MotionComponent extends Motion {
        constructor(options) {
            const props = options.props;
            options.props = {
                props: props,
                defaultFeatures: preloadedFeatures,
                createVisualElement: createVisualElement,
                forwardMotionProps: forwardMotionProps,
                Component: Component,
                visualStateConfig
            }
            super(options)
        }
    }
}
