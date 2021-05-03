<script context="module">
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import {writable} from 'svelte/store';
    export const MotionContext = () => writable({});
    
    export const useVisualElementContext = ()=>{
        return (getContext(MotionContext)||MotionContext())
    }
</script>
<script>
    import { getContext } from "svelte";
    const motionContext = getContext(MotionContext)||MotionContext();
</script>
<slot parent={$motionContext.visualElement}/>
