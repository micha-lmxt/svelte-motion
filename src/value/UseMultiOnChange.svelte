<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
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
