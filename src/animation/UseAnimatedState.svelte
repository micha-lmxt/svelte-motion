<script context="module">
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    var createObject = function () { return ({}); };
    var stateVisualElement = visualElement({
    build: function () { },
    measureViewportBox: axisBox,
    resetTransform: function () { },
    restoreTransform: function () { },
    removeValueFromRenderState: function () { },
    render: function () { },
    scrapeMotionValuesFromProps: createObject,
    readValueFromInstance: function (_state, key, options) {
        return options.initialState[key] || 0;
    },
    makeTargetAnimatable: function (element, _a) {
        var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest(_a, ["transition", "transitionEnd"]);
        var origin = getOrigin(target, transition || {}, element);
        checkTargetForNewValues(element, target, origin);
        return __assign({ transition: transition, transitionEnd: transitionEnd }, target);
    },
});

</script>

<script>
  
    import { afterUpdate, onMount } from "svelte";
    import {UseVisualState} from '../motion/utils/use-visual-state.js';
    export let initialState;

    let animationState = initialState;
    const sve = stateVisualElement;
    $:( element = sve({ props: {} }, { visualState:state }))
    onMount(() => {
        element.mount({});
        return () => element.unmount();
    });
    const _afterUpdate = () => {
        element.setProps({
            onUpdate: (v) => setAnimationState({ ...v }),
        });
    }

    afterUpdate(_afterUpdate);
    const scaleCorrectionParentContext = getContext(
        ScaleCorrectionParentContext
    );
    scaleCorrectionParentContext.update((v) =>
        v.concat([{
            afterU:_afterUpdate
        } ])
    );
    let startAnimation = (animationDefinition) => {
        return animateVisualElement(element, animationDefinition);
    };
</script>

<UseVisualState
    config={{ scrapeMotionValuesFromProps: createObject, createRenderState: createObject }}
   
    props={{}}
    isStatic={false}
    let:state
    >
    <slot animatedState={[animationState, startAnimation]} />
</UseVisualState>
