<script context="module">
    function createHoverEvent(
    visualElement,
    isActive,
    callback
) {
    return (event, info) => {
        if (!isMouseEvent(event) || !visualElement.isHoverEventsEnabled) return
        callback?.(event, info)

        visualElement.animationState?.setActive(AnimationType.Hover, isActive)
    }
}
</script>
<script>
import { UsePointerEvent } from "../events/use-pointer-event"
import { AnimationType } from "../render/utils/types";
import { isMouseEvent } from "./utils/event-type";

    export let props,
        visualElement;
    $: ({onHoverStart, onHoverEnd, whileHover} = props);
</script>
<UsePointerEvent ref={visualElement} eventName="pointerenter" handler={ onHoverStart || whileHover
    ? createHoverEvent(visualElement, true, onHoverStart)
    : undefined}/>
<UsePointerEvent ref={visualElement} eventName="pointerleave" handler={ onHoverEnd || whileHover
    ? createHoverEvent(visualElement, false, onHoverEnd)
    : undefined}/>
<slot/>