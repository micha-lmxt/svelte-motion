<script>
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

    import { MotionConfigContext } from '../context/MotionConfigContext.js';
    import { PanSession } from "./PanSession"
    import { afterUpdate, getContext, onDestroy } from "svelte";
    import { UsePointerEvent } from "../events/use-pointer-event"
    import { get } from 'svelte/store'
    
    
    export let props,
        visualElement,
        isCustom;
    let { onPan, onPanStart, onPanEnd, onPanSessionStart } = props;
    $: ({ onPan, onPanStart, onPanEnd, onPanSessionStart } = props);
    $:( hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart)
    let panSession = null;
    const mcc = getContext(MotionConfigContext)||MotionConfigContext(isCustom);
    let {transformPagePoint} = get(mcc);
    $: ({transformPagePoint} = $mcc);
    let handlers = {
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
    };
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
<UsePointerEvent ref={visualElement} eventName="pointerdown" handler={hasPanEvents && onPointerDown}>
    <slot/>
</UsePointerEvent>
