<script>
    import sync from "framesync";
    import { afterUpdate } from "svelte";
    import {motionValue} from '.';
    export let values,
        combineValues;
     /**
     * Initialise the returned motion value. This remains the same between renders.
     */
     let value = motionValue(combineValues());

    /**
     * Create a function that will update the template motion value with the latest values.
     * This is pre-bound so whenever a motion value updates it can schedule its
     * execution in Framesync. If it's already been scheduled it won't be fired twice
     * in a single frame.
     */
    const updateValue = (value) => value.set(combineValues())

    /**
     * Synchronously update the motion value with the latest values during the render.
     * This ensures that within a React render, the styles applied to the DOM are up-to-date.
     */
    $: updateValue(value)
    const handler = ()=>sync.update(updateValue,false,true);
    
    afterUpdate(()=>{
        const subscriptions = values.map((val) => val.onChange(handler))
        return () => subscriptions.forEach((unsubscribe) => unsubscribe())
    })

</script>
<slot {value}/>