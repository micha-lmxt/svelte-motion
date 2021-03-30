<script context="module">
    import { MotionContext } from '../../context/MotionContext/index.js';
    let contextType = MotionContext;
</script>
<script>
    import { Presence } from './types';
    import { createBatcher } from "./utils/batcher"
    import { SharedLayoutContext } from "../../context/SharedLayoutContext"
    
    import { layoutStack } from './utils/stack';
    import { resetRotate } from './utils/rotate';
    import { afterUpdate, onMount, setContext } from 'svelte';


    export let type = undefined;
    const shouldComponentUpdate= ()=>{
        renderScheduled=true;
    }
    $: shouldComponentUpdate(type);
    /**
     * Track whether the component has mounted. If it hasn't, the presence of added children
     * are set to Present, whereas if it has they're considered Entering
     */
    let hasMounted = false;
        /**
     * A list of all the children in the shared layout
     */
    let children = new Set();
        /**
     * As animate components with a defined `layoutId` are added/removed to the tree,
     * we store them in order. When one is added, it will animate out from the
     * previous one, and when it's removed, it'll animate to the previous one.
     */
    let stacks = new Map();
        /**
     * Track whether we already have an update scheduled. If we don't, we'll run snapshots
     * and schedule one.
     */
    let updateScheduled = false;
        /**
     * Tracks whether we already have a render scheduled. If we don't, we'll force one with this.forceRender
     */
    let renderScheduled = false;
    let context;
        /**
     * The methods provided to all children in the shared layout tree.
     */
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