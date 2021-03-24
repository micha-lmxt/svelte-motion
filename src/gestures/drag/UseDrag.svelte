<script>
import { MotionConfigContext } from "../../motion/context/MotionConfigContext"
import { VisualElementDragControls } from "./VisualElementDragControls"
import { getContext, onMount } from "svelte";


    export let props,
        visualElement;
    $: ({ dragControls: groupDragControls } = props)
    const mcc = getContext(MotionConfigContext)||MotionConfigContext();
    $: ({transformPagePoint} = $mcc);
    let dragControls = new VisualElementDragControls({
            visualElement,
        })
    $: (dragControls.setProps({ ...props, transformPagePoint }));

    // If we've been provided a DragControls for manual control over the drag gesture,
    // subscribe this component to it on mount.
    const dragEffect = () => 
        groupDragControls && groupDragControls.subscribe(dragControls);
    $: dragEffect(dragControls);
    onMount(()=> dragControls.mount(visualElement))
</script>
<slot/>