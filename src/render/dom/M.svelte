<script>
    import T from './Transformer.svelte';
    import Motion from "../../motion/Motion.svelte";

    export let ___tag;

</script>

<Motion {...$$restProps} let:props let:motion>
    <T {motion} ___tag={___tag} {...props}>
        <slot />
    </T>
</Motion>

