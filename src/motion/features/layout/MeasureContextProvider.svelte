<script>
    import { getContext } from "svelte";
    import {
        FramerTreeLayoutContext,
        SharedLayoutContext,
    } from "../../../components/AnimateSharedLayout/SharedLayoutContext";
    import Measure from "./Measure.svelte";

    export let visualElement;

    const syncLayout = getContext(SharedLayoutContext) || SharedLayoutContext();
    const framerSyncLayout =
        getContext(FramerTreeLayoutContext) || FramerTreeLayoutContext();
</script>

<Measure
    syncLayout={$syncLayout}
    framerSyncLayout={$framerSyncLayout}
    {visualElement} >
<slot/>
</Measure>
