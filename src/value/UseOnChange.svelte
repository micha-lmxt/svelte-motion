<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { afterUpdate } from "svelte";
    export let value,
        callback;
    afterUpdate(()=>
        isMotionValue(value) ? value.onChange(callback) : undefined
    )
</script>
<slot/>
