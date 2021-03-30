<script>

import { afterUpdate, onDestroy, onMount, tick} from "svelte";
import {isSharedLayout} from "../../../context/SharedLayoutContext"

    export let visualElement,
        syncLayout,
        framerSyncLayout,
        update;

    let unsub = ()=>{}

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
        /*tick().then(()=>{
            unsub = visualElement.onLayoutAnimationComplete(updater)
            updater();
        })*/
    })
    onDestroy(unsub)
    /**
     * If this is a child of a SyncContext, notify it that it needs to re-render. It will then
     * handle the snapshotting.
     *
     * If it is stand-alone component, add it to the batcher.
     */
    const updater= ()=>{
        console.log("update")
        if (isSharedLayout(syncLayout)) {
            syncLayout.syncUpdate()
        } else {
            visualElement.snapshotViewportBox()
            syncLayout.add(visualElement)
        }

        return null
    }

    $: updater(update);
    $: console.log(update)

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