<script>
    
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import { tick } from "svelte";

    import { createAnimationState } from "../../render/utils/animation-state";
    import { isAnimationControls } from "../../animation/utils/is-animation-controls.js";
    export let visualElement, props;

    let {animate} = props;
    $: ({animate} = props);
    /**
     * We dynamically generate the AnimationState manager as it contains a reference
     * to the underlying animation library. We only want to load that if we load this,
     * so people can optionally code split it out using the `m` component.
     */
    $: {visualElement.animationState =
        visualElement.animationState || createAnimationState(visualElement);
    }
    /**
     * Subscribe any provided AnimationControls to the component's VisualElement
     */

    $: if (isAnimationControls(animate)) {
        tick().then(() => animate.subscribe(visualElement)/*, [animate]*/);
    }
</script>
