<script>
    import Motion from "../../motion/Motion.svelte";
    export let ___tag;
</script>

<Motion {...$$restProps} let:props let:motion>
    <svelte:element this={___tag} use:motion {...props}>
        <slot />
    </svelte:element>
</Motion>

