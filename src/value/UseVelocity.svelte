<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
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
