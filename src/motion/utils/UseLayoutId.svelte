<script>
    import { getContext } from "svelte";
    import { LayoutGroupContext } from "../../components/AnimateSharedLayout/LayoutGroupContext";
    export let props;
    $: ({ layoutId } = props);
    const layoutGroupId =
        getContext(LayoutGroupContext) || LayoutGroupContext();
</script>

<slot
    layoutId={$layoutGroupId && layoutId !== undefined ? $layoutGroupId + '-' + layoutId : layoutId} />
