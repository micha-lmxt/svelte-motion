<script>
import { onDestroy, tick } from 'svelte';

    import { UseMotionValue } from './use-motion-value.js';
    export let value;
    let cleanup = ()=>{}
    $: tick().then(()=>{
        cleanup();
        cleanup = value.velocityUpdateSubscribers.add(function (newVelocity) {
            velocity.set(newVelocity);
        });
    });
    onDestroy(cleanup)
</script>
<UseMotionValue let:value={motionValue}>
    <slot initial={value.getVelocity()} velocity={value}/>
</UseMotionValue>