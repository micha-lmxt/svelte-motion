<script context="module">
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