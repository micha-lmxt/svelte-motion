<script>
    /** 
based on framer-motion@4.1.11,
Copyright (c) 2018 Framer B.V.
*/
    

import { afterUpdate,  onMount} from "svelte";
import {isSharedLayout} from "../../../context/SharedLayoutContext";
import { snapshotViewportBox } from "../../../render/dom/projection/utils";

    export let visualElement,
        syncLayout,
        framerSyncLayout,
        update;

    onMount(()=>{
        isSharedLayout(syncLayout) && syncLayout.register(visualElement)
        isSharedLayout(framerSyncLayout) &&
            framerSyncLayout.register(visualElement)
            
            visualElement.onUnmount(() => {
            if (isSharedLayout(syncLayout)) {
                syncLayout.remove(visualElement)
            }

            if (isSharedLayout(framerSyncLayout)) {
                framerSyncLayout.remove(visualElement)
            }
        })
      
    })
    /**
     * If this is a child of a SyncContext, notify it that it needs to re-render. It will then
     * handle the snapshotting.
     *
     * If it is stand-alone component, add it to the batcher.
     */

    const updater = ()=>{
        if (isSharedLayout(syncLayout)) {

            syncLayout.syncUpdate()

        } else {
            snapshotViewportBox(visualElement)
            syncLayout.add(visualElement)
        }

        return null
    }

    $: updater(syncLayout,update);
    

    afterUpdate(()=>{
        

        if (!isSharedLayout(syncLayout)) {
            syncLayout.flush()
        }

        /**
         * If this axis isn't animating as a result of this render we want to reset the targetBox
         * to the measured box
         */
        visualElement.rebaseProjectionTarget()
      
    })
</script>
