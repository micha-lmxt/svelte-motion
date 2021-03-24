<script>
    import { getContext } from "svelte";
    import {MotionConfigContext} from "../context/MotionConfigContext.js";

    export let defaultFeatures, isStatic, visualElement, props;
    const plugins = getContext(MotionConfigContext) || MotionConfigContext();
    let features;

    // If this is a static component, or we're rendering on the server, we don't load
    // any feature components
    $: if (isStatic || typeof window === "undefined") {
        features = [];
    } else {
        const allFeatures = [...defaultFeatures, ...$plugins.features];
        const numFeatures = allFeatures.length;

        // Decide which features we should render and add them to the returned array
        for (let i = 0; i < numFeatures; i++) {
            const { shouldRender, key, getComponent } = allFeatures[i];
            features = [];
            if (shouldRender(props)) {
                const Component = getComponent(props);
                Component &&
                    features.push({
                        Component,
                        key,
                        props: {
                            key,
                            ...props,
                            visualElement,
                        },
                    });
            }
        }
    }
</script>

<slot {features} />
