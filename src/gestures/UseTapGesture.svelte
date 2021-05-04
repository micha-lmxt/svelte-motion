<script>
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import {fixed} from '../utils/fix-process-env';
    import { isNodeOrChild } from "./utils/is-node-or-child";
    import { pipe } from "popmotion";
    import { isDragActive } from "./drag/utils/lock";
    import { onDestroy } from "svelte";
    import {UsePointerEvent, addPointerEvent } from "../events/use-pointer-event";
    import { AnimationType } from "../render/utils/types";
    export let props, visualElement;
    
    $: ({ onTap, onTapStart, onTapCancel, whileTap } = props);
    $: hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;

    let isPressing = false;
    let cancelPointerEndListeners = null;

    function removePointerEndListener() {
        cancelPointerEndListeners?.();
        cancelPointerEndListeners = null;
    }

    function checkPointerEnd() {
        removePointerEndListener();
        isPressing = false;
        visualElement.animationState?.setActive(AnimationType.Tap, false);
        return !isDragActive();
    }

    function onPointerUp(event, info) {
        
        if (!checkPointerEnd()) return;

        /**
         * We only count this as a tap gesture if the event.target is the same
         * as, or a child of, this component's element
         */
        !isNodeOrChild(visualElement.getInstance(), event.target)
            ? onTapCancel?.(event, info)
            : onTap?.(event, info);
    }

    function onPointerCancel(event, info) {
        if (!checkPointerEnd()) return;

        onTapCancel?.(event, info);
    }

    function onPointerDown(event, info) {
        
        

        if (isPressing) return;
        removePointerEndListener();
        isPressing = true;

        cancelPointerEndListeners = pipe(
            addPointerEvent(window, "pointerup", onPointerUp),
            addPointerEvent(window, "pointercancel", onPointerCancel)
        );

        onTapStart?.(event, info);

        visualElement.animationState?.setActive(AnimationType.Tap, true);
    }

    onDestroy(removePointerEndListener);
</script>

<UsePointerEvent
    ref={visualElement}
    eventName="pointerdown"
    handler={hasPressListeners ? onPointerDown : undefined}>
    <slot />
</UsePointerEvent>
