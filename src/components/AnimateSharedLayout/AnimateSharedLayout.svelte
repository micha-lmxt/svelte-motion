<script context="module">
    import { MotionContext } from '../../motion/context/MotionContext';
    let contextType = MotionContext;
</script>
<script>
    import { Presence } from './types';

    import { createBatcher, SharedLayoutContext } from './SharedLayoutContext';
    import { layoutStack } from './utils/stack';
    import { resetRotate } from './utils/rotate';
    import { afterUpdate, onMount, setContext } from 'svelte';


    export let type = undefined;

    let hasMounted = false;
    let children = new Set();
    let stacks = new Map();
    let updateScheduled = false;
    let renderScheduled = false;
    let context;
    let syncContext = {
        ...createBatcher(),
        syncUpdate: (force) => scheduleUpdate(force),
        forceUpdate: () => {
            // By copying syncContext to itself, when this component re-renders it'll also re-render
            // all children subscribed to the SharedLayout context.
            syncContext = { syncContext }
            scheduleUpdate(true)
        },
        register: (child) => addChild(child),
        remove: (child) => removeChild(child),
    }

    const startLayoutAnimation = ()=>{
        /**
         * Reset update and render scheduled status
         */
        renderScheduled = updateScheduled = false

         /**
         * Update presence metadata based on the latest AnimatePresence status.
         * This is a kind of goofy way of dealing with this, perhaps there's a better model to find.
         */
        children.forEach((child) => {
            if (!child.isPresent) {
                child.presence = Presence.Exiting
            } else if (child.presence !== Presence.Entering) {
                child.presence =
                    child.presence === Presence.Exiting
                        ? Presence.Entering
                        : Presence.Present
            }
        })

        updateStacks()

         /**
         * Create a handler which we can use to flush the children animations
         */
         const handler = {
            measureLayout: (child) => child.updateLayoutMeasurement(),
            layoutReady: (child) => {
                if (child.getLayoutId() !== undefined) {
                    const stack = getStack(child)
                    stack.animate(child, type === "crossfade")
                } else {
                    child.notifyLayoutReady()
                }
            },
            parent: context,
        }
        /**
         * Shared layout animations can be used without the AnimateSharedLayout wrapping component.
         * This requires some co-ordination across components to stop layout thrashing
         * and ensure measurements are taken at the correct time.
         *
         * Here we use that same mechanism of schedule/flush.
         */
        children.forEach((child) => syncContext.add(child))
        syncContext.flush(handler)

        /**
         * Clear snapshots so subsequent rerenders don't retain memory of outgoing components
         */
        stacks.forEach((stack) => stack.clearSnapshot())
    }

    const updateStacks = () => {
        stacks.forEach((stack) => stack.updateLeadAndFollow())
    }
    
    const scheduleUpdate = (force = false) => {
        if (!(force || !updateScheduled)) return

        /**
         * Flag we've scheduled an update
         */
        updateScheduled = true

        /**
         * Write: Reset rotation transforms so bounding boxes can be accurately measured.
         */
        children.forEach((child) => resetRotate(child))

        /**
         * Read: Snapshot children
         */
        children.forEach((child) => child.snapshotViewportBox())

        /**
         * Every child keeps a local snapshot, but we also want to record
         * snapshots of the visible children as, if they're are being removed
         * in this render, we can still access them.
         *
         * TODO: What would be better here is doing a single loop where we
         * only snapshotViewportBoxes of undefined layoutIds and then one for each stack
         */
        stacks.forEach((stack) => stack.updateSnapshot())

        /**
         * Force a rerender by setting state if we aren't already going to render.
         */
        if (force || !renderScheduled) {
            renderScheduled = true
            forceUpdate()
        }
    }

    const addChild = (child) => {
        children.add(child)
        addToStack(child)

        child.presence = hasMounted ? Presence.Entering : Presence.Present
    }

    const removeChild = (child) => {
        scheduleUpdate()
        children.delete(child)
        removeFromStack(child)
    }

    const addToStack = (child) => {
        const stack = getStack(child)
        stack?.add(child)
    }

    const removeFromStack = (child) => {
        const stack = getStack(child)
        stack?.remove(child)
    }
    
    /**
     * Return a stack of animate children based on the provided layoutId.
     * Will create a stack if none currently exists with that layoutId.
     */
     const getStack = (child) => {
        const id = child.getLayoutId()
        if (id === undefined) return

        // Create stack if it doesn't already exist
        !stacks.has(id) && stacks.set(id, layoutStack())

        return stacks.get(id) 
    }

    setContext(SharedLayoutContext,syncContext);

    onMount(()=>{
        hasMounted=true;
    })
    afterUpdate(startLayoutAnimation)

</script>
<slot/>