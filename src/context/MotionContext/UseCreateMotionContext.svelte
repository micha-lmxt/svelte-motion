<script>
    import { getContext } from "svelte";
    import { get } from 'svelte/store';
    import { MotionContext } from './index.js';
    import { getCurrentTreeVariants } from './utils.js';

    export let props, 
        isStatic;
        let mc = getContext(MotionContext)||MotionContext();
        let {initial, animate} = getCurrentTreeVariants(props, get(mc)));
        $: ({initial,animate} = getCurrentTreeVariants(props, $mc));

    const variantLabelsAsDependency = (prop) => {
        return Array.isArray(prop) ? prop.join(" ") : prop;
    }

    const memo = () => { return (
        { initial: initial, animate: animate }
        ); 
    } 
    /**
     * Only break memoisation in static mode
     */
     let value = memo();
     $: if (isStatic){
         value = memo(variantLabelsAsDependency(initial),variantLabelsAsDependency(animate))
     }
</script>
<slot {value}/>
