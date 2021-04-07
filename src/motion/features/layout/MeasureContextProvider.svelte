<script>
    import { getContext } from "svelte";
    import { SharedLayoutContext, FramerTreeLayoutContext } from '../../../context/SharedLayoutContext.js';
    import Measure from "./Measure.svelte";

    export let visualElement,update;
    
    const syncLayout = getContext(SharedLayoutContext) || SharedLayoutContext();

    const framerSyncLayout =
        getContext(FramerTreeLayoutContext) || FramerTreeLayoutContext();
</script>

<Measure
    syncLayout={$syncLayout}
    framerSyncLayout={$framerSyncLayout}
    {visualElement} 
    {update}/>
