<script>
    import { setContext } from "svelte";
import { writable } from "svelte/store";
    import { MotionContext } from "./MotionContext";

    export let value;
    let store = writable(value);
    $: store.set(value);
    setContext(MotionContext, store);
</script>
<slot/>
