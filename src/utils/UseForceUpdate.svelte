<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import { onDestroy } from "svelte";
    let unloadingRef = false;
    let forcedRenderCount = 0;
    onDestroy(()=>unloadingRef=true)
</script>

<slot forceRender={()=>!unloadingRef && (forcedRenderCount++)}/>
