<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { afterUpdate, getContext } from "svelte";
import {motionValue} from '.';
import { MotionConfigContext } from "../context/MotionConfigContext"


/**
 * Creates a `MotionValue` that, when `set`, will use a spring animation to animate to its new state.
 *
 * It can either work as a stand-alone `MotionValue` by initialising it with a value, or as a subscriber
 * to another `MotionValue`.
 *
 * @remarks
 *
 * ```jsx
 * const x = useSpring(0, { stiffness: 300 })
 * const y = useSpring(x, { damping: 10 })
 * ```
 *
 * @param inputValue - `MotionValue` or number. If provided a `MotionValue`, when the input `MotionValue` changes, the created `MotionValue` will spring towards that value.
 * @param springConfig - Configuration options for the spring.
 * @returns `MotionValue`
 *
 * @public
 */
export let source,
    config={};
    const mcc = getContext(MotionConfigContext)||MotionConfigContext();
    $: ({isStatic} = $mcc);
    let activeSpringAnimation = null;
    let value = motionValue(isMotionValue(source) ? source.get() : source);
    const memo = ()=>{
        value.attach((v, set) => {
            /**
             * A more hollistic approach to this might be to use isStatic to fix VisualElement animations
             * at that level, but this will work for now
             */
            if (isStatic) return set(v)

            if (activeSpringAnimation) {
                activeSpringAnimation.stop()
            }

            activeSpringAnimation = animate({
                from: value.get(),
                to: v,
                velocity: value.getVelocity(),
                ...config,
                onUpdate: set,
            })

            return value.get()
        })
    }
    $: memo(Object.values(config));

    const callback=(v) => value.set(parseFloat(v));
    afterUpdate(()=>{
        isMotionValue(source) ? source.onChange(callback) : undefined
    })
</script>
<slot {value}/>
