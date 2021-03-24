<script context="module">
    export const MotionConfigContext = () =>
        writable({
            transformPagePoint: (p) => p,
            features: [],
            isStatic: false,
        });
</script>

<script>
    import { getContext, setContext } from "svelte";
    import { writable } from "svelte/store";

    export let features = [],
        transition;

    const pluginContext =
        getContext(MotionConfigContext) || MotionConfigContext();
    const value = MotionConfigContext();
    setContext(MotionConfigContext, value);

    $: loadedFeatures = [...new Set([...$pluginContext.features, ...features])];
    $: $value = {
        features: loadedFeatures,
        transition: transition || $pluginContext.transition,
        ...props,
    };
</script>

<slot />
