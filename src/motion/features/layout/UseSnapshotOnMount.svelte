<script>
import { getContext, onDestroy } from "svelte";
import { FramerTreeLayoutContext, isSharedLayout, SharedLayoutContext } from "../../../components/AnimateSharedLayout/SharedLayoutContext";


    export let visualElement;

    const syncLayout = getContext(SharedLayoutContext)||SharedLayoutContext();
    const framerSyncLayout = getContext(FramerTreeLayoutContext)||FramerTreeLayoutContext();
    onDestroy(()=>{
        if (isSharedLayout($syncLayout)){
            $syncLayout.remove(visualElement);
        }
        if (isSharedLayout($framerSyncLayout)) {
                $framerSyncLayout.remove(visualElement);
            }
    })
</script>
<slot/>