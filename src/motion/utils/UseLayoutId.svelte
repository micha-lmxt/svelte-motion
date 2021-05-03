<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    
    import { getContext } from "svelte";
    import { LayoutGroupContext } from "../../context/LayoutGroupContext"
    export let props;
    $: ({ layoutId } = props);
    const layoutGroupId =
        getContext(LayoutGroupContext) || LayoutGroupContext();
</script>

<slot
    layoutId={$layoutGroupId && layoutId !== undefined ? $layoutGroupId + '-' + layoutId : layoutId} />
