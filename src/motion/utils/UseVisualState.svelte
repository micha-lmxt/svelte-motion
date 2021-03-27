<script context="module">
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

        if (
            context &&
            isVariantNode &&
            !isControllingVariants &&
            props.inherit !== false
        ) {
            initial ??= context.initial;
            animate ??= context.animate;
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
    import { PresenceContext } from "../../components/AnimatePresence/PresenceContext";
    import MotionContext from "../context/MotionContext.svelte";

    export let config, props, isStatic;
    const context = getContext(MotionContext) || MotionContext();
    const presenceContext = getContext(PresenceContext) || PresenceContext();
    let state = makeState(config, props, get(context), get(presenceContext));
    $: if (isStatic) {
        state = makeState(config, props, $context, $presenceContext);
    }
</script>

<slot {state} />
