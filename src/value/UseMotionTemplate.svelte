<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import { MotionValue } from "."
    import { UseCombineMotionValues } from "./use-combine-values"
import UseCombineValues from "./UseCombineValues.svelte";

/**
 * Combine multiple motion values into a new one using a string template literal.
 *
 * ```jsx
 * import {
 *   motion,
 *   useSpring,
 *   useMotionValue,
 *   useMotionTemplate
 * } from "framer-motion"
 *
 * function Component() {
 *   const shadowX = useSpring(0)
 *   const shadowY = useMotionValue(0)
 *   const shadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`
 *
 *   return <motion.div style={{ filter: shadow }} />
 * }
 * ```
 *
 * @public
 */
export let fragments;
    $: ({...values} = $$restProps);
    $: (numFragments = fragments.length);
    function buildValue() {
        let output = ``

        for (let i = 0; i < numFragments; i++) {
            output += fragments[i]
            const value = values[i]
            if (value) output += values[i].get()
        }

        return output
    }
</script>
<UseCombineValues {values} combineValues={buildValue} let:value >
    <slot {value}/>
</UseCombineValues>
