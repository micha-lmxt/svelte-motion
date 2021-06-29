<script>
    /** 
based on framer-motion@4.1.11,
Copyright (c) 2018 Framer B.V.
*/

    import { MotionConfigContext } from "../../context/MotionConfigContext.js";
    import { VisualElementDragControls } from "./VisualElementDragControls";
    import { getContext, onDestroy, onMount } from "svelte";
    import { get } from "svelte/store";

    export let visualElement, props, isCustom;

    const mcc = getContext(MotionConfigContext) || MotionConfigContext(isCustom);

    let dragControls = new VisualElementDragControls({
        visualElement,
    });

    // If we've been provided a DragControls for manual control over the drag gesture,
    // subscribe this component to it on mount.
    let cleanup;
    const dragEffect = () => {
        if (cleanup) {
            cleanup();
        }
        if (groupDragControls) {
            cleanup = groupDragControls.subscribe(dragControls);
        }
    };
    let { dragControls: groupDragControls } = props;
    let { transformPagePoint } = get(mcc);

    $: ({ dragControls: groupDragControls } = props);
    //let {transformPagePoint} = get($mcc);
    $: ({ transformPagePoint } = $mcc);
    dragControls.setProps({ ...props, transformPagePoint });

    //dragControls.setProps({ ...props, transformPagePoint })

    $: dragControls.setProps({ ...props, transformPagePoint });

    $: dragEffect(dragControls);

    onDestroy(() => {
        if (cleanup) {
            cleanup();
        }
    });
    onMount(() => dragControls.mount(visualElement));
</script>

<slot />
