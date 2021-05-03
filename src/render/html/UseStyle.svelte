<script context="module">
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    export function copyRawValuesOnly(
    target,
    source,
    props
) {
    for (const key in source) {
        if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
            target[key] = source[key]
        }
    }
}
</script>
<script>
    import { isMotionValue } from "../../value/utils/is-motion-value";
    import { isForcedMotionValue } from "../../motion/utils/is-forced-motion-value";
    import UseInitialMotionValues from "./UseInitialMotionValues.svelte";
    export let visualState, 
        props,isStatic;
    $: (styleProp = props.style || {});
    let style = {};
    /**
     * Copy non-Motion Values straight into style
     */
    const cRVO = copyRawValuesOnly;
    $: cRVO(style,styleProp,props);
    
    const toStyle=(s1)=>{
        Object.assign(style,s1)
        if (props.transformValues){
            style = props.transformValues(style)
        }
        
        return style;
    }
</script>
<UseInitialMotionValues {props} {visualState} {isStatic} let:styles={s1}>
    <slot styles={toStyle(s1,props,style)}/>
</UseInitialMotionValues>
