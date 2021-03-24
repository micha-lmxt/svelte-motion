<script context="module">
    import {writable} from 'svelte/store';
    export const MotionContext = ()=>writable(undefined);
</script>
<script>
import { getContext } from "svelte";


    const motionContext = getContext(MotionContext)||MotionContext();
</script>
<slot parent={$motionContext}/>