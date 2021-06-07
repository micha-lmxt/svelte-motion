<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

    import { getContext, setContext } from "svelte";
    import { writable, get} from "svelte/store";
    import { MotionConfigContext } from "../../context/MotionConfigContext.js";

    export let transformPagePoint = undefined,
        isStatic = undefined,
        transition = undefined;
    const mcc = getContext(MotionConfigContext) || MotionConfigContext();
    /**
     * Inherit props from any parent MotionConfig components
     */
    let config = { ...get(mcc), ...{ transformPagePoint, isStatic, transition } }
    $: config = { ...$mcc, ...{ transformPagePoint, isStatic, transition } };
  
    /**
     * Don't allow isStatic to change between renders as it affects how many hooks
     * motion components fire.
     */
    //config.isStatic = useConstant(() => config.isStatic)

    /**
     * Creating a new config context object will re-render every `motion` component
     * every time it renders. So we only want to create a new one sparingly.
     */
    $: (transitionDependency =
        typeof config.transition === "object"
            ? config.transition.toString()
            : "");

    let context = writable(config);
    setContext(MotionConfigContext, context);
    const memo = () => config;
    $: context.set(memo(transitionDependency, config.transformPagePoint));
</script>

<slot />
