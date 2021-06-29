<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

    import { getContext } from "svelte";
    import {
        SharedLayoutContext,
        FramerTreeLayoutContext,
    } from "../../../context/SharedLayoutContext.js";
    import Measure from "./Measure.svelte";

    export let visualElement, props, isCustom;

    $: ({ update } = props);
    const syncLayout = getContext(SharedLayoutContext) || SharedLayoutContext(isCustom);

    const framerSyncLayout =
        getContext(FramerTreeLayoutContext) || FramerTreeLayoutContext(isCustom);
</script>

<Measure
    syncLayout={$syncLayout}
    framerSyncLayout={$framerSyncLayout}
    {visualElement}
    {update}
/>
