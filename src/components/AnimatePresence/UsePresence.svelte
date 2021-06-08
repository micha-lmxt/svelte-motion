<script context="module">
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

    let counter = 0;
    export const incrementId = () => counter++;
</script>

<script>
    import { getContext, onMount } from "svelte";
    import { PresenceContext } from "../../context/PresenceContext.js";
    const context = getContext(PresenceContext) || PresenceContext();
    let { isPresent, onExitComplete, register } = $context || {};
    $: ({ isPresent, onExitComplete, register } = $context || {});

    // It's safe to call the following hooks conditionally (after an early return) because the context will always
    // either be null or non-null for the lifespan of the component.

    // Replace with useOpaqueId when released in React
    const id = $context === null ? undefined : incrementId();

    onMount(() => {
        if ($context !== null) register(id);
    });

    const safeToRemove = () => onExitComplete?.(id);
</script>

{#if $context === null}
    <slot presence={[true, null]} />
{:else}
    <slot
        presence={!isPresent && onExitComplete ? [false, safeToRemove] : [true]}
    />
{/if}
