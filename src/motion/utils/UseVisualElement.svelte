<script>
    import { getContext } from "svelte";
    import { PresenceContext } from "../../components/AnimatePresence/PresenceContext";
    import {MotionConfigContext} from "../context/MotionConfigContext";
    import { UseVisualElementContext } from "../context/MotionContext";
    import UseLayoutId from "./UseLayoutId.svelte";
    import UseVisualElementInner from "./UseVisualElementInner.svelte";

    export let createVisualElement,
        props,
        isStatic,
        ref = undefined;

    const config = getContext(MotionConfigContext) || MotionConfigContext();
    const presenceContext = getContext(PresenceContext) || PresenceContext();
    let visualElementRef = null;
    $: if (isStatic && visualElementRef !== null) {
        /**
         * Clear the VisualElement state in static mode after the initial render.
         * This will allow the VisualElement to render every render as if its the first,
         * with no history. This is basically a cheaper way of reinstantiating the VisualElement
         * every render.
         */
        visualElementRef.clearState(props);
    }
</script>

<UseVisualElementContext let:parent>
    <UseLayoutId {props} let:layoutId>
        <UseVisualElementInner
            bind:visualElementRef
            {parent}
            {layoutId}
            config={$config}
            presenceContext={$presenceContext}
            {props}
            {isStatic}
            {ref}
            {createVisualElement}
            let:visualElement>
            <slot {visualElement} />
        </UseVisualElementInner>
    </UseLayoutId>
</UseVisualElementContext>
