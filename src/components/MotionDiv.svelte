<script>
    import Motion from "../motion/MotionSSR.svelte";
    export let motion = {};
    export let div = {};
</script>

<Motion {...$$restProps} {...motion} let:motion={m} let:props>
	<div {...props} {...div} use:m><slot/></div>
</Motion>
