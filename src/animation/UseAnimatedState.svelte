<script context="module">
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

    const stateVisualElement = visualElement({
    createRenderState: () => ({}),
    build() {},
    measureViewportBox: axisBox,
    resetTransform() {},
    restoreTransform() {},
    removeValueFromMutableState() {},
    render() {},
    scrapeMotionValuesFromProps() {
        return {}
    },

    readValueFromInstance(_state, key, options) {
        return options.initialState[key] || 0
    },

    makeTargetAnimatable(element, { transition, transitionEnd, ...target }) {
        const origin = getOrigin(target, transition || {}, element)
        checkTargetForNewValues(element, target, origin)
        return { transition, transitionEnd, ...target }
    },
})
</script>
<script>

import { afterUpdate, onMount } from "svelte";


    export let initialState;

    let animationState = initialState;
    let element = stateVisualElement({ props: {} }, { initialState });
    onMount(()=> {
        element.ref({})
        return () => element.ref(null)
    })
    afterUpdate(()=>{
        element.setProps({
            onUpdate: (v) => setAnimationState({ ...v }),
        })
    })
    let startAnimation = (animationDefinition) => {
            return animateVisualElement(element, animationDefinition)
        }
</script>
<slot animatedState={[animationState,startAnimation]}/>
