<script>
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    import { MotionContext } from "./index.js";

    export let value;
    let store = writable(value);
    $: store.set(value);
    setContext(MotionContext, store);
</script>
<slot/>
