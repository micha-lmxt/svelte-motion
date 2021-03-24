<script>
import { afterUpdate } from "svelte";
    export let value,
        callback;
    afterUpdate(()=>
        isMotionValue(value) ? value.onChange(callback) : undefined
    )
</script>
<slot/>