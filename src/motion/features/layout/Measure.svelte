<script>
    /** 
based on framer-motion@4.1.11,
Copyright (c) 2018 Framer B.V.
*/

    import {
        afterUpdate,
        beforeUpdate,
        getContext,
        onMount,
        tick,
    } from "svelte";
    import { get } from "svelte/store";
    import {
        ScaleCorrectionContext,
        ScaleCorrectionParentContext,
    } from "../../../context/ScaleCorrectionProvider.svelte";
    import { isSharedLayout } from "../../../context/SharedLayoutContext";
    import { snapshotViewportBox } from "../../../render/dom/projection/utils";
    import { setCurrentViewportBox } from "../../../render/dom/projection/relative-set";

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
        //setCurrentViewportBox(visualElement);
        
        get(scaleCorrectionContext).forEach((v) =>{ v.updater?.()});
        console.log(visualElement);
        if (isSharedLayout(syncLayout)) {
            syncLayout.syncUpdate();
        } else {
            snapshotViewportBox(visualElement);
            syncLayout.add(visualElement);
        }
        //

        return null;
    };

    

    $: update !== undefined && updater(update);

    if (update === undefined) {
        beforeUpdate(updater);
    }
    const afterU = ()=>{
        get(scaleCorrectionContext).forEach((v,i) => {
            console.log(i)
            v.afterU()
        });
        console.log("afterupdate", visualElement);
        //updater();

        if (!isSharedLayout(syncLayout)) {
            syncLayout.flush();
        }

        /**
         * If this axis isn't animating as a result of this render we want to reset the targetBox
         * to the measured box
         */
        //setCurrentViewportBox(visualElement);
    }
    scaleCorrectionParentContext.update((v) =>
        v.concat([{
            updater,
            afterU
        } ])
    );
    afterUpdate(afterU);
</script>
