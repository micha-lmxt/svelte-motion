<script>
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
import { setDomContext } from "../DOMcontext.js";
    import { MotionContext } from "./index.js";

    export let value, isCustom;
    let store = writable(value);
    $: store.set(value);
    setContext(MotionContext,store);
    setDomContext("Motion",isCustom,store)
</script>
<slot/>
