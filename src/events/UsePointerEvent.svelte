<script context="module">
import {UseDomEvent} from "./use-dom-event"

    const mouseEventNames = {
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointercancel: "mousecancel",
    pointerover: "mouseover",
    pointerout: "mouseout",
    pointerenter: "mouseenter",
    pointerleave: "mouseleave",
}

const touchEventNames = {
    pointerdown: "touchstart",
    pointermove: "touchmove",
    pointerup: "touchend",
    pointercancel: "touchcancel",
}
function getPointerEventName(name) {
    if (supportsPointerEvents()) {
        return name
    } else if (supportsTouchEvents()) {
        return touchEventNames[name]
    } else if (supportsMouseEvents()) {
        return mouseEventNames[name]
    }

    return name
}
export function addPointerEvent(
    target,
    eventName,
    handler,
    options
) {
    return addDomEvent(
        target,
        getPointerEventName(eventName),
        wrapHandler(handler, eventName === "pointerdown"),
        options
    )
}
</script>
<script>
import { wrapHandler } from "./event-info";

    export let ref,
        eventName,
        handler=undefined,
        options=undefined;
</script>
<UseDomEvent {ref}  
eventName={getPointerEventName(eventName)}
handler={handler && wrapHandler(handler, eventName === "pointerdown")}
{options}>
    <slot/>
</UseDomEvent>
