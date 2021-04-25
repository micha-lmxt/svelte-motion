<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
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
