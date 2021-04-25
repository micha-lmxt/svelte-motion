<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    
    import { featureDefinitions } from "./definitions";
    const featureNames = Object.keys(featureDefinitions);
    const numFeatures = featureNames.length;
    export let visualElement, props;


    let features = [];

    // If this is a static component, or we're rendering on the server, we don't load
    // any feature components
    // Decide which features we should render and add them to the returned array
    $: {
        features = [];
        for (let i = 0; i < numFeatures; i++) {
            const name = featureNames[i];
            const { isEnabled, Component } = featureDefinitions[name];
            /**
             * It might be possible in the future to use this moment to
             * dynamically request functionality. In initial tests this
             * was producing a lot of duplication amongst bundles.
             */
            if (isEnabled(props) && Component) {
                features.push({
                    Component: Component,
                    key: name,
                    props,
                    visualElement
                });
            }
        }
    }
</script>

{#if visualElement}
    <slot {features} />
{/if}
