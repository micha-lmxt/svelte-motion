<script>
    import Motion from "../motion/MotionSSR.svelte";
    export let div = {};
</script>

<Motion {...$$restProps} let:motion={m} let:props>
	<div {...props} {...div} use:m><slot/></div>
</Motion>
