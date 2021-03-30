<script>
    import { getContext } from "svelte";
    import { LayoutGroupContext } from "../../context/LayoutGroupContext"
    export let props;
    $: ({ layoutId } = props);
    const layoutGroupId =
        getContext(LayoutGroupContext) || LayoutGroupContext();
</script>

<slot
    layoutId={$layoutGroupId && layoutId !== undefined ? $layoutGroupId + '-' + layoutId : layoutId} />
