<script>
    import { UseIsomorphicLayoutEffect } from "../../utils/use-isomorphic-effect";
    import { isPresent } from "../../components/AnimatePresence/use-presence";
    import { afterUpdate} from "svelte";
    import { UseSnapshotOnUnmount } from "../features/layout/use-snapshot-on-unmount";


    export let visualElementRef,
        parent,
        layoutId,
        config,
        presenceContext,
        props,
        isStatic,
        ref,
        createVisualElement;
    $: if (!visualElementRef) {
        visualElementRef = createVisualElement(isStatic, {
            parent,
            ref,
            isStatic,
            props: { ...props, layoutId },
            presenceId: presenceContext?.id,
            blockInitialAnimation: presenceContext?.initial === false,
        });
    }
    afterUpdate(() => {
        if (!isStatic) {
            visualElementRef.animationState?.animateChanges();
        }
    });
</script>

<UseIsomorphicLayoutEffect
    callback={() => {
        visualElementRef.setProps({ ...config, ...props, layoutId });

        visualElementRef.isPresent = isPresent(presenceContext);
        visualElementRef.isPresenceRoot = !parent || parent.presenceId !== presenceContext?.id;

        /**
         * Fire a render to ensure the latest state is reflected on-screen.
         */
        if (!visualElementRef.isStatic) visualElementRef.syncRender();
    }}>
    {#if isStatic}
        <slot visualElement={visualElementRef} />
    {:else}
        <UseSnapshotOnUnmount visualElement={visualElementRef}>
            <slot visualElement={visualElementRef} />
        </UseSnapshotOnUnmount>
    {/if}
</UseIsomorphicLayoutEffect>
