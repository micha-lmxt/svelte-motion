<script>
    import { onDestroy } from "svelte";
    let unloadingRef = false;
    let forcedRenderCount = 0;
    onDestroy(()=>unloadingRef=true)
</script>

<slot forceRender={()=>!unloadingRef && (forcedRenderCount++)}/>
