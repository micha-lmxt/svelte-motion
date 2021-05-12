<script>
    /** 
based on framer-motion@4.1.11,
Copyright (c) 2018 Framer B.V.
*/

    import { afterUpdate, beforeUpdate, getContext, onMount, tick } from "svelte";
    import { get } from "svelte/store";
    import {
        ScaleCorrectionContext,
        ScaleCorrectionParentContext,
    } from "../../../context/ScaleCorrectionProvider.svelte";
    import { isSharedLayout } from "../../../context/SharedLayoutContext";
    import { snapshotViewportBox } from "../../../render/dom/projection/utils";
    import { setCurrentViewportBox } from "../../../render/dom/projection/relative-set"

    export let visualElement, syncLayout, framerSyncLayout, update;


    const scaleCorrectionContext = getContext(ScaleCorrectionContext);
    const scaleCorrectionParentContext = getContext(
        ScaleCorrectionParentContext
    );

    onMount(() => {
        isSharedLayout(syncLayout) && syncLayout.register(visualElement);
        isSharedLayout(framerSyncLayout) &&
            framerSyncLayout.register(visualElement);

        visualElement.onUnmount(() => {
            if (isSharedLayout(syncLayout)) {
                syncLayout.remove(visualElement);
            }

            if (isSharedLayout(framerSyncLayout)) {
                framerSyncLayout.remove(visualElement);
            }
        });
    });
    /**
     * If this is a child of a SyncContext, notify it that it needs to re-render. It will then
     * handle the snapshotting.
     *
     * If it is stand-alone component, add it to the batcher.
     */

    const updater = () => {
        //console.log(visualElement);
        
        if (isSharedLayout(syncLayout)) {
            syncLayout.syncUpdate();
        } else {
            snapshotViewportBox(visualElement);
            syncLayout.add(visualElement);
        }
        //get(scaleCorrectionContext).forEach((v) => v());
        
        return null;
    };

    scaleCorrectionParentContext.update((v) =>
        v.concat([
            () => {
                //innerupdate=true;
                console.log("xx")
                    snapshotViewportBox(visualElement);
                    setCurrentViewportBox(visualElement)

            },
        ])
    );

    $: update !== undefined && updater(update,innerupdate);
    

    if (update === undefined) {
        beforeUpdate(updater);
    }

    afterUpdate(() => {
        //updater();

        if (!isSharedLayout(syncLayout)) {
            syncLayout.flush();
        }

        /**
         * If this axis isn't animating as a result of this render we want to reset the targetBox
         * to the measured box
         */
        setCurrentViewportBox(visualElement)
    });
</script>
