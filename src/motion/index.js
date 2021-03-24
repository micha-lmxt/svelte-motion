
import Motion from './Motion.svelte';

export const createMotionComponent = (
    defaultFeatures,
    createVisualElement,
    forwardMotionProps,
    Component
) => {
    return class MotionComponent extends Motion{
        constructor(options){
            const props = options.props;
            options.props = {
                props:props,
                defaultFeatures: defaultFeatures,
                createVisualElement: createVisualElement,
                forwardMotionProps: forwardMotionProps,
                Component: Component
            }
            super(options)
        }
    }
}
