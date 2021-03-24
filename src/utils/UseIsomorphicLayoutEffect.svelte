<script>
import { afterUpdate, onDestroy } from "svelte";


    export let callback;
    //const isBrowser = typeof window !== "undefined";
    let cleanup = ()=>{};
    afterUpdate(()=>{
        //if (!isBrowser){
            cleanup();
            cleanup = callback()||(()=>{});
        //}
    })
    onDestroy(cleanup)
</script>
<slot/>