<script>
import { afterUpdate, onDestroy } from "svelte";


    export let values,
        handler;
    let cleanup = ()=>{}
    afterUpdate(()=>{
        cleanup();
        const subscriptions = values.map((value) => value.onChange(handler));
        cleanup = () => subscriptions.forEach((unsubscribe) => unsubscribe());
    })
    onDestroy(cleanup);
</script>