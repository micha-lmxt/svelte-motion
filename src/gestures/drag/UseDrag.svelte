<script>
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

import { MotionConfigContext } from '../../context/MotionConfigContext.js';
import { VisualElementDragControls } from "./VisualElementDragControls"
import { getContext, onDestroy, onMount } from "svelte";


    export let visualElement,props;
    $: ({dragControls}=props);
    const mcc = getContext(MotionConfigContext)||MotionConfigContext();
    $: ({transformPagePoint} = $mcc);
    let _dragControls = new VisualElementDragControls({
            visualElement,
        })
    $: (_dragControls.setProps({ ...props, transformPagePoint }));

    // If we've been provided a DragControls for manual control over the drag gesture,
    // subscribe this component to it on mount.
    let cleanup;
    const dragEffect = () => {
        if (cleanup){cleanup()}
        if (dragControls){
            cleanup = dragControls.subscribe(_dragControls);
        }
    }
    onDestroy(()=>{if(cleanup){cleanup()}})
    $: dragEffect(_dragControls);
    onMount(()=> _dragControls.mount(visualElement))
</script>
<slot/>
