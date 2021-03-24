<script>
import { onDestroy } from "svelte";
    export let callback = ()=>{};

    onDestroy(()=>callback())
</script>
<slot/>