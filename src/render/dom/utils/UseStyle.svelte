<script>
    import { isMotionValue } from "../../../value/utils/is-motion-value";
    import { isForcedMotionValue } from "../../../motion/utils/is-forced-motion-value";
    import UseInitialMotionValues from "./UseInitialMotionValues.svelte";
    export let visualElement, 
        props;
    $: styleProp = props.style || {};
    let style = {};
    /**
     * Copy non-Motion Values straight into style
     */
    $: {
        style = {};
        for (const key in styleProp) {
            // TODO We might want this to be a hasValue check? Although this could be impure
            if (
                !isMotionValue(styleProp[key]) &&
                !isForcedMotionValue(key, props)
            ) {
                style[key] = styleProp[key];
            }
        }
        
    }
    const toStyle=(s1,s2,props)=>{
        const s3 = {...s1,...s2};
        if (props.transformValues){
            return props.transformValues(s3)
        }
        
        return s3;
    }
</script>
<UseInitialMotionValues {visualElement} let:styles>
    <slot styles={toStyle(style,styles,props)}/>
</UseInitialMotionValues>