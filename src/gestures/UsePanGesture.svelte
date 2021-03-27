<script>
    import { MotionConfigContext } from "../motion/context/MotionConfigContext";
    import { PanSession } from "./PanSession"
    import { afterUpdate, getContext, onDestroy } from "svelte";
    import { UsePointerEvent } from "../events/use-pointer-event"


    export let props,
        ref;
    $: ({ onPan, onPanStart, onPanEnd, onPanSessionStart } = props);
    $:( hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart)
    let panSession = null;
    const mcc = getContext(MotionConfigContext)||MotionConfigContext();
    $: ({transformPagePoint} = $mcc);
    $:( handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: (
            event,
            info
        ) => {
            panSession = null
            onPanEnd && onPanEnd(event, info)
        },
    });
    function onPointerDown(event) {
        panSession = new PanSession(event, handlers, {
            transformPagePoint,
        })
    }
    afterUpdate(()=>{
        if (panSession !== null) {
            panSession.updateHandlers(handlers)
        }
    })
    onDestroy(() => panSession && panSession.end())

</script>
<UsePointerEvent {ref} eventName="pointerdown" handler={hasPanEvents && onPointerDown}>
    <slot/>
</UsePointerEvent>