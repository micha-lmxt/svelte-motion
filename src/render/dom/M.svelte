<script>
    import {MotionTag} from './motion-tag'
    import Motion from '../../motion/MotionSSR.svelte'
    export let ___tag;
    const ___t = ___tag;
</script>
<Motion let:motion {...$$restProps} let:props>
    <MotionTag  {motion} ___tag={___t} {...props}>
        <slot/>
    </MotionTag>
</Motion>