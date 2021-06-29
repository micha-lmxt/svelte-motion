<script context="module">
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    
    import { resolveMotionValue } from "../../value/utils/resolve-motion-value";
    import {
        checkIfControllingVariants,
        checkIfVariantNode,
        resolveVariantFromProps,
    } from "../../render/utils/variants";
    import { isAnimationControls } from "../../animation/utils/is-animation-controls.js";
    const makeState = (
        { scrapeMotionValuesFromProps, createRenderState, onMount },
        props,
        context,
        presenceContext
    ) => {
        const state = {
            latestValues: makeLatestValues(
                props,
                context,
                presenceContext,
                scrapeMotionValuesFromProps
            ),
            renderState: createRenderState(),
        };

        if (onMount) {
            state.mount = (instance) => onMount(props, instance, state);
        }

        return state;
    };
    function makeLatestValues(
        props,
        context,
        presenceContext,
        scrapeMotionValues
    ) {
        const values = {};
        const blockInitialAnimation = presenceContext?.initial === false;

        const motionValues = scrapeMotionValues(props);
        for (const key in motionValues) {
            values[key] = resolveMotionValue(motionValues[key]);
        }

        let { initial, animate } = props;
        const isControllingVariants = checkIfControllingVariants(props);
        const isVariantNode = checkIfVariantNode(props);

        if (context &&
        isVariantNode &&
        !isControllingVariants &&
        props.inherit !== false) {
        initial !== null && initial !== void 0 ? initial : (initial = context.initial);
        animate !== null && animate !== void 0 ? animate : (animate = context.animate);
    }

        const variantToSet =
            blockInitialAnimation || initial === false ? animate : initial;

        if (
            variantToSet &&
            typeof variantToSet !== "boolean" &&
            !isAnimationControls(variantToSet)
        ) {
            const list = Array.isArray(variantToSet)
                ? variantToSet
                : [variantToSet];
            list.forEach((definition) => {
                const resolved = resolveVariantFromProps(props, definition);
                if (!resolved) return;

                const { transitionEnd, transition, ...target } = resolved;

                for (const key in target) values[key] = target[key];
                for (const key in transitionEnd)
                    values[key] = transitionEnd[key];
            });
        }

        return values;
    }
</script>

<script>
    import { getContext } from "svelte";
    import {get}from 'svelte/store';
    import { PresenceContext } from "../../context/PresenceContext";
    import {MotionContext} from "../../context/MotionContext/index.js";

    export let config, props, isStatic, isCustom;

    const context = getContext(MotionContext) || MotionContext(isCustom);
    const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
    let state = makeState(config, props, get(context), get(presenceContext));
    const ms = makeState;
    $: if (isStatic) {    
        state = ms(config, props, $context, $presenceContext);
    }
</script>

<slot {state} />
