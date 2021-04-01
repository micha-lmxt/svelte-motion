<script>
    import { afterUpdate, getContext, onDestroy } from "svelte";
    import { PresenceContext } from "../../context/PresenceContext";
    import { LazyContext } from "../../context/LazyContext";
    import { MotionConfigContext } from "../../context/MotionConfigContext";
    import { LayoutGroupContext } from '../../context/LayoutGroupContext'
    import {MotionContext} from "../../context/MotionContext/index.js";
    import { isPresent } from '../../components/AnimatePresence/use-presence.js';
import { get } from "svelte/store";

    export let createVisualElement=undefined,
        props,
        Component,
        visualState;

    const config = getContext(MotionConfigContext) || MotionConfigContext();
    const presenceContext = getContext(PresenceContext) || PresenceContext();
    const lazyContext = getContext(LazyContext) || LazyContext();
    const mc = getContext(MotionContext) || MotionContext();
    let parent = get(mc).visualElement;
    $: (parent = $mc.visualElement);
    const layoutGroupId =
        getContext(LayoutGroupContext) || LayoutGroupContext();
    let layoutId = $layoutGroupId && props.layoutId !== undefined
            ? $layoutGroupId + "-" + props.layoutId
            : props.layoutId;
    $: (layoutId =
        $layoutGroupId && props.layoutId !== undefined
            ? $layoutGroupId + "-" + props.layoutId
            : props.layoutId);
    
    let visualElementRef = undefined;
    /**
     * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
     */
    if (!createVisualElement) {
        createVisualElement = $lazyContext.renderer;
    }

    $: if (!visualElementRef && createVisualElement) {
        
        visualElementRef = createVisualElement(Component, {
            visualState,
            parent:parent,
            props: { ...props, layoutId },
            presenceId: $presenceContext?.id,
            blockInitialAnimation: $presenceContext?.initial === false,
        });
    }
    let visualElement = visualElementRef;
    $: (visualElement = visualElementRef);
    afterUpdate(() => {
        
        if (!visualElement) return;
        
        visualElement.setProps({
            ...$config,
            ...props,
            layoutId,
        });

        visualElement.isPresent = isPresent($presenceContext);
        visualElement.isPresenceRoot =
            !parent || parent.presenceId !== $presenceContext?.id;

        /**
         * Fire a render to ensure the latest state is reflected on-screen.
         */
        visualElement.syncRender();

        /**
         * In a future refactor we can replace the features-as-components and
         * have this loop through them all firing "effect" listeners
         */
         visualElement.animationState?.animateChanges()
    });
    onDestroy(()=>visualElement?.notifyUnmount())
</script>

<slot {visualElement} />
