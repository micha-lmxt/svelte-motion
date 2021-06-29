<script context="module">
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import {writable} from 'svelte/store';
    export const MotionContext = (c) => getDomContext("Motion",c)||writable({});
    
    export const useVisualElementContext = (c)=>{
        return (getContext(MotionContext)||MotionContext(c))
    }
</script>
<script>
    import { getContext } from "svelte";
    import { getDomContext } from '../DOMcontext';
    export let isCustom;
    const motionContext = getContext(MotionContext)||MotionContext(isCustom);
</script>
<slot parent={$motionContext.visualElement}/>
